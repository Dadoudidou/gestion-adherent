import { GraphQLFieldConfig, GraphQLList, GraphQLInt, GraphQLNonNull } from "graphql"
import { dbcontext } from "@server/database";
import { SystemUser } from "./../../types/system/SystemUser";
import { InputSystemUser } from "./../../types/system/InputSystemUser";

type args = {
    id: number
    user: InputSystemUser
}

export default {
    type: SystemUser,
    args: {
        id: { type: new GraphQLNonNull(GraphQLInt) },
        user: { type: new GraphQLNonNull(InputSystemUser) }
    },
    resolve: async (source, args, context) => {
        const { user, id } = args;
        return dbcontext.models.users
                .find({ 
                    where: { id: args.id }
                }).then(user => {
                    if(!user) throw new Error(`Not found user with id ${args.id}`)
                    for(let key in args.user){ user[key] = args.user[key]; }
                    return user.save();
                })
    }
} as GraphQLFieldConfig<any, any, args>