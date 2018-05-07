import { GraphQLFieldConfig, GraphQLList } from "graphql"
import { dbcontext } from "@server/database";
import { SystemPermission } from "./../../types/system/SystemPermission";

export default {
    type: new GraphQLList(SystemPermission),
    args: {},
    resolve: async (source, args, context) => {
        return dbcontext.models.permissions.findAll();
    }
} as GraphQLFieldConfig<any, any>