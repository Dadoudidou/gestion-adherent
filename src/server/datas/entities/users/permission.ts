import * as Sequelize from "sequelize"
import { dataTypes } from "./../../dataTypes"
import { EntityClass } from "../../EntityClass";
import { DBModels } from "../..";
import { GroupType } from "./group";

export type PermissionType = {
    id: number
    nom: string
    description: string

    getGroups: (opt?: Sequelize.FindOptions<GroupType>) => Promise<GroupType[]>
    setGroups: (values?: GroupType[]) => Promise<void>
} & Sequelize.Instance<any>

export type PermissionDBSet = {
    permissions: Sequelize.Model<PermissionType, any>
}

export class Entity_Permission extends EntityClass {
    table_name = "user_permission"
    model_name = "permissions"
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
        description: {
            type: dataTypes.STRING,
            allowNull: true,
        } as Sequelize.DefineAttributeColumnOptions,
    }
    model_options: Sequelize.DefineOptions<Entity_Permission> = {}
    
    associations = (models: DBModels) => {
        this._model.belongsToMany(models.groups, {
            through: "user_group_has_user_permission",
            as: "groups",
            foreignKey: "user_permission_id"
        });
    }
}