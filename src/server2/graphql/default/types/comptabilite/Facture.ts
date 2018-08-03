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
import { Adhesion } from "../members/Adhesion";
import { getOperationRootType } from "../../../../../../node_modules/@types/graphql/execution/execute";


export const Facture = new GraphQLObjectType({
    name: "Facture",
    fields: () => ({
        id: { type: GraphQLInt },
        date_creation: { type: ScalarDate },
        tiers: {
            type: Tiers,
            args: {},
            resolve: (root, args, context) => {
                if(root.getTiers) return root.getTiers();
                if(root["tiers"]) return root["tiers"];
                return null;
            },
        },
        details: {
            type: new  GraphQLList(FactureDetail),
            args: {},
            resolve: (root, args, context) => {
                if(root.getDetails) return root.getDetails();
                if(root["details"]) return root["details"];
                return null;
            },
        },
        paiements: {
            type: new  GraphQLList(FacturePaiement),
            args: {},
            resolve: (root, args, context) => {
                if(root.getPaiements) return root.getPaiements();
                if(root["paiements"]) return root["paiements"];
                return null;
            },
        },
        adhesions: {
            type: new GraphQLList(Adhesion),
            args: {},
            resolve: (root, args, context) => {
                if(root.getAdhesions) return root.getAdhesions();
                if(root["adhesions"]) return root["adhesions"];
                return null;
            }
        }
    })
} as GraphQLObjectTypeConfig<FactureType, any>)
