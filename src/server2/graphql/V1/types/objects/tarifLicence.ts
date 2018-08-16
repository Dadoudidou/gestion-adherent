import { GraphQLObjectType, GraphQLInt, GraphQLString, GraphQLList, GraphQLObjectTypeConfig, GraphQLFloat } from "graphql"
import { GraphQLContext } from "@server/graphql/V1";
import { TarifLicenceInstance } from "@server/database2/Models/tarifLicence";
import { GQLCampagne } from "@server/graphql/V1/types/objects/campagne";



export const GQLTarifLicence = new GraphQLObjectType({
    name: "TarifLicence",
    fields: () => ({
        id: { type: GraphQLInt },
        montant: { type: GraphQLFloat },
        restriction_age_min: { type: GraphQLInt },
        restriction_age_max: { type: GraphQLInt },
        nom: { type: GraphQLString },
        campagne: {
            type: GQLCampagne,
            resolve: async (source, args, context) => {
                return source.getCampagne();
            }
        },
        
    })
} as GraphQLObjectTypeConfig<TarifLicenceInstance, GraphQLContext>)

