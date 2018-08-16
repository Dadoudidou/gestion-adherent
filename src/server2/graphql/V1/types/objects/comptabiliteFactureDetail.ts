import { GraphQLObjectType, GraphQLInt, GraphQLString, GraphQLList, GraphQLObjectTypeConfig, GraphQLFloat } from "graphql"
import { GraphQLContext } from "@server/graphql/V1";
import { ComptabiliteFactureDetailInstance } from "@server/database2/Models/comptabiliteFactureDetail";
import { GQLScalarDate } from "@server/graphql/V1/types/scalars/Date";



export const GQLComptabiliteFactureDetail = new GraphQLObjectType({
    name: "ComptabiliteFactureDetail",
    fields: () => ({
        id: { type: GraphQLInt },
        date_creation: { type: GQLScalarDate },
        libelle: { type: GraphQLString },
        description: { type: GraphQLString },
        montant: { type: GraphQLFloat },
        ordre:  { type: GraphQLInt }
        
    })
} as GraphQLObjectTypeConfig<ComptabiliteFactureDetailInstance, GraphQLContext>)

