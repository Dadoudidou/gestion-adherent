import { GraphQLObjectType, GraphQLInt, GraphQLString, GraphQLList, GraphQLObjectTypeConfig } from "graphql"
import { GraphQLContext } from "@server/graphql/V1";
import { ActiviteCategorieInstance } from "@server/database2/Models/activiteCategorie";
import { GQLActivite } from "@server/graphql/V1/types/objects/activite";
import { GQLCampagne } from "@server/graphql/V1/types/objects/campagne";



export const GQLActiviteCategorie = new GraphQLObjectType({
    name: "ActiviteCategorie",
    fields: () => ({
        id: { type: GraphQLInt },
        nom: { type: GraphQLString },
        activites: {
            type: new GraphQLList(GQLActivite),
            resolve: async (source, args, context) => {
                return source.getActivites();
            }
        },
        campagne: {
            type: GQLCampagne,
            resolve: async (source, args, context) => {
                return source.getCampagne();
            }
        }
    })
} as GraphQLObjectTypeConfig<ActiviteCategorieInstance, GraphQLContext>)