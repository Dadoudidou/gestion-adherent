import { GraphQLObjectType, GraphQLInt, GraphQLString, GraphQLList, GraphQLObjectTypeConfig, GraphQLFloat, GraphQLBoolean, GraphQLInputObjectType } from "graphql"
import { TarifType } from "@server/database/entities/admin/tarif";
import { AdminCampagne } from "@server/graphql/default/types/admin/AdminCampagne";
import { AdminActiviteSection } from "@server/graphql/default/types/admin/AdminActiviteSection";
import { ScalarDate } from "../Date";


export const AdminTarifInput = new GraphQLInputObjectType({
    name: "AdminTarifInput",
    fields: () => ({
        id: { type: GraphQLInt },
        montant: { type: GraphQLFloat },
        nbsessionmin: { type: GraphQLInt },
        nbsessionmax: { type: GraphQLInt },
        carte: { type: GraphQLBoolean },
        carte_nbsession: { type: GraphQLInt },
        restriction_date_debut: { type: ScalarDate },
        restriction_date_fin: { type: ScalarDate },
    })
})

