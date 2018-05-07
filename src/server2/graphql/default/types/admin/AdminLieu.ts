import { GraphQLObjectType, GraphQLInt, GraphQLString, GraphQLList, GraphQLObjectTypeConfig } from "graphql"
import { LieuType } from "@server/database/entities/admin/lieu";
import { AdminActiviteSession } from "@server/graphql/default/types/admin/AdminActiviteSession";


export const AdminLieu = new GraphQLObjectType({
    name: "AdminLieu",
    fields: () => ({
        id: { type: GraphQLInt },
        nom: { type: GraphQLString },
        adresse: { type: GraphQLString },
        codepostal: { type: GraphQLString },
        ville: { type: GraphQLString },
        sessions: {
            type: new GraphQLList(AdminActiviteSession),
            resolve: async (source, args, context) => {
                return source.getSessions();
            }
        },
    })
} as GraphQLObjectTypeConfig<LieuType, any>)

