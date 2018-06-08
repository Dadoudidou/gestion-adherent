import { GraphQLFieldConfig, GraphQLList, GraphQLInt, GraphQLNonNull } from "graphql"
import { dbcontext } from "@server/database";
import { AdminCampagne } from "../../types/admin/AdminCampagne";

type args = {  }

export default {
    type: new GraphQLList(AdminCampagne),
    args: {

    },
    resolve: async (source, args, context) => {
        return dbcontext.models.saisons.findAll();
    }
} as GraphQLFieldConfig<any, any, args>