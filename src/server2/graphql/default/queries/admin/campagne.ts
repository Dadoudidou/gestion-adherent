import { GraphQLFieldConfig, GraphQLList, GraphQLInt, GraphQLNonNull } from "graphql"
import { dbcontext } from "@server/database";
import { AdminActiviteSection } from "../../types/admin/AdminActiviteSection";
import { AdminCampagne } from "../../types/admin/AdminCampagne";

type args = { id: number }

export default {
    type: AdminCampagne,
    args: {
        id: { type: new GraphQLNonNull(GraphQLInt) }
    },
    resolve: async (source, args, context) => {
        return dbcontext.models.saisons.find({ where: args });
    }
} as GraphQLFieldConfig<any, any, args>