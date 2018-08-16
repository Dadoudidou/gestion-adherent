import { GraphQLObjectType, GraphQLInt, GraphQLString, GraphQLList, GraphQLObjectTypeConfig } from "graphql"
import { GraphQLContext } from "@server/graphql/V1";
import { LieuInstance } from "@server/database2/Models/lieu";
import { GQLActiviteSession } from "@server/graphql/V1/types/objects/activiteSession";



export const GQLLieu = new GraphQLObjectType({
    name: "Lieu",
    fields: () => ({
        id: { type: GraphQLInt },
        nom: { type: GraphQLString },
        adresse: { type: GraphQLString },
        codepostal: { type: GraphQLString },
        ville: { type: GraphQLString },
        sessions: {
            type: new GraphQLList(GQLActiviteSession),
            resolve: async (source, args, context) => {
                return source.getSessions();
            }
        },
        
    })
} as GraphQLObjectTypeConfig<LieuInstance, GraphQLContext>)

