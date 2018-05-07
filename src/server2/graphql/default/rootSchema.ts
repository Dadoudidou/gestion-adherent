import { GraphQLSchema, GraphQLObjectType } from "graphql";
import { Query } from "./queries";
import { Mutation } from "./mutations";


export const schema = new GraphQLSchema({
    query: Query,
    mutation: Mutation
})