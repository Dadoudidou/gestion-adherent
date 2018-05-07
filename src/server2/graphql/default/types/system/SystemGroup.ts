import { GraphQLObjectType, GraphQLInt, GraphQLString, GraphQLList, GraphQLObjectTypeConfig } from "graphql"
import { SystemPermission } from "./SystemPermission";
import { SystemUser } from "./SystemUser";
import { GroupType } from "@server/database/entities/users/group";

export const SystemGroup = new GraphQLObjectType({
    name: "SystemGroup",
    fields: () => ({
        id: { type: GraphQLInt },
        nom: { type: GraphQLString },
        permissions: {
            type: new GraphQLList(SystemPermission),
            resolve: async (source, args, context) => {
                return source.getPermissions();
            }
        },
        users: {
            type: new GraphQLList(SystemUser),
            resolve: async (source, args, context) => {
                return source.getUsers();
            }
        },
    })
}  as GraphQLObjectTypeConfig<GroupType, any>)