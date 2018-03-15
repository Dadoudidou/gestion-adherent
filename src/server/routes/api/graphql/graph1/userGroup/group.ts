import { GraphqlObject } from "../../utils/GraphQLSchema/graphqlObject";
import { dbcontext } from "./../../../../../datas";
import { GroupType } from "./../../../../../datas/entities/users/group";

export class Group extends GraphqlObject {
    name = "Group"
    attributes = {
        id: "Int",
        nom: "String",
        permissions: {
            type: "[Permission]",
            resolver: (root: GroupType) => { return root.getPermissions() }
        },
        users: {
            type: "[User]",
            resolver: (root: GroupType) => { return root.getUsers() }
        },
    }
    queryAttributes = {
        groups: {
            type: '[Group]',
            resolver: () => { return dbcontext.models.groups.findAll(); }
        },
        group: {
            type: "Group",
            args: {
                id: "Int!"
            },
            resolver: (root, args) => { return dbcontext.models.groups.find({ where: args }); }
        }
    }
    mutationAttributes = {
        addGroup: {
            type: "Group",
            args: { nom: "String!" },
            resolver: (root, args, context) => { 
                return dbcontext.models.groups.create({
                    nom: args.nom
                });
            }
        },
        updateGroup: {
            type: "Group",
            args: { nom: "String!", id: "Int!" },
            resolver: (root, args, context) => { 
                return dbcontext.models.groups.find({
                    where: { id: args.id }
                }).then(group => {
                    if(!group) throw new Error(`Not found group with id ${args.id}`)
                    if(args.name) group.nom = args.nom;
                    return group.save();
                })
             }
        },
        removeGroup: {
            type: "Boolean",
            args: { id: "Int!" },
            resolver: (root, args, context) => { 
                return dbcontext.models.groups.find({
                    where: { id: args.id }
                }).then(group => {
                    if(!group) throw new Error(`Not found group with id ${args.id}`)
                    return group.destroy();
                }).then(() => {
                    return true;
                });
             }
        },
    }
    rules = [
        "users/groups/add",
        "users/groups/edit",
        "users/groups/remove",
        "users/groups/view"
    ]
}
