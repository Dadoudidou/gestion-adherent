import { GraphQLSchema, schemaResolver } from "../utils/GraphQLSchema";
import { dbcontext } from "datas"
import { args_searchString } from "../utils/ArgsUtils";
import { PermissionType } from "datas/entities/users/permission";

export class graphql_permission extends GraphQLSchema<PermissionType> {
    Type = {
        defs: `
            type Permission {
                id: Int
                nom: String
                description: String
                groups: [Group]
            }
        `,
        resolvers: {
            Permission: {
                groups(permission: PermissionType, args){
                    return permission.getGroups();
                }
            },
        }
    }
    Query= {
        name:"permissions",
        defs: `
            permission(id: Int!): Permission
            permissions: [Permission]
        `,
        resolvers: {
            permission: (root, args) => {
                return dbcontext.models.permissions.find({ where: args });
            },
            permissions:(root, args) => {
                return dbcontext.models.permissions.findAll();
            }
        }
    }

    Mutation={
        name:"permissions",
        defs: `
        addPermission(nom: String!, description: String): Permission
        updatePermission(id: Int!, nom: String, description: String): Permission
        removePermission(id: Int!): Boolean

        addPermissionToGroup(permission_id: Int!, group_id: Int!): Group
        removePermissionToGroup(permission_id: Int!, group_id: Int!): Group
        `,
        resolvers: {
            addPermission: (root, args, context) => {
                return dbcontext.models.permissions.create({
                    nom: args.nom,
                    description: args.description
                }).then(permission => {
                    return permission;
                });
            },
            updatePermission: (root, args, context) => {
                return dbcontext.models.permissions.find({
                    where: { id: args.id }
                }).then(permission => {
                    if(!permission) throw new Error(`Not found permission with id ${args.id}`)
                    if(args.nom) permission.nom = args.nom;
                    if(args.description) permission.description = args.description;
                    return permission.save();
                })
            },
            removePermission: (root, args, context) => {
                return dbcontext.models.permissions.find({
                    where: { id: args.id }
                }).then(permission => {
                    if(!permission) throw new Error(`Not found permission with id ${args.id}`)
                    return permission.destroy();
                }).then(() => true);
            },

            addPermissionToGroup: (root, args, context) => {
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
            },
            removePermissionToGroup: (root, args, context) => {
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
                            if(_index == -1) return group;
                            return group.setPermissions([
                                ...permissions.slice(0, _index),
                                ...permissions.slice(_index + 1)
                            ]).then(() => {
                                return group;
                            })
                        })
                    })
                })
            }
        }
    }
}