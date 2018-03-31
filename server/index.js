const { json } = require("micro");
const pino = require("pino")();
module.exports = async (req, res) => {
	const body = await json(req);

	res.setHeader("Content-Type", "application/json");
	return {};
};
