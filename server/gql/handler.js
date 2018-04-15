const { parse, validate, execute, subscribe } = require("graphql");
const { SubscriptionServer } = require("subscriptions-transport-ws");
const schema = require("./schema");

const AlarmClock = require("../lib/AlarmClock");
const state = new AlarmClock();

async function gqlHandler(req, res) {
	try {
		const { query, variables } = req.body;
		if (!query) {
			throw new Error("not a valid graphql query");
		}

		const parsedQuery = parse(req.body.query);
		//console.log("parsedquery:", JSON.stringify(parsedQuery, null, 2));

		const errors = await validate(schema, parsedQuery);
		//console.log("errors:", errors);
		if (errors.length > 0) {
			res.writeHead(200, { "Content-Type": "application/json" });
			res.write(JSON.stringify({ errors }));
		}

		const result = await execute(schema, parsedQuery, null, { state }, variables);
		//console.log("result:", JSON.stringify(result));
		//let second = await graphql(oldSchema, body.query, resolvers, null, body.variables);
		res.writeHead(200, { "Content-Type": "application/json" });
		res.write(JSON.stringify(result));
	} catch (err) {
		//req.log.error(err);
		res.writeHead(200, { "Content-Type": "application/json" });
		res.write(JSON.stringify({ errors: [err] }));
	}
}

function createSubscriptionServer(server) {
	SubscriptionServer.create(
		{
			schema,
			execute,
			subscribe,
			onConnect: () => {
				return {
					state
				};
			}
		},
		{
			server: server,
			path: "/graphql"
		}
	);
}

module.exports = {
	gqlHandler,
	createSubscriptionServer
};
