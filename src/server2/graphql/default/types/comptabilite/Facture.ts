import { GraphQLObjectType, GraphQLInt, GraphQLString, GraphQLList, GraphQLObjectTypeConfig, GraphQLFloat, GraphQLBoolean } from "graphql"
import { ScalarDate } from "@server/graphql/default/types/Date";
import { AdherentType } from "@server/database/entities/members/adherent"
import { AdhesionType } from "@server/database/entities/members/adhesion";
import { dbcontext } from "@server/database"
import * as deepExtend from "deep-extend"

import * as sequelize from "sequelize"
import { TiersType } from "@server/database/entities/comptabilite/tiers";
import { Tiers } from "./Tiers";
import { FactureType } from "../../../../database/entities/comptabilite/facture";
import { FactureDetail } from "./FactureDetail";
import { FacturePaiement } from "./FacturePaiement";


export const Facture = new GraphQLObjectType({
    name: "Facture",
    fields: () => ({
        id: { type: GraphQLInt },
        date_creation: { type: ScalarDate },
        tiers: {
            type: Tiers,
            args: {},
            resolve: (root, args, context) => {
                return root.getTiers();
            },
        },
        details: {
            type: new  GraphQLList(FactureDetail),
            args: {},
            resolve: (root, args, context) => {
                return root.getDetails();
            },
        },
        paiements: {
            type: new  GraphQLList(FacturePaiement),
            args: {},
            resolve: (root, args, context) => {
                return root.getPaiements();
            },
        }
    })
} as GraphQLObjectTypeConfig<FactureType, any>)
