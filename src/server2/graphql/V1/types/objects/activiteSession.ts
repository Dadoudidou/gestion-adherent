import { GraphQLObjectType, GraphQLInt, GraphQLString, GraphQLList, GraphQLObjectTypeConfig } from "graphql"
import { GraphQLContext } from "@server/graphql/V1";
import { ActiviteSessionInstance } from "@server/database2/Models/activiteSession";
import { GQLLieu } from "@server/graphql/V1/types/objects/lieu";
import { GQLActiviteSection } from "@server/graphql/V1/types/objects/activiteSection";



export const GQLActiviteSession = new GraphQLObjectType({
    name: "ActiviteSession",
    fields: () => ({
        id: { type: GraphQLInt },
        jour: { type: GraphQLInt },
        heure_debut: { type: GraphQLString },
        heure_fin: { type: GraphQLString },
        place: { type: GraphQLInt },
        lieu: {
            type: GQLLieu,
            resolve: async (source, args, context) => {
                return source.getLieu();
            }
        },
        section: {
            type: GQLActiviteSection,
            resolve: async (source, args, context) => {
                return source.getSection();
            }
        },
    })
} as GraphQLObjectTypeConfig<ActiviteSessionInstance, GraphQLContext>)

