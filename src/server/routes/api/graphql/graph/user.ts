import { GraphQLSchema, schemaResolver } from "../utils/GraphQLSchema";
import { dbcontext } from "datas"
import { args_searchString } from "../utils/ArgsUtils";
import { UserType } from "datas/entities/users/user";

export class graphql_user extends GraphQLSchema<UserType> {
    Type = {
        defs: `
        type User {
            id: Int
            login: String
            nom: String
            prenom: String
            groups: [Group]
        }
        input _User {
            login: String
            pwd: String
            nom: String
            prenom: String
        }
        `,
        resolvers: {
            User: {
                groups: (root: UserType, args, context) => {
                    return root.getGroups();
                }
            }
        }
    }
    Query= {
        name:"users",
        defs: `
            user(id: Int!): User
            users: [User]
        `,
        resolvers: {
            user: (root, args) => {
                return dbcontext.models.users.find({ where: args });
            },
            users: (root, args, context, info) => {
                return dbcontext.models.users.findAll();
            },
        }
    }

    Mutation={
        name: "users",
        defs: `
        addUser(user: _User!): User
        updateUser(id: Int!, user: _User!): User
        removeUser(id: Int!): Boolean

        addUserToGroup(user_id: Int!, group_id: Int!): User
        removeUserFromGroup(user_id: Int!, group_id: Int!): User
        `,
        resolvers: {
            addUser: (root, args, context) => {
                return dbcontext.models.users
                    .create(args.user)
                    .then(user => { return user; });
            },
            updateUser: (root, args, context) => {
                return dbcontext.models.users
                    .find({ 
                        where: { id: args.id }
                    }).then(user => {
                        if(!user) throw new Error(`Not found user with id ${args.id}`)
                        for(let key in args.user){ user[key] = args.user[key]; }
                        return user.save();
                    })
            },
            removeUser: (root, args, context) => {
                return dbcontext.models.users
                    .find({ 
                        where: { id: args.id }
                    }).then(user => {
                        if(!user) throw new Error(`Not found user with id ${args.id}`)
                        return user.destroy();
                    }).then(() => true);
            },

            addUserToGroup: (root, args, context) => {
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
            },
            removeUserFromGroup: (root, {user_id, group_id}, context) => {
                return dbcontext.models.users
                    .find({ 
                        where: { id: user_id }
                    }).then(user => {
                        if(!user) throw new Error(`Not found user with id ${user_id}`)
                        return dbcontext.models.groups.find({
                            where: { id: group_id }
                        }).then(group => {
                            if(!group) throw new Error(`Not found group with id ${group_id}`)
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
        }
    }
}