import { GraphQLObjectType, GraphQLInt, GraphQLString, GraphQLList, GraphQLObjectTypeConfig, GraphQLFloat, GraphQLBoolean } from "graphql"
import { TarifLicenceType } from "@server/database/entities/admin/tarif_licence";
import { AdminCampagne } from "@server/graphql/default/types/admin/AdminCampagne";


export const AdminTarifLicence = new GraphQLObjectType({
    name: "AdminTarifLicence",
    fields: () => ({
        id: { type: GraphQLInt },
        montant: { type: GraphQLFloat },
        restriction_age_min: { type: GraphQLInt },
        restriction_age_max: { type: GraphQLInt },
        nom: { type: GraphQLString },
        campagne: {
            type: AdminCampagne,
            resolve: async (source, args, context) => {
                return source.getSaison();
            }
        },
    })
} as GraphQLObjectTypeConfig<TarifLicenceType, any>)
