import { GraphQLObjectType, GraphQLInt, GraphQLString, GraphQLList, GraphQLObjectTypeConfig, GraphQLFloat, GraphQLBoolean, GraphQLNonNull } from "graphql"
import { ScalarDate } from "@server/graphql/default/types/Date";
import { FactureDetailType } from "../../../../database/entities/comptabilite/facture_detail";


export const FactureDetail = new GraphQLObjectType({
    name: "FactureDetail",
    fields: () => ({
        id: { type: GraphQLInt },
        date_creation: { type: ScalarDate },
        libelle: { type: GraphQLString },
        description: { type: GraphQLString },
        montant: { type: GraphQLFloat },
        ordre:  { type: GraphQLInt }
    })
} as GraphQLObjectTypeConfig<FactureDetailType, any>)
