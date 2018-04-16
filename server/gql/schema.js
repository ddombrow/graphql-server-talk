const fs = require("fs");
const { makeExecutableSchema } = require("graphql-tools");
const typeDefs = fs.readFileSync(__dirname + "/schema.gql", { encoding: "utf8" });

const logger = require("pino")();
const resolvers = {
	Query: {
		hello: () => {
			return "Hello world!";
		},
		time: (obj, args, ctx) => {
			return ctx.state.getTime();
		},
		alarms: (obj, args, ctx) => {
			return Promise.resolve(ctx.state.getAlarms());
		}
	},
	Mutation: {
		setAlarm: (obj, args, ctx) => {
			const id = ctx.state.setAlarm({ ...args });
			return ctx.state.getAlarm(id);
		},
		deleteAlarm: (obj, args, ctx) => {
			ctx.state.deleteAlarm(args.id);
			return true;
		}
	},
	Subscription: {
		alarmChanged: {
			resolve: payload => {
				return payload;
			},
			subscribe: (obj, args, ctx) => ctx.state.getAsyncIterator()
		}
	}
};

const schema = makeExecutableSchema({
	typeDefs,
	resolvers,
	logger: {
		log: log => logger.info(log)
	}
});

module.exports = schema;
