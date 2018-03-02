import { GraphQLSchema, schemaResolver } from "../utils/GraphQLSchema";
import { dbcontext } from "datas"
import { args_searchString } from "../utils/ArgsUtils";
import { GroupType } from "datas/entities/users/group";

export class graphql_group extends GraphQLSchema<GroupType> {
    Type = {
        defs: `
        type Group {
            id: Int
            nom: String
            permissions: [Permission]
            users: [User]
        }
        `,
        resolvers: {
            Group: {
                permissions(group: GroupType, args){
                    return group.getPermissions();
                },
                users(group: GroupType, args){
                    return group.getUsers();
                }
            },
        }
    }
    Query= {
        name:"groups",
        defs: `
            group(id: Int!): Group
            groups: [Group]
        `,
        resolvers: {
            group: (root, args) => {
                return dbcontext.models.groups.find({ where: args });
            },
            groups:(root, args) => {
                return dbcontext.models.groups.findAll();
            }
        }
    }

    Mutation = {
        name:"groups",
        defs:`
        addGroup(name: String!, permission_ids: [Int]): Group
        updateGroup(id: Int!, name: String): Group
        removeGroup(id: Int!): Boolean
        `,
        resolvers: {
            addGroup: (root, args, context) => {
                return dbcontext.models.groups.create({
                    nom: args.name
                }).then(group => {
                    if(!args.permission_ids) return group as any;
                    return dbcontext.models.permissions.findAll({
                        where: { id: args.permission_ids }
                    }).then(permissions => {
                        return (group as any).setPermissions(permissions);
                    }).then(() => group)
                });
            },
            updateGroup: (root, args, context) => {
                return dbcontext.models.groups.find({
                    where: { id: args.id }
                }).then(group => {
                    if(!group) throw new Error(`Not found group with id ${args.id}`)
                    if(args.name) group.nom = args.name;
                    return group.save();
                })
            },
            removeGroup: (root, args, context) => {
                return dbcontext.models.groups.find({
                    where: { id: args.id }
                }).then(group => {
                    if(!group) throw new Error(`Not found group with id ${args.id}`)
                    return group.destroy();
                }).then(() => {
                    return true;
                });
            },
        }
    }
}