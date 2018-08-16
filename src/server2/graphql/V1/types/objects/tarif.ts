import { GraphQLObjectType, GraphQLInt, GraphQLString, GraphQLList, GraphQLObjectTypeConfig, GraphQLFloat, GraphQLBoolean } from "graphql"
import { GraphQLContext } from "@server/graphql/V1";
import { TarifInstance } from "@server/database2/Models/tarif";
import { GQLScalarDate } from "@server/graphql/V1/types/scalars/Date";
import { GQLCampagne } from "@server/graphql/V1/types/objects/campagne";
import { GQLActiviteSection } from "@server/graphql/V1/types/objects/activiteSection";



export const GQLTarif = new GraphQLObjectType({
    name: "Tarif",
    fields: () => ({
        id: { type: GraphQLInt },
        montant: { type: GraphQLFloat },
        nbsessionmin: { type: GraphQLInt },
        nbsessionmax: { type: GraphQLInt },
        carte: { type: GraphQLBoolean },
        carte_nbsession: { type: GraphQLInt },
        restriction_date_debut: { type: GQLScalarDate },
        restriction_date_fin: { type: GQLScalarDate },
        campagne: {
            type: GQLCampagne,
            resolve: async (source, args, context) => {
                return source.getCampagne();
            }
        },
        section: {
            type: GQLActiviteSection,
            resolve: async (source, args, context) => {
                return source.getSection();
            }
        },
        
    })
} as GraphQLObjectTypeConfig<TarifInstance, GraphQLContext>)

