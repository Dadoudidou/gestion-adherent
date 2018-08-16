import { GraphQLObjectType, GraphQLInt, GraphQLString, GraphQLList, GraphQLObjectTypeConfig } from "graphql"
import { GraphQLContext } from "@server/graphql/V1";

import { UserInstance } from "@server/database2/Models/user";
import { GQLUserGroup } from "@server/graphql/V1/types/objects/userGroup";


export const GQLUser = new GraphQLObjectType({
    name: "User",
    fields: () => ({
        id: { type: GraphQLInt },
        nom: { type: GraphQLString },
        prenom: { type: GraphQLString },
        login: { type: GraphQLString },
        groups: {
            type: new GraphQLList(GQLUserGroup),
            resolve: async (source, args, context) => {
                return source.getGroups();
            }
        }
    })
} as GraphQLObjectTypeConfig<UserInstance, GraphQLContext>)