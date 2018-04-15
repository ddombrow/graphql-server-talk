const { printSchema, validateSchema, GraphQLSchema } = require("graphql");
const schema = require("../server/gql/schema");

describe("the graphql schema", () => {
	it("should have a schema", () => {
		expect(schema).toBeDefined();

		expect(schema instanceof GraphQLSchema).toBe(true);
		const errors = validateSchema(schema);
		expect(errors).toHaveLength(0);

		const schemaStr = printSchema(schema);
		expect(schemaStr).toBeDefined();
	});
});
