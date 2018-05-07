import { GraphQLFieldConfig, GraphQLList, GraphQLInt, GraphQLNonNull, GraphQLString } from "graphql"
import { dbcontext } from "@server/database";
import { SystemGroup } from "./../../types/system/SystemGroup";


type args = {
    permission_id: number
    group_id: number
}

export default {
    type: SystemGroup,
    args: {
        permission_id: { type: new GraphQLNonNull(GraphQLInt) },
        group_id: { type: new GraphQLNonNull(GraphQLInt) }
    },
    resolve: async (source, args, context) => {
        return dbcontext.models.groups.find({
            where: { id: args.group_id }
        }).then(group => {
            if(!group) throw new Error(`Not found group with id ${args.group_id}`)
            return dbcontext.models.permissions.find({
                where: { id: args.permission_id }
            }).then(permission => {
                if(!permission) throw new Error(`Not found permission with id ${args.permission_id}`)
                return group.getPermissions().then(permissions => {
                    let _index = permissions.map(x => x.id).indexOf(permission.id);
                    if(_index > -1) return group;
                    return group.setPermissions([...permissions, permission]).then(() => group)
                })
            })
        })
    }
} as GraphQLFieldConfig<any, any, args>