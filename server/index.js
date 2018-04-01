const micro = require("micro");
const { json, send, createError } = require("micro");
const pino = require("pino")();
const { execute, validate, parse } = require("graphql");
const State = require("./lib/State");
const fs = require("fs");
const pubsub = require("./pubsub");
const { makeExecutableSchema } = require("graphql-tools");

const state = new State();

const typeDefs = fs.readFileSync(__dirname + "/schema.gql", { encoding: "utf8" });
const resolvers = {
	Query: {
		hello: () => {
			return "Hello world!";
		},
		time: (obj, args, ctx) => {
			return ctx.state.getTime();
		}
	},
	Mutation: {
		setTime: (obj, args, ctx) => {
			const newTime = ctx.state.setTime(args.time);
			pubsub.publish("time_changed", { time: newTime });
			return { time: newTime };
		}
	},
	Subscription: {
		timeChanged: {
			subscribe: () => pubsub.asyncIterator("time_changed")
		}
	}
};

const schema = makeExecutableSchema({
	typeDefs,
	resolvers,
	logger: {
		log: log => pino.info(log)
	}
});

async function main(req, res) {
	try {
		const body = await json(req);
		//pino.info(body);
		const parsedQuery = parse(body.query);

		let result;
		let errors;
		errors = await validate(schema, parsedQuery);
		result = await execute(schema, parsedQuery, null, { state }, body.variables);

		//let second = await graphql(oldSchema, body.query, resolvers, null, body.variables);
		res.setHeader("Content-Type", "application/json");
		return result;
	} catch (err) {
		pino.error(err);
		send(res, 500, { msg: "Top level server error." });
	}
}

if (require.main === module) {
	server = micro(main);
	server.listen(8999);
}

module.exports = main;
