import * as Sequelize from "sequelize"
import { dataTypes } from "./../../dataTypes"
import { EntityClass } from "../../EntityClass";
import { DBModels } from "../..";
import { PermissionType } from "./permission";
import { UserType } from "./user";

export type GroupType = {
    id: number
    nom: string

    getPermissions: (opt?: Sequelize.FindOptions<PermissionType>) => Promise<PermissionType[]>
    getUsers: (opt?: Sequelize.FindOptions<UserType>) => Promise<UserType[]>

    setUsers: (values?: UserType[]) => Promise<void>
    setPermissions: (values?: PermissionType[]) => Promise<void>
} & Sequelize.Instance<any>

export type GroupDBSet = {
    groups: Sequelize.Model<GroupType, any>
}

export class Entity_Group extends EntityClass {
    table_name = "user_group"
    model_name = "groups"
    model_attributes = {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        } as Sequelize.DefineAttributeColumnOptions,
        nom: {
            type: dataTypes.STRING,
            allowNull: false,
        } as Sequelize.DefineAttributeColumnOptions,
    }
    model_options: Sequelize.DefineOptions<Entity_Group> = {}
    
    associations = (models: DBModels) => {
        this._model.belongsToMany(models.users, {
            through: "user_user_has_user_group",
            as: "users",
            foreignKey: "user_group_id"
        });
        this._model.belongsToMany(models.permissions, {
            through: "user_group_has_user_permission",
            as: "permissions",
            foreignKey: "user_group_id"
        });
    }
}