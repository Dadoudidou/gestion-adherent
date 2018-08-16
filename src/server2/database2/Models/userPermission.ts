import * as Sequelize from "sequelize";
import { DatabaseModel } from "../index";
import { UserGroupInstance, UserGroupAttributes } from "@server/database2/Models/userGroup";

export type UserPermissionInstance = {
    id: number
    nom: string
    description: string
} & UserPermissionAssociations

export type UserPermissionAttributes = Partial<{
    id: number
    nom: string
    description: string
}>

export type UserPermissionAssociations = {
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
    tableName: "user_permission",
    attributes: {
        id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
        nom: Sequelize.STRING,
        description: Sequelize.STRING
    },
    relations: [
        {
            type: "belongsToMany",
            modelName: "userGroup",
            options: { through: "user_group_has_user_permission", as: "groups", foreignKey: "user_permission_id" }
        }
    ]
} as DatabaseModel<UserPermissionInstance, UserPermissionAttributes>
