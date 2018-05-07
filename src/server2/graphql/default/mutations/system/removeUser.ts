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
        const { id } = args;
        return dbcontext.models.users
                .find({ 
                    where: { id: args.id }
                }).then(user => {
                    if(!user) throw new Error(`Not found user with id ${args.id}`)
                    return user.destroy();
                }).then(() => true);
    }
} as GraphQLFieldConfig<any, any, args>