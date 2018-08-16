import { GraphQLObjectType, GraphQLInt, GraphQLString, GraphQLList, GraphQLObjectTypeConfig } from "graphql"
import { GraphQLContext } from "@server/graphql/V1";
import { ActiviteSectionInstance } from "@server/database2/Models/activiteSection";
import { GQLActiviteSession } from "@server/graphql/V1/types/objects/activiteSession";
import { GQLActivite } from "@server/graphql/V1/types/objects/activite";
import { GQLTarif } from "@server/graphql/V1/types/objects/tarif";



export const GQLActiviteSection = new GraphQLObjectType({
    name: "ActiviteSection",
    fields: () => ({
        id: { type: GraphQLInt },
        nom: { type: GraphQLString },
        sessions: {
            type: new GraphQLList(GQLActiviteSession),
            resolve: async (source, args, context) => {
                return source.getSessions();
            }
        },
        activite: {
            type: GQLActivite,
            resolve: async (source, args, context) => {
                return source.getActivite();
            }
        },
        tarifs: {
            type: new GraphQLList(GQLTarif),
            resolve: async (source, args, context) => {
                return source.getTarifs();
            }
        },
    })
} as GraphQLObjectTypeConfig<ActiviteSectionInstance, GraphQLContext>)