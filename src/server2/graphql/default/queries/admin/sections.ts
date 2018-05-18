import { GraphQLFieldConfig, GraphQLList, GraphQLInt, GraphQLNonNull } from "graphql"
import { dbcontext } from "@server/database";
import { AdminActiviteSection } from "../../types/admin/AdminActiviteSection";

type args = {  }

export default {
    type: new GraphQLList(AdminActiviteSection),
    args: {

    },
    resolve: async (source, args, context) => {
        return dbcontext.models.actSections.findAll();
    }
} as GraphQLFieldConfig<any, any, args>