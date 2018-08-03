import { GraphQLObjectType } from "graphql";

import saveFacture from "./saveFacture";
import saveTiers from "./saveTiers";
import setAdhesionsTofacture from "./setAdhesionsTofacture"


export const MutationComptabilite =  new GraphQLObjectType({
    name: "MutationComptabilite",
    fields: {
        saveFacture,
        saveTiers,
        setAdhesionsTofacture
    }
})