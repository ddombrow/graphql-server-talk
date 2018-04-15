//tests with apollo-client
const config = require("../config");
const { start, stop, getServer } = require("../server/index");
const { createApolloFetch } = require("apollo-fetch");
const { getIntrospectionQuery } = require("graphql");

const baseUrl = config.host;
describe("apollo fetch should work on our server", () => {
	let apolloFetch;
	beforeAll(() => {
		start();
		const port = getServer().address().port;
		const localUrl = `${baseUrl}:${port}`;
		apolloFetch = createApolloFetch({ uri: `${localUrl}/graphql` });
	});

	afterAll(() => {
		stop();
	});

	it("should respond to an invalid query with an error", () => {
		return apolloFetch({ query: `query {}` }).then(result => {
			const { data, errors } = result;
			expect(data).toBeUndefined();
			expect(errors).toBeDefined();
			expect(errors).toHaveLength(1);
		});
	});

	it("should respond to our hello world query", () => {
		return apolloFetch({ query: `query { hello }` }).then(result => {
			const { data, errors } = result;
			expect(data).toBeDefined();
			expect(errors).toBeUndefined();
			expect(data).toMatchObject({ hello: "Hello world!" });
		});
	});

	it("should tell us about the schema if we use the introspection query", () => {
		return apolloFetch({ query: getIntrospectionQuery() }).then(result => {
			const { data, errors } = result;
			expect(data).toBeDefined();
			expect(data).toMatchObject({ __schema: {} });
			expect(errors).toBeUndefined();
		});
	});

	it("should be able to get the current time", () => {
		return apolloFetch({ query: `{ time }` }).then(result => {
			const { data, errors } = result;
			expect(data).toBeDefined();
			expect(errors).toBeUndefined();
		});
	});

	it("should respond to our alarms query", () => {
		return apolloFetch({ query: `{ alarms { id, name, time } }` }).then(result => {
			const { data, errors } = result;
			expect(data).toBeDefined();
			expect(errors).toBeUndefined();
		});
	});

	const setMutation = `
		  mutation setAlarm($time: Float, $name: String){
			setAlarm(time: $time, name: $name) {
			  id
			}
		  }
		`;
	it("should be able to set an alarm query", () => {
		return apolloFetch({
			query: setMutation,
			variables: { name: "", time: new Date().getTime() + 1000 }
		}).then(result => {
			const { data, errors } = result;
			expect(data).toBeDefined();
			expect(errors).toBeUndefined();
		});
	});

	const deleteMutation = `
			mutation deleteAlarm($id: String){
				deleteAlarm(id: $id)
			}
		`;
	it("should be able to delete an alarm query", () => {
		return apolloFetch({
			query: deleteMutation,
			variables: { name: "bob", time: new Date().getTime() + 1000 }
		})
			.then(result => {
				const { data } = result;
				const id = data.id;
				return apolloFetch({
					query: setMutation,
					variables: { id }
				});
			})
			.then(result => {
				const { data, errors } = result;
				expect(data).toBeDefined();
				expect(errors).toBeUndefined();
			});
	});

	/*it("should be able to subscribe to alarms", () => {
		return apolloFetch({
			query: deleteMutation,
			variables: { name: "bob", time: new Date().getTime() + 1000 }
		})
			.then(result => {
				const { data } = result;
				const id = data.id;
				return apolloFetch({
					query: setMutation,
					variables: { id }
				});
			})
			.then(result => {
				const { data, errors } = result;
				expect(data).toBeDefined();
				expect(errors).toBeUndefined();
			});
	});*/
});
