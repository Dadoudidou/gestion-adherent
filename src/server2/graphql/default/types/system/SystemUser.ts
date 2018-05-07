import { GraphQLObjectType, GraphQLInt, GraphQLString, GraphQLList, GraphQLObjectTypeConfig } from "graphql"
import { SystemGroup } from "./SystemGroup";
import { UserType } from "@server/database/entities/users/user";


export const SystemUser = new GraphQLObjectType({
    name: "SystemUser",
    fields: () => ({
        id: { type: GraphQLInt },
        nom: { type: GraphQLString },
        prenom: { type: GraphQLString },
        login: { type: GraphQLString },
        groups: {
            type: new GraphQLList(SystemGroup),
            resolve: async (source, args, context) => {
                return source.getGroups();
            }
        }
    })
} as GraphQLObjectTypeConfig<UserType, any>)