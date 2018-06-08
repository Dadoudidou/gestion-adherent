import { GraphQLObjectType, GraphQLInt, GraphQLString, GraphQLList, GraphQLObjectTypeConfig, GraphQLFloat, GraphQLBoolean } from "graphql"
import { AdhesionType } from "@server/database/entities/members/adhesion"
import { ScalarDate } from "@server/graphql/default/types/Date";
import { DocumentType } from "@server/database/entities/members/document";
import { Adherent } from "./Adherent";
import { AdminActiviteSection } from "../admin/AdminActiviteSection";
import { AdminTarif } from "../admin/AdminTarif";
import { AdminActiviteSession } from "../admin/AdminActiviteSession";

export const Adhesion = new GraphQLObjectType({
    name: "Adhesion",
    fields: () => ({
        id: { type: GraphQLInt },
        valide: { type: GraphQLBoolean },
        adherent: {
            type: Adherent,
            resolve: (root) => root.getAdherent()
        },
        section: {
            type: AdminActiviteSection,
            resolve: (root) => root.getSection()
        },
        tarif: {
            type: AdminTarif,
            resolve: (root) => root.getTarif()
        },
        sessions: {
            type: new GraphQLList(AdminActiviteSession),
            resolve: (root, args, context) => {
                return root.getSessions();
            }
        }
    })
} as GraphQLObjectTypeConfig<AdhesionType, any>)
