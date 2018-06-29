import { GraphQLObjectType, GraphQLInt, GraphQLString, GraphQLList, GraphQLObjectTypeConfig, GraphQLFloat, GraphQLBoolean } from "graphql"
import { ScalarDate } from "@server/graphql/default/types/Date";

import * as sequelize from "sequelize"
import { TiersType } from "@server/database/entities/comptabilite/tiers";
import { Facture } from "./Facture";


export const Tiers = new GraphQLObjectType({
    name: "Tiers",
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
        factures: {
            type: new  GraphQLList(Facture),
            args: {},
            resolve: (root, args, context) => {
                return root.getFactures();
            },
        }
    })
} as GraphQLObjectTypeConfig<TiersType, any>)
