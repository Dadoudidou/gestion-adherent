import { GraphQLObjectType, GraphQLInt, GraphQLString, GraphQLList, GraphQLObjectTypeConfig } from "graphql"
import { GraphQLContext } from "@server/graphql/V1";
import { ComptabiliteTiersInstance } from "@server/database2/Models/comptabiliteTiers";
import { GQLComptabiliteFacture } from "@server/graphql/V1/types/objects/comptabiliteFacture";



export const GQLComptabiliteTiers = new GraphQLObjectType({
    name: "ComptabiliteTiers",
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
            type: new  GraphQLList(GQLComptabiliteFacture),
            args: {},
            resolve: (root, args, context) => {
                return root.getFactures();
            },
        }
        
    })
} as GraphQLObjectTypeConfig<ComptabiliteTiersInstance, GraphQLContext>)

