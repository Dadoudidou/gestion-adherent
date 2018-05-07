import { GraphQLFieldConfig, GraphQLList, GraphQLInt, GraphQLNonNull, GraphQLBoolean } from "graphql"
import { dbcontext } from "@server/database";
import { SystemUser } from "./../../types/system/SystemUser";
import { InputSystemUser } from "./../../types/system/InputSystemUser";

type args = {
    id: number
}

export default {
    type: GraphQLBoolean,
    args: {
        id: { type: new GraphQLNonNull(GraphQLInt) },
    },
    resolve: async (source, args, context) => {
        return dbcontext.models.groups.find({
            where: { id: args.id }
        }).then(group => {
            if(!group) throw new Error(`Not found group with id ${args.id}`)
            return group.destroy();
        }).then(() => {
            return true;
        });
    }
} as GraphQLFieldConfig<any, any, args>