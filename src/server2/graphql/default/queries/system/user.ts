import { GraphQLFieldConfig, GraphQLList, GraphQLInt, GraphQLNonNull } from "graphql"
import { SystemUser } from "./../../types/system/SystemUser";
import { dbcontext } from "@server/database";

type args = { id: number }

export default {
    type: SystemUser,
    args: {
        id: { type: new GraphQLNonNull(GraphQLInt) }
    },
    resolve: async (source, args, context) => {
        const { id } = args;
        return dbcontext.models.users.find({ where: args });
    }
} as GraphQLFieldConfig<any, any, args>