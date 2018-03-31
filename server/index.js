const micro = require("micro");
const { json, send, createError } = require("micro");
const pino = require("pino")();
const { graphql, buildSchema } = require("graphql");
const State = require("./lib/State");
const fs = require("fs");

const schemaStr = fs.readFileSync(__dirname + "/schema.gql", { encoding: "utf8" });
const state = new State();

async function main(req, res) {
	try {
		const body = await json(req);
		//pino.info(body);

		const schema = buildSchema(schemaStr);

		const root = {
			hello: () => {
				return "Hello world!";
			},
			time: () => {
				return state.getTime(time);
			},
			setTime: args => {
				const newTime = state.setTime(args.time);
				return { time: newTime };
			}
		};

		let result;
		result = await graphql(schema, body.query, root, null, body.variables);
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
