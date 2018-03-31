const { json, send } = require("micro");
const pino = require("pino")();
const { graphql, buildSchema } = require("graphql");

module.exports = async (req, res) => {
	try {
		const body = await json(req);

		const schemaStr = `
	type Query {
		hello: String
	}
	`;
		const schema = buildSchema(schemaStr);

		const root = {
			hello: () => {
				pino.info("hey.");
				return "Hello world!";
			}
		};

		let result;

		result = await graphql(schema, body.query, root);
		res.setHeader("Content-Type", "application/json");
		return result;
	} catch (err) {
		result = {};
		pino.error(err);
		send(res, 500);
	}
};
