import { GraphQLObjectType, GraphQLInt, GraphQLString, GraphQLList, GraphQLObjectTypeConfig } from "graphql"
import { GraphQLContext } from "@server/graphql/V1";
import { UserGroupInstance } from "@server/database2/Models/userGroup";
import { GQLUser } from "@server/graphql/V1/types/objects/user";
import { GQLUserPermission } from "@server/graphql/V1/types/objects/userPermission";

export const GQLUserGroup = new GraphQLObjectType({
    name: "UserGroup",
    fields: () => ({
        id: { type: GraphQLInt },
        nom: { type: GraphQLString },
        permissions: {
            type: new GraphQLList(GQLUserPermission),
            resolve: async (source, args, context) => {
                return source.getPermissions();
            }
        },
        users: {
            type: new GraphQLList(GQLUser),
            resolve: async (source, args, context) => {
                return source.getUsers();
            }
        },
    })
}  as GraphQLObjectTypeConfig<UserGroupInstance, GraphQLContext>)