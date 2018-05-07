import * as Sequelize from "sequelize"
import { dataTypes } from "./../../dataTypes"
import { EntityClass } from "../../EntityClass";
import { DBModels } from "../..";
import { ActSectionType } from "./activite_section";
import { LieuType } from "./lieu";
import { AdhesionType } from "@server/datas/entities/members/adhesion";


export type ActSessionType = {
    id: number
    jour: number
    heure_debut: string
    heure_fin: string
    place: number
    admin_activite_section_id: number
    admin_lieu_id: number

    getSection: () => Promise<ActSectionType>
    getLieu: () => Promise<LieuType>
    getAdhesions: (opt?: Sequelize.FindOptions<AdhesionType>) => Promise<AdhesionType[]>
} & Sequelize.Instance<any>

export type ActSessionDBSet = {
    actSessions: Sequelize.Model<ActSessionType, any>
}

export class Entity_ActSession extends EntityClass {
    table_name = "admin_activite_session"
    model_name = "actSessions"
    model_attributes = {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        } as Sequelize.DefineAttributeColumnOptions,
        jour: {
            type: dataTypes.INTEGER,
            allowNull: false,
        } as Sequelize.DefineAttributeColumnOptions,
        heure_debut: {
            type: dataTypes.TIME,
            allowNull: false,
        } as Sequelize.DefineAttributeColumnOptions,
        heure_fin: {
            type: dataTypes.TIME,
            allowNull: false,
        } as Sequelize.DefineAttributeColumnOptions,
        place: {
            type: dataTypes.INTEGER,
            allowNull: false,
        } as Sequelize.DefineAttributeColumnOptions,
        admin_activite_section_id: {
            type: dataTypes.INTEGER,
            allowNull: false,
        } as Sequelize.DefineAttributeColumnOptions,
        admin_lieu_id: {
            type: dataTypes.INTEGER,
            allowNull: false,
        } as Sequelize.DefineAttributeColumnOptions,
    }
    model_options: Sequelize.DefineOptions<Entity_ActSession> = {}

    associations = (models: DBModels) => {
        this._model.belongsTo(models.actSections, {
            as: "section",
            foreignKey: "admin_activite_section_id"
        })
        this._model.belongsTo(models.lieux, {
            as: "lieu",
            foreignKey: "admin_lieu_id"
        })
        this._model.belongsToMany(models.adhesions, {
            through: "adherent_adhesion_session",
            as: "adhesions",
            foreignKey: "admin_activite_session_id"
        });
    }
}