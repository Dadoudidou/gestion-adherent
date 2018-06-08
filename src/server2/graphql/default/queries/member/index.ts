import { GraphQLObjectType } from "graphql";

import members from "./members"
import member from "./member"

export const QueryMember =  new GraphQLObjectType({
    name: "QueryMember",
    fields: {
        members,
        member
    }
})