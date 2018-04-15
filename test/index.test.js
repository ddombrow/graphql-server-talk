const fetch = require("cross-fetch");
const { start, stop, getServer } = require("../server/index");

describe("truth", () => {
	it("should be beauty", () => {
		const beauty = true;
		expect(true).toEqual(beauty);
		expect(beauty).toBe(true);
	});
});

let port;
let localUrl;
const urlBase = "http://localhost";

beforeAll(() => {
	start();
	port = getServer().address().port;
	localUrl = `${urlBase}:${port}`;
});
afterAll(() => {
	stop();
});

describe("the server", () => {
	it("should be running", () => {
		const server = getServer();
		expect(server).toBeDefined();
		expect(server.listening).toBe(true);
	});

	it("should respond to a request", () => {
		return fetch(localUrl).then(res => {
			expect(res).toBeDefined();
			expect(res.status).toBe(200);
		});
	});
});
