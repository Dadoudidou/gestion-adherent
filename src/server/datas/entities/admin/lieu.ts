import * as Sequelize from "sequelize"
import { dataTypes } from "./../../dataTypes"
import { EntityClass } from "../../EntityClass";
import { DBModels } from "../..";
import { ActSessionType } from "./activite_session";


export type LieuType = {
    id: number
    nom: string
    adresse: string
    codepostal: string
    ville: string

    getSessions: (opt?: Sequelize.FindOptions<ActSessionType>) => Promise<ActSessionType[]>
}

export type LieuDBSet = {
    lieux: Sequelize.Model<LieuType, any>
}

export class Entity_Lieu extends EntityClass {
    table_name = "admin_lieu"
    model_name = "lieux"
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
        adresse: {
            type: dataTypes.STRING,
            allowNull: true,
        } as Sequelize.DefineAttributeColumnOptions,
        codepostal: {
            type: dataTypes.STRING,
            allowNull: true,
        } as Sequelize.DefineAttributeColumnOptions,
        ville: {
            type: dataTypes.STRING,
            allowNull: true,
        } as Sequelize.DefineAttributeColumnOptions,
    }
    model_options: Sequelize.DefineOptions<Entity_Lieu> = {}

    associations = (models: DBModels) => {
        this._model.hasMany(models.actSessions, {
            as: "sessions",
            foreignKey: "admin_lieu_id"
        })
    }
}