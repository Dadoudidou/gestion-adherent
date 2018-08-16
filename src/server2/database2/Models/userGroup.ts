import * as Sequelize from "sequelize";
import { DatabaseModel } from "../index";

export type UserGroupInstance = {
    id: number
    nom: string
} & UserGroupAssociations

export type UserGroupAttributes = Partial<{
    id: number
    nom: string
}>

export type UserGroupAssociations = {
    // -- belongsToMany
    addUser: Sequelize.BelongsToManyAddAssociationMixin<UserGroupInstance, any, any>
    addUsers: Sequelize.BelongsToManyAddAssociationsMixin<UserGroupInstance, any, any>
    countUsers: Sequelize.BelongsToManyCountAssociationsMixin
    createUser: Sequelize.BelongsToManyCreateAssociationMixin<UserGroupAttributes, UserGroupInstance, any>
    getUsers: Sequelize.BelongsToManyGetAssociationsMixin<UserGroupInstance>
    hasUser: Sequelize.BelongsToManyHasAssociationMixin<UserGroupInstance, any>
    hasUsers: Sequelize.BelongsToManyHasAssociationsMixin<UserGroupInstance, any>
    removeUser: Sequelize.BelongsToManyRemoveAssociationMixin<UserGroupInstance, any>
    removeUsers: Sequelize.BelongsToManyRemoveAssociationsMixin<UserGroupInstance, any>
    setUsers: Sequelize.BelongsToManySetAssociationsMixin<UserGroupInstance, any, any>
    
    // -- belongsToMany
    addPermission: Sequelize.BelongsToManyAddAssociationMixin<UserGroupInstance, any, any>
    addPermissions: Sequelize.BelongsToManyAddAssociationsMixin<UserGroupInstance, any, any>
    countPermissions: Sequelize.BelongsToManyCountAssociationsMixin
    createPermission: Sequelize.BelongsToManyCreateAssociationMixin<UserGroupAttributes, UserGroupInstance, any>
    getPermissions: Sequelize.BelongsToManyGetAssociationsMixin<UserGroupInstance>
    hasPermission: Sequelize.BelongsToManyHasAssociationMixin<UserGroupInstance, any>
    hasPermissions: Sequelize.BelongsToManyHasAssociationsMixin<UserGroupInstance, any>
    removePermission: Sequelize.BelongsToManyRemoveAssociationMixin<UserGroupInstance, any>
    removePermissions: Sequelize.BelongsToManyRemoveAssociationsMixin<UserGroupInstance, any>
    setPermissions: Sequelize.BelongsToManySetAssociationsMixin<UserGroupInstance, any, any>
}

export default {
    tableName: "user_group",
    attributes: {
        id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
        nom: Sequelize.STRING,
    },
    relations: [
        {
            type: "belongsToMany",
            modelName: "user",
            options: { through: "user_user_has_user_group", as: "users", foreignKey: "user_group_id" }
        },
        {
            type: "belongsToMany",
            modelName: "userPermission",
            options: { through: "user_group_has_user_permission", as: "permissions", foreignKey: "user_group_id" }
        }
    ]
} as DatabaseModel<UserGroupInstance, UserGroupAttributes>

