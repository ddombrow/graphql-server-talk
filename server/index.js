const pino = require("pino");
const chalk = require("chalk");
const body = require("./lib/body");
const { gqlHandler, createSubscriptionServer } = require("./gql");

const pkg = require("../package.json");
const http = require("http");

let server;
const PORT = 9031;
const testEnv = process.env.NODE_ENV === "test";

async function main(req, res) {
	req.log = pino({
		level: testEnv ? "silent" : "info"
	});

	req.log.info(req);
	if (req.url === "/") {
		res.writeHead(200, { "Content-Type": "application/json" });
		res.write(JSON.stringify({ status: "alive" }));
		res.end();
	} else if (req.url === "/graphql") {
		req.body = await body.json(req);
		await gqlHandler(req, res);
		res.end();
	}
}

function start() {
	server = http.createServer(main).listen(PORT);
	createSubscriptionServer(server);
}

function getServer() {
	return server;
}

function stop() {
	server.close();
}

module.exports = {
	start,
	stop,
	getServer
};

if (!module.parent) {
	start();
	global.console.log(chalk`{green ${pkg.name}} server started listening on {blue ${PORT}}`);

	process.on("unhandledRejection", (reason, p) => {
		global.console.log("Unhandled Rejection at:", p, "reason:", reason);
		process.exit(1); //eslint-disable-line no-process-exit
	});
	process.on("uncaughtException", err => {
		global.console.log("Unhandled Exception:", err);
		process.exit(1); //eslint-disable-line no-process-exit
	});

	process.on("SIGINT", function() {
		global.console.log("\nGracefully shutting down from SIGINT (Ctrl-C)");
		process.exit(0); //eslint-disable-line no-process-exit
	});
}
