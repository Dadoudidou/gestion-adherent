import { GraphQLObjectType, GraphQLInt, GraphQLString, GraphQLList, GraphQLObjectTypeConfig } from "graphql"
import { GraphQLContext } from "@server/graphql/V1";
import { CampagneInstance } from "@server/database2/Models/campagne";
import { GQLScalarDate } from "@server/graphql/V1/types/scalars/Date";
import { GQLActiviteCategorie } from "@server/graphql/V1/types/objects/activiteCategorie";



export const GQLCampagne = new GraphQLObjectType({
    name: "Campagne",
    fields: () => ({
        id: { type: GraphQLInt },
        debut: { type: GQLScalarDate },
        fin: { type: GQLScalarDate },
        nom: { type: GraphQLString },
        activites: {
            type: new GraphQLList(GQLActiviteCategorie),
            resolve: (source) => {
                return source.getCategories();
            }
        }
        
    })
} as GraphQLObjectTypeConfig<CampagneInstance, GraphQLContext>)

