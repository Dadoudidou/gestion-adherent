import * as Sequelize from "sequelize";
import { DatabaseModel } from "../index";
import * as bcrypt from "bcrypt-node"
import { UserGroupInstance, UserGroupAttributes } from "@server/database2/Models/userGroup";

export type UserInstance = {
    id: number
    nom: string
    prenom: string
    login: string
    pwd: string
} & UserAssociations

export type UserAttributes = Partial<{
    id: number
    nom: string
    prenom: string
    login: string
    pwd: string
}>

export type UserAssociations = {
    // -- belongsToMany
    addGroup: Sequelize.BelongsToManyAddAssociationMixin<UserGroupInstance, any, any>
    addGroups: Sequelize.BelongsToManyAddAssociationsMixin<UserGroupInstance, any, any>
    countGroups: Sequelize.BelongsToManyCountAssociationsMixin
    createGroup: Sequelize.BelongsToManyCreateAssociationMixin<UserGroupAttributes, UserGroupInstance, any>
    getGroups: Sequelize.BelongsToManyGetAssociationsMixin<UserGroupInstance>
    hasGroup: Sequelize.BelongsToManyHasAssociationMixin<UserGroupInstance, any>
    hasGroups: Sequelize.BelongsToManyHasAssociationsMixin<UserGroupInstance, any>
    removeGroup: Sequelize.BelongsToManyRemoveAssociationMixin<UserGroupInstance, any>
    removeGroups: Sequelize.BelongsToManyRemoveAssociationsMixin<UserGroupInstance, any>
    setGroups: Sequelize.BelongsToManySetAssociationsMixin<UserGroupInstance, any, any>

}

export default {
    tableName: "user_user",
    attributes: {
        id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
        nom: Sequelize.STRING,
        login: Sequelize.STRING,
        prenom: Sequelize.STRING,
        pwd: Sequelize.STRING
    },
    options: {
        hooks: {
            beforeCreate: (entity, options) => {
                return CryptPassword(entity.pwd)
                    .then((hash: string) => {
                        entity.pwd = hash;
                    })
                    .catch(err => {
                        if(err) console.log(err);
                    })
            }
        }
    },
    relations: [
        {
            type: "belongsToMany",
            modelName: "userGroup",
            options: { through: "user_user_has_user_group", as: "groups", foreignKey: "user_user_id" }
        }
    ]
} as DatabaseModel<UserInstance, UserAttributes>



export const CryptPassword = (password: string): Promise<string> => {
    return new Promise((resolve, reject) => {
        bcrypt.genSalt(10, (err, salt) => {
            if(err) reject(err);
            bcrypt.hash(password, salt, null, (err, hash: string) => {
                if(err) return reject(err);
                return resolve(hash);
            })
        })
    })
}

export const CheckPassword = (password: string, userPassword: string): Promise<boolean> => {
    return new Promise<boolean>((resolve, reject) => {
        bcrypt.compare(password, userPassword, (err, same) => {
            if(err) reject(err);
            resolve(same);
        })
    })
}