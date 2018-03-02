import { GraphqlObject } from "../../utils/GraphQLSchema/graphqlObject";
import { dbcontext } from "datas";
import { UserType } from "datas/entities/users/user";

export class User extends GraphqlObject {
    name = "User"
    attributes = {
        id: "Int",
        nom: "String",
        prenom: "String",
        login: "String",
        groups: {
            type: "[Group]",
            resolver: (root: UserType) => { return root.getGroups(); }
        },
    }
    queryAttributes = {
        users: {
            type: '[User]',
            resolver: () => { return dbcontext.models.users.findAll(); }
        },
        user: {
            type: "User",
            args: {
                id: "Int!"
            },
            resolver: (root, args) => { return dbcontext.models.users.find({ where: args }); }
        }
    }
    mutationAttributes = {
        addUser: {
            type: "User",
            args: { user: "_User!" },
            resolver: (root, args, context) => { 
                return dbcontext.models.users
                    .create(args.user)
                    .then(user => { return user; });
            }
        },
        updateUser: {
            type: "User",
            args: { user: "_User!", id: "Int!" },
            resolver: (root, args, context) => { 
                return dbcontext.models.users
                    .find({ 
                        where: { id: args.id }
                    }).then(user => {
                        if(!user) throw new Error(`Not found user with id ${args.id}`)
                        for(let key in args.user){ user[key] = args.user[key]; }
                        return user.save();
                    })
             }
        },
        removeUser: {
            type: "Boolean",
            args: { id: "Int!" },
            resolver: (root, args, context) => { 
                return dbcontext.models.users
                    .find({ 
                        where: { id: args.id }
                    }).then(user => {
                        if(!user) throw new Error(`Not found user with id ${args.id}`)
                        return user.destroy();
                    }).then(() => true);
             }
        },

        addUserToGroup: {
            type: "User",
            args: { user_id: "Int!", group_id: "Int!" },
            resolver: (root, args, context) => { 
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
                                if(_index > -1) return user;
                                return (user as any).setGroups([...groups, group]).then(() => user);
                            })
                        })
                    });
             }
        },
        removeUserFromGroup: {
            type: "User",
            args: { user_id: "Int!", group_id: "Int!" },
            resolver: (root, args, context) => { 
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
        },
    }
}

export class InputUser extends GraphqlObject
{
    type = "input"
    name="_User";
    attributes = {
        login: "String",
        pwd: "String",
        nom: "String",
        prenom: "String",
    }
}