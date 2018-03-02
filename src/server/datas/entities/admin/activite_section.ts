import * as Sequelize from "sequelize"
import { dataTypes } from "./../../dataTypes"
import { EntityClass } from "../../EntityClass";
import { ActSessionType } from "./activite_session";
import { DBModels } from "../..";
import { ActActiviteType } from "./activite_activite";


export type ActSectionType = {
    id: number
    nom: string
    admin_activite_activite_id: number

    getSessions: (opt?: Sequelize.FindOptions<ActSessionType>) => Promise<ActSessionType[]>
    getActivite: () => Promise<ActActiviteType>
}

export type ActSectionDBSet = {
    actSections: Sequelize.Model<ActSectionType, any>
}

export class Entity_ActSection extends EntityClass {
    table_name = "admin_activite_section"
    model_name = "actSections"
    model_attributes = {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        } as Sequelize.DefineAttributeColumnOptions,
        nom: {
            type: dataTypes.STRING,
            allowNull: false,
        } as Sequelize.DefineAttributeColumnOptions,
        admin_activite_activite_id: {
            type: dataTypes.INTEGER,
            allowNull: false,
        } as Sequelize.DefineAttributeColumnOptions,
    }
    model_options: Sequelize.DefineOptions<Entity_ActSection> = {}

    associations = (models: DBModels) => {
        this._model.hasMany(models.actSessions, {
            as: "sessions",
            foreignKey: "admin_activite_section_id"
        })
        this._model.belongsTo(models.actActivites, {
            as: "activite",
            foreignKey: "admin_activite_activite_id"
        })
    }
}