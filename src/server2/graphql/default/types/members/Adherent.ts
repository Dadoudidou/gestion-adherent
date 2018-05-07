import { GraphQLObjectType, GraphQLInt, GraphQLString, GraphQLList, GraphQLObjectTypeConfig, GraphQLFloat, GraphQLBoolean } from "graphql"
import { ScalarDate } from "@server/graphql/default/types/Date";
import { AdherentType } from "@server/database/entities/members/adherent"


export const Adherent = new GraphQLObjectType({
    name: "Adherent",
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
} as GraphQLObjectTypeConfig<AdherentType, any>)
