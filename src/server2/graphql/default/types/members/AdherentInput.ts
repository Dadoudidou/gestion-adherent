import { GraphQLInt, GraphQLString,GraphQLBoolean, GraphQLInputObjectType } from "graphql"
import { ScalarDate } from "@server/graphql/default/types/Date";

export const AdherentInput = new GraphQLInputObjectType({
    name: "AdherentInput",
    fields: () => ({
        id: { type: GraphQLInt },
        nom: { type: GraphQLString },
        prenom: { type: GraphQLString },
        datenaissance: { type: ScalarDate },
        male: { type: GraphQLBoolean },
        adresse: { type: GraphQLString },
        codepostal: { type: GraphQLString },
        ville: { type: GraphQLString },
        numero_licence: { type: GraphQLString },
        telephone_fixe: { type: GraphQLString },
        telephone_mobile: { type: GraphQLString },
        email: { type: GraphQLString },
    })
})
