import { GraphQLObjectType, GraphQLInt, GraphQLString, GraphQLList, GraphQLObjectTypeConfig, GraphQLBoolean } from "graphql"
import { GraphQLContext } from "@server/graphql/V1";
import { AdherentAdhesionInstance } from "@server/database2/Models/adherentAdhesion";
import { GQLAdherent } from "@server/graphql/V1/types/objects/adherent";
import { GQLActiviteSection } from "@server/graphql/V1/types/objects/activiteSection";
import { GQLTarif } from "@server/graphql/V1/types/objects/tarif";
import { GQLActiviteSession } from "@server/graphql/V1/types/objects/activiteSession";



export const GQLAdherentAdhesion = new GraphQLObjectType({
    name: "AdherentAdhesion",
    fields: () => ({
        id: { type: GraphQLInt },
        valide: { type: GraphQLBoolean },
        adherent: {
            type: GQLAdherent,
            resolve: (root) => root.getAdherent()
        },
        section: {
            type: GQLActiviteSection,
            resolve: (root) => root.getSection()
        },
        tarif: {
            type: GQLTarif,
            resolve: (root) => root.getTarif()
        },
        sessions: {
            type: new GraphQLList(GQLActiviteSession),
            resolve: (root, args, context) => {
                return root.getSessions();
            }
        }
        
    })
} as GraphQLObjectTypeConfig<AdherentAdhesionInstance, GraphQLContext>)

