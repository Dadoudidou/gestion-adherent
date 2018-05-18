import { GraphQLScalarType } from "graphql"

export const ScalarDate = new GraphQLScalarType({
    name: "Date",
    serialize: (value: Date) => { return value.toISOString(); },
    parseValue: (value) => { return new Date(value); },
    parseLiteral: () => null
})