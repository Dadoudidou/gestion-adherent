import { GraphQLFieldConfig, GraphQLList, GraphQLInt, GraphQLNonNull } from "graphql"
import { dbcontext } from "@server/database";
import { SystemUser } from "./../../types/system/SystemUser";
import { InputSystemUser } from "./../../types/system/InputSystemUser";

type args = {
    user: InputSystemUser
}

export default {
    type: SystemUser,
    args: {
        user: { type: new GraphQLNonNull(InputSystemUser) }
    },
    resolve: async (source, args, context) => {
        const { user } = args;
        return dbcontext.models.users
                .create(args.user)
                .then(user => { return user; });
    }
} as GraphQLFieldConfig<any, any, args>