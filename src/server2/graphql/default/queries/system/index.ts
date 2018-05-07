import { GraphQLObjectType } from "graphql";

import group from "./group"
import groups from "./groups"
import permissions from "./permissions"
import user from "./user"
import users from "./users"

export const QuerySystem =  new GraphQLObjectType({
    name: "QuerySystem",
    fields: {
        group,
        groups,
        permissions,
        user,
        users,
    }
})