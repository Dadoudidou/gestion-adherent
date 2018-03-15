import { GraphqlObject } from "../../utils/GraphQLSchema/graphqlObject";
import { dbcontext } from "./../../../../../datas";
import { PermissionType } from "./../../../../../datas/entities/users/permission";

export class Permission extends GraphqlObject {
    name = "Permission"
    attributes = {
        id: "Int",
        nom: "String",
        description: "String",
        groups: {
            type: "[Group]",
            resolver: (root: PermissionType) => { return root.getGroups(); }
        },
    }
    queryAttributes = {
        permissions: {
            type: '[Permission]',
            resolver: () => { return dbcontext.models.permissions.findAll(); }
        },
        permission: {
            type: "Permission",
            args: {
                id: "Int!"
            },
            resolver: (root, args) => { return dbcontext.models.permissions.find({ where: args }); }
        }
    }
    mutationAttributes = {
        addPermission: {
            type: "Permission",
            args: { nom: "String!", description: "String" },
            resolver: (root, args, context) => { 
                return dbcontext.models.permissions.create({
                    nom: args.nom,
                    description: args.description
                }).then(permission => {
                    return permission;
                });
            }
        },
        updatePermission: {
            type: "Permission",
            args: { nom: "String!", description: "String", id: "Int!" },
            resolver: (root, args, context) => { 
                return dbcontext.models.permissions.find({
                    where: { id: args.id }
                }).then(permission => {
                    if(!permission) throw new Error(`Not found permission with id ${args.id}`)
                    if(args.nom) permission.nom = args.nom;
                    if(args.description) permission.description = args.description;
                    return permission.save();
                })
             }
        },
        removePermission: {
            type: "Boolean",
            args: { id: "Int!" },
            resolver: (root, args, context) => { 
                return dbcontext.models.permissions.find({
                    where: { id: args.id }
                }).then(permission => {
                    if(!permission) throw new Error(`Not found permission with id ${args.id}`)
                    return permission.destroy();
                }).then(() => true);
             }
        },

        addPermissionToGroup: {
            type: "Group",
            args: { permission_id: "Int!", group_id: "Int!" },
            resolver: (root, args, context) => { 
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
        },
        removePermissionToGroup: {
            type: "Group",
            args: { permission_id: "Int!", group_id: "Int!" },
            resolver: (root, args, context) => { 
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
        },
    }
    rules = [
        "users/permissions/add",
        "users/permissions/edit",
        "users/permissions/remove",
        "users/permissions/view"
    ]
}

export class InputUser extends GraphqlObject
{
    isInput = true
    name="_User"
    attributes = {
        login: "String",
        pwd: "String",
        nom: "String",
        prenom: "String",
    }
}