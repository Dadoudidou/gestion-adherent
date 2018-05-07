import { GraphQLObjectType, GraphQLInt, GraphQLString, GraphQLList, GraphQLObjectTypeConfig, GraphQLFloat, GraphQLBoolean } from "graphql"
import { ActSessionType } from "@server/database/entities/admin/activite_session";
import { AdminLieu } from "@server/graphql/default/types/admin/AdminLieu";
import { AdminActiviteSection } from "@server/graphql/default/types/admin/AdminActiviteSection";


export const AdminActiviteSession = new GraphQLObjectType({
    name: "AdminActiviteSession",
    fields: () => ({
        id: { type: GraphQLInt },
        jour: { type: GraphQLInt },
        heure_debut: { type: GraphQLString },
        heure_fin: { type: GraphQLString },
        place: { type: GraphQLInt },
        lieu: {
            type: AdminLieu,
            resolve: async (source, args, context) => {
                return source.getLieu();
            }
        },
        section: {
            type: AdminActiviteSection,
            resolve: async (source, args, context) => {
                return source.getSection();
            }
        },
    })
} as GraphQLObjectTypeConfig<ActSessionType, any>)

