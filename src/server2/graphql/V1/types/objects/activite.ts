import { GraphQLObjectType, GraphQLInt, GraphQLString, GraphQLList, GraphQLObjectTypeConfig } from "graphql"
import { GraphQLContext } from "@server/graphql/V1";
import { ActiviteInstance } from "@server/database2/Models/activite";
import { GQLActiviteSection } from "@server/graphql/V1/types/objects/activiteSection";
import { GQLActiviteCategorie } from "@server/graphql/V1/types/objects/activiteCategorie";



export const GQLActivite = new GraphQLObjectType({
    name: "Activite",
    fields: () => ({
        id: { type: GraphQLInt },
        nom: { type: GraphQLString },
        sections: {
            type: new GraphQLList(GQLActiviteSection),
            resolve: async (source, args, context) => {
                return source.getSections();
            }
        },
        categorie: {
            type: GQLActiviteCategorie,
            resolve: async (source, args, context) => {
                return source.getCategorie();
            }
        }
    })
} as GraphQLObjectTypeConfig<ActiviteInstance, GraphQLContext>)