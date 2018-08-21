import * as Sequelize from "sequelize";
import { DatabaseModel } from "../index";
import { UserPermissionInstance, UserPermissionAttributes } from "@server/database2/Models/userPermission";

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
    addPermission: Sequelize.BelongsToManyAddAssociationMixin<UserPermissionInstance, any, any>
    addPermissions: Sequelize.BelongsToManyAddAssociationsMixin<UserPermissionInstance, any, any>
    countPermissions: Sequelize.BelongsToManyCountAssociationsMixin
    createPermission: Sequelize.BelongsToManyCreateAssociationMixin<UserPermissionAttributes, UserPermissionInstance, any>
    getPermissions: Sequelize.BelongsToManyGetAssociationsMixin<UserPermissionInstance>
    hasPermission: Sequelize.BelongsToManyHasAssociationMixin<UserPermissionInstance, any>
    hasPermissions: Sequelize.BelongsToManyHasAssociationsMixin<UserPermissionInstance, any>
    removePermission: Sequelize.BelongsToManyRemoveAssociationMixin<UserPermissionInstance, any>
    removePermissions: Sequelize.BelongsToManyRemoveAssociationsMixin<UserPermissionInstance, any>
    setPermissions: Sequelize.BelongsToManySetAssociationsMixin<UserPermissionInstance, any, any>
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

