import { GraphQLObjectType, GraphQLInt, GraphQLString, GraphQLList, GraphQLObjectTypeConfig, GraphQLFloat, GraphQLBoolean } from "graphql"
import { GraphQLContext } from "@server/graphql/V1";
import { ComptabiliteFacturePaiementInstance } from "@server/database2/Models/comptabiliteFacturePaiement";
import { GQLScalarDate } from "@server/graphql/V1/types/scalars/Date";



export const GQLComptabiliteFacturePaiement = new GraphQLObjectType({
    name: "ComptabiliteFacturePaiement",
    fields: () => ({
        id: { type: GraphQLInt },
        type: { type: GraphQLString },
        montant: { type: GraphQLFloat },
        date_banque: { type: GQLScalarDate },
        reference: { type: GraphQLString },
        banque: { type: GraphQLString },
        valide:  { type: GraphQLBoolean },
        
    })
} as GraphQLObjectTypeConfig<ComptabiliteFacturePaiementInstance, GraphQLContext>)

