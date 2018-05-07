import { GraphQLObjectType, GraphQLInt, GraphQLString, GraphQLList, GraphQLObjectTypeConfig } from "graphql"
import { SystemGroup } from "./SystemGroup";
import { PermissionType } from "@server/database/entities/users/permission";

export const SystemPermission = new GraphQLObjectType({
    name: "SystemPermission",
    fields: () => ({
        id: { type: GraphQLInt },
        nom: { type: GraphQLString },
        description: { type: GraphQLString },
        groups: {
            type: new GraphQLList(SystemGroup),
            resolve: async (source, args, context) => {
                return source.getGroups();
            }
        }
    })
} as GraphQLObjectTypeConfig<PermissionType, any>)