import { GraphQLObjectType, GraphQLInt, GraphQLString, GraphQLList, GraphQLObjectTypeConfig, GraphQLFloat, GraphQLBoolean, GraphQLNonNull, GraphQLInputObjectType } from "graphql"
import { ScalarDate } from "@server/graphql/default/types/Date";
import { FactureDetailType } from "../../../../database/entities/comptabilite/facture_detail";


export const FactureDetailInput = new GraphQLInputObjectType({
    name: "FactureDetailInput",
    fields: () => ({
        id: { type: GraphQLInt },
        libelle: { type: GraphQLString },
        description: { type: GraphQLString },
        montant: { type: GraphQLFloat },
        ordre:  { type: GraphQLInt }
    })
});
