import { GraphQLFieldConfig, GraphQLList, GraphQLInt, GraphQLNonNull, GraphQLString } from "graphql"
import { dbcontext } from "@server/database";
import { SystemUser } from "./../../types/system/SystemUser";


type args = {
    user_id: number
    group_id: number
}

export default {
    type: SystemUser,
    args: {
        user_id: { type: new GraphQLNonNull(GraphQLInt) },
        group_id: { type: new GraphQLNonNull(GraphQLInt) }
    },
    resolve: async (source, args, context) => {
        return dbcontext.models.users
            .find({ 
                where: { id: args.user_id }
            }).then(user => {
                if(!user) throw new Error(`Not found user with id ${args.user_id}`)
                return dbcontext.models.groups.find({
                    where: { id: args.group_id }
                }).then(group => {
                    if(!group) throw new Error(`Not found group with id ${args.group_id}`)
                    return user.getGroups().then(groups => {
                        let _index = groups.map(x => x.id).indexOf(group.id);
                        if(_index == -1) return user;
                        return (user as any).setGroups([
                            ...groups.slice(0,_index), 
                            ...groups.slice(_index + 1)
                        ]).then(() => user);
                    })
                })
            });
    }
} as GraphQLFieldConfig<any, any, args>