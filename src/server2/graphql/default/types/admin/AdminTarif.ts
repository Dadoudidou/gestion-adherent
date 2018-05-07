import { GraphQLObjectType, GraphQLInt, GraphQLString, GraphQLList, GraphQLObjectTypeConfig, GraphQLFloat, GraphQLBoolean } from "graphql"
import { TarifType } from "@server/database/entities/admin/tarif";
import { AdminCampagne } from "@server/graphql/default/types/admin/AdminCampagne";
import { AdminActiviteSection } from "@server/graphql/default/types/admin/AdminActiviteSection";


export const AdminTarif = new GraphQLObjectType({
    name: "AdminTarif",
    fields: () => ({
        id: { type: GraphQLInt },
        montant: { type: GraphQLFloat },
        nbsessionmin: { type: GraphQLInt },
        nbsessionmax: { type: GraphQLInt },
        carte: { type: GraphQLBoolean },
        carte_nbsession: { type: GraphQLInt },
        campagne: {
            type: AdminCampagne,
            resolve: async (source, args, context) => {
                return source.getSaison();
            }
        },
        section: {
            type: AdminActiviteSection,
            resolve: async (source, args, context) => {
                return source.getSection();
            }
        },
    })
} as GraphQLObjectTypeConfig<TarifType, any>)

