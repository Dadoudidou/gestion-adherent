import { GraphQLObjectType, GraphQLInt, GraphQLString, GraphQLList, GraphQLObjectTypeConfig } from "graphql"
import { GraphQLContext } from "@server/graphql/V1";
import { ComptabiliteFactureInstance } from "@server/database2/Models/comptabiliteFacture";
import { GQLScalarDate } from "@server/graphql/V1/types/scalars/Date";
import { GQLComptabiliteTiers } from "@server/graphql/V1/types/objects/comptabiliteTiers";
import { GQLComptabiliteFactureDetail } from "@server/graphql/V1/types/objects/comptabiliteFactureDetail";
import { GQLComptabiliteFacturePaiement } from "@server/graphql/V1/types/objects/comptabiliteFacturePaiement";
import { GQLAdherentAdhesion } from "@server/graphql/V1/types/objects/adherentAdhesion";



export const GQLComptabiliteFacture = new GraphQLObjectType({
    name: "ComptabiliteFacture",
    fields: () => ({
        id: { type: GraphQLInt },
        date_creation: { type: GQLScalarDate },
        tiers: {
            type: GQLComptabiliteTiers,
            args: {},
            resolve: (root, args, context) => {
                if(root.getTiers) return root.getTiers();
                if(root["tiers"]) return root["tiers"];
                return null;
            },
        },
        details: {
            type: new  GraphQLList(GQLComptabiliteFactureDetail),
            args: {},
            resolve: (root, args, context) => {
                if(root.getDetails) return root.getDetails();
                if(root["details"]) return root["details"];
                return null;
            },
        },
        paiements: {
            type: new  GraphQLList(GQLComptabiliteFacturePaiement),
            args: {},
            resolve: (root, args, context) => {
                if(root.getPaiements) return root.getPaiements();
                if(root["paiements"]) return root["paiements"];
                return null;
            },
        },
        adhesions: {
            type: new GraphQLList(GQLAdherentAdhesion),
            args: {},
            resolve: (root, args, context) => {
                if(root.getAdhesions) return root.getAdhesions();
                if(root["adhesions"]) return root["adhesions"];
                return null;
            }
        }
        
    })
} as GraphQLObjectTypeConfig<ComptabiliteFactureInstance, GraphQLContext>)

