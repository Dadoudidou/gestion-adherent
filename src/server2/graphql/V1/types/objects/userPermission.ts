import { GraphQLObjectType, GraphQLInt, GraphQLString, GraphQLList, GraphQLObjectTypeConfig } from "graphql"
import { GraphQLContext } from "@server/graphql/V1";
import { UserPermissionInstance } from "@server/database2/Models/userPermission";
import { GQLUserGroup } from "@server/graphql/V1/types/objects/userGroup";


export const GQLUserPermission = new GraphQLObjectType({
    name: "UserPermission",
    fields: () => ({
        id: { type: GraphQLInt },
        nom: { type: GraphQLString },
        description: { type: GraphQLString },
        groups: {
            type: new GraphQLList(GQLUserGroup),
            resolve: async (source, args, context) => {
                return source.getGroups();
            }
        }
    })
} as GraphQLObjectTypeConfig<UserPermissionInstance, GraphQLContext>)