import { GraphQLObjectType, GraphQLInt, GraphQLString, GraphQLList, GraphQLObjectTypeConfig, GraphQLFloat, GraphQLBoolean } from "graphql"
import { ActActiviteType } from "@server/database/entities/admin/activite_activite";
import { AdminActiviteSection } from "@server/graphql/default/types/admin/AdminActiviteSection";
import { AdminActiviteCategorie } from "@server/graphql/default/types/admin/AdminActiviteCategorie";


export const AdminActivite = new GraphQLObjectType({
    name: "AdminActivite",
    fields: () => ({
        id: { type: GraphQLInt },
        nom: { type: GraphQLString },
        sections: {
            type: new GraphQLList(AdminActiviteSection),
            resolve: async (source, args, context) => {
                return source.getSections();
            }
        },
        categorie: {
            type: AdminActiviteCategorie,
            resolve: async (source, args, context) => {
                return source.getCategorie();
            }
        }
    })
} as GraphQLObjectTypeConfig<ActActiviteType, any>)

