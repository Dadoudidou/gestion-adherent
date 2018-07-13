import { GraphQLObjectType, GraphQLInt, GraphQLString, GraphQLList, GraphQLObjectTypeConfig, GraphQLFloat, GraphQLBoolean, GraphQLInputObjectType } from "graphql"
import { ActSessionType } from "@server/database/entities/admin/activite_session";
import { AdminLieu } from "@server/graphql/default/types/admin/AdminLieu";
import { AdminActiviteSection } from "@server/graphql/default/types/admin/AdminActiviteSection";


export const AdminActiviteSessionInput = new GraphQLInputObjectType({
    name: "AdminActiviteSessionInput",
    fields: () => ({
        id: { type: GraphQLInt },
        jour: { type: GraphQLInt },
        heure_debut: { type: GraphQLString },
        heure_fin: { type: GraphQLString },
        place: { type: GraphQLInt },
    })
})

