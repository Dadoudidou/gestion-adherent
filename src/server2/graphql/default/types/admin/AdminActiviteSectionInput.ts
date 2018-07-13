import { GraphQLObjectType, GraphQLInt, GraphQLString, GraphQLList, GraphQLObjectTypeConfig, GraphQLFloat, GraphQLBoolean, GraphQLInputObjectType } from "graphql"
import { ActSectionType } from "@server/database/entities/admin/activite_section";
import { AdminActiviteSession } from "@server/graphql/default/types/admin/AdminActiviteSession";
import { AdminActivite } from "@server/graphql/default/types/admin/AdminActivite";
import { AdminTarif } from "@server/graphql/default/types/admin/AdminTarif";


export const AdminActiviteSectionInput = new GraphQLInputObjectType({
    name: "AdminActiviteSectionInput",
    fields: () => ({
        id: { type: GraphQLInt },
        nom: { type: GraphQLString },
    })
})

