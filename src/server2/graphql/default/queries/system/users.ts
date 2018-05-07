import { GraphQLFieldConfig, GraphQLList } from "graphql"
import { SystemUser } from "./../../types/system/SystemUser";
import { dbcontext } from "@server/database";

export default {
    type: new GraphQLList(SystemUser),
    args: {},
    resolve: async (source, args, context) => {
        return dbcontext.models.users.findAll();
    }
} as GraphQLFieldConfig<any, any>