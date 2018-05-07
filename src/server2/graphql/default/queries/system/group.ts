import { GraphQLFieldConfig, GraphQLList, GraphQLInt, GraphQLNonNull } from "graphql"
import { dbcontext } from "@server/database";
import { SystemGroup } from "./../../types/system/SystemGroup";

type args = { id: number }

export default {
    type: SystemGroup,
    args: {
        id: { type: new GraphQLNonNull(GraphQLInt) }
    },
    resolve: async (source, args, context) => {
        const { id } = args;
        return dbcontext.models.groups.find({ where: args });
    }
} as GraphQLFieldConfig<any, any, args>