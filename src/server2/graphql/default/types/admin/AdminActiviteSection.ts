import { GraphQLObjectType, GraphQLInt, GraphQLString, GraphQLList, GraphQLObjectTypeConfig, GraphQLFloat, GraphQLBoolean } from "graphql"
import { ActSectionType } from "@server/database/entities/admin/activite_section";
import { AdminActiviteSession } from "@server/graphql/default/types/admin/AdminActiviteSession";
import { AdminActivite } from "@server/graphql/default/types/admin/AdminActivite";
import { AdminTarif } from "@server/graphql/default/types/admin/AdminTarif";


export const AdminActiviteSection = new GraphQLObjectType({
    name: "AdminActiviteSection",
    fields: () => ({
        id: { type: GraphQLInt },
        nom: { type: GraphQLString },
        sessions: {
            type: new GraphQLList(AdminActiviteSession),
            resolve: async (source, args, context) => {
                return source.getSessions();
            }
        },
        activite: {
            type: AdminActivite,
            resolve: async (source, args, context) => {
                return source.getActivite();
            }
        },
        tarifs: {
            type: new GraphQLList(AdminTarif),
            resolve: async (source, args, context) => {
                return source.getTarifs();
            }
        },
    })
} as GraphQLObjectTypeConfig<ActSectionType, any>)

