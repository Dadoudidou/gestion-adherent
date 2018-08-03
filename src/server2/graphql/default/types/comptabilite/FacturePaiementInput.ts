import { GraphQLObjectType, GraphQLInt, GraphQLString, GraphQLList, GraphQLObjectTypeConfig, GraphQLFloat, GraphQLBoolean, GraphQLNonNull, GraphQLInputObjectType, GraphQLInputObjectTypeConfig } from "graphql"
import { ScalarDate } from "@server/graphql/default/types/Date";
import { FacturePaiementType } from "../../../../database/entities/comptabilite/facture_paiement";


export const FacturePaiementInput = new GraphQLInputObjectType({
    name: "FacturePaiementInput",
    fields: () => ({
        id: { type: GraphQLInt },
        type: { type: GraphQLString },
        montant: { type: GraphQLFloat },
        date_banque: { type: ScalarDate },
        reference: { type: GraphQLString },
        banque: { type: GraphQLString },
        valide:  { type: GraphQLBoolean },
    })
});
