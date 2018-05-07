import { GraphQLFieldConfig, GraphQLList } from "graphql"
import { dbcontext } from "@server/database";
import { SystemGroup } from "./../../types/system/SystemGroup";

export default {
    type: new GraphQLList(SystemGroup),
    args: {},
    resolve: async (source, args, context) => {
        return dbcontext.models.groups.findAll();
    }
} as GraphQLFieldConfig<any, any>