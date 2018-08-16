import { GraphQLObjectType, GraphQLInt, GraphQLString, GraphQLList, GraphQLObjectTypeConfig, GraphQLBoolean } from "graphql"
import { GraphQLContext } from "@server/graphql/V1";
import { AdherentInstance } from "@server/database2/Models/adherent";
import { GQLScalarDate } from "@server/graphql/V1/types/scalars/Date";
import { GQLAdherentDocument } from "@server/graphql/V1/types/objects/adherentDocument";
import { GQLAdherentAdhesion } from "@server/graphql/V1/types/objects/adherentAdhesion";

type GQLAdherentAdhesionsArgs = {
    campagne_id?: number
}

export const GQLAdherent = new GraphQLObjectType({
    name: "Adherent",
    fields: () => ({
        id: { type: GraphQLInt },
        nom: { type: GraphQLString },
        prenom: { type: GraphQLString },
        datenaissance: { type: GQLScalarDate },
        male: { type: GraphQLBoolean },
        adresse: { type: GraphQLString },
        codepostal: { type: GraphQLString },
        ville: { type: GraphQLString },
        numero_licence: { type: GraphQLString },
        telephone_fixe: { type: GraphQLString },
        telephone_mobile: { type: GraphQLString },
        email: { type: GraphQLString },
        adhesions: {
            type: new  GraphQLList(GQLAdherentAdhesion),
            args: {
                campagne_id: { type: GraphQLInt },
            },
            resolve: (root, args: GQLAdherentAdhesionsArgs, context) => {
                if(args.campagne_id){
                    return root.getAdhesionsByCampagnes([args.campagne_id])
                }
                return root.getAdhesions();
            },
        },
        documents: {
            type: GQLAdherentDocument,
            args: {},
            resolve: (root, args, context) => {
                return root.getDocuments();
            },
        }
    })
} as GraphQLObjectTypeConfig<AdherentInstance, GraphQLContext>)

