import { GraphQLObjectType, GraphQLInt, GraphQLString, GraphQLList, GraphQLObjectTypeConfig, GraphQLFloat, GraphQLBoolean, GraphQLNonNull } from "graphql"
import { ScalarDate } from "@server/graphql/default/types/Date";
import { FacturePaiementType } from "../../../../database/entities/comptabilite/facture_paiement";


export const FacturePaiement = new GraphQLObjectType({
    name: "FacturePaiement",
    fields: () => ({
        id: { type: GraphQLInt },
        type: { type: GraphQLString },
        montant: { type: GraphQLFloat },
        date_banque: { type: ScalarDate },
        reference: { type: GraphQLString },
        banque: { type: GraphQLString },
        valide:  { type: GraphQLBoolean },
    })
} as GraphQLObjectTypeConfig<FacturePaiementType, any>)
