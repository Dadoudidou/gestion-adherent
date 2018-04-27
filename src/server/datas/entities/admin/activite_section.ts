import * as Sequelize from "sequelize"
import { dataTypes } from "./../../dataTypes"
import { EntityClass } from "../../EntityClass";
import { ActSessionType } from "./activite_session";
import { DBModels } from "../..";
import { ActActiviteType } from "./activite_activite";
import { TarifType } from "@server/datas/entities/admin/tarif";
import { AdhesionType } from "@server/datas/entities/members/adhesion";


export type ActSectionType = {
    id: number
    nom: string
    admin_activite_activite_id: number

    getSessions: (opt?: Sequelize.FindOptions<ActSessionType>) => Promise<ActSessionType[]>
    getActivite: () => Promise<ActActiviteType>
    getTarifs: (opt?: Sequelize.FindOptions<TarifType>) => Promise<TarifType[]>
    getAdhesions: (opt?: Sequelize.FindOptions<AdhesionType>) => Promise<AdhesionType[]>

    createSession: (value: Partial<ActSessionType>) => Promise<ActSessionType>

} & Sequelize.Instance<any>

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
        this._model.hasMany(models.tarifs, {
            as: "tarifs",
            foreignKey: "admin_activite_section_id"
        })
        this._model.hasMany(models.adhesions, {
            as: "adhesions",
            foreignKey: "admin_activite_section_id"
        })
    }
}