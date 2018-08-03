import { GraphQLObjectType, GraphQLInt, GraphQLString, GraphQLList, GraphQLObjectTypeConfig, GraphQLFloat, GraphQLBoolean, GraphQLInputObjectType } from "graphql"
import { ScalarDate } from "@server/graphql/default/types/Date";

import * as sequelize from "sequelize"
import { TiersType } from "@server/database/entities/comptabilite/tiers";
import { Facture } from "./Facture";


export const TiersInput = new GraphQLInputObjectType({
    name: "TiersInput",
    fields: () => ({
        id: { type: GraphQLInt },
        nom: { type: GraphQLString },
        prenom: { type: GraphQLString },
        adresse: { type: GraphQLString },
        codepostal: { type: GraphQLString },
        ville: { type: GraphQLString },
        telephone_fixe: { type: GraphQLString },
        telephone_mobile: { type: GraphQLString },
        email: { type: GraphQLString },
    })
})
