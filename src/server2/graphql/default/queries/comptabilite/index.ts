import { GraphQLObjectType } from "graphql";

import Facture from "./Facture"

export const QueryComptabilite =  new GraphQLObjectType({
    name: "QueryComptabilite",
    fields: {
        Facture
    }
})