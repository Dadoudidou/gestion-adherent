import { GraphQLObjectType, GraphQLInt, GraphQLString, GraphQLList, GraphQLObjectTypeConfig, GraphQLFloat, GraphQLBoolean } from "graphql"
import { ActCategorieType } from "@server/database/entities/admin/activite_categorie";
import { AdminActivite } from "@server/graphql/default/types/admin/AdminActivite";
import { AdminCampagne } from "@server/graphql/default/types/admin/AdminCampagne";


export const AdminActiviteCategorie = new GraphQLObjectType({
    name: "AdminActiviteCategorie",
    fields: () => ({
        id: { type: GraphQLInt },
        nom: { type: GraphQLString },
        activites: {
            type: new GraphQLList(AdminActivite),
            resolve: async (source, args, context) => {
                return source.getActivites();
            }
        },
        campagne: {
            type: AdminCampagne,
            resolve: async (source, args, context) => {
                return source.getSaison();
            }
        }
    })
} as GraphQLObjectTypeConfig<ActCategorieType, any>)

