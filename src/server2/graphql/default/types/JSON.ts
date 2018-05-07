import { GraphQLScalarType } from "graphql"

export const ScalarJSON = new GraphQLScalarType({
    name: "JSON",
    serialize: (value: string) => { return JSON.parse(value); },
    parseValue: (value) => { return JSON.stringify(value); }
})