import * as Sequelize from "sequelize";
import { DatabaseModel } from "../index";
import { ActiviteInstance, ActiviteAttributes } from "./activite";
import { ActiviteSessionInstance, ActiviteSessionAttributes } from "./activiteSession";
import { TarifInstance, TarifAttributes } from "@server/database2/Models/tarif";

export type ActiviteSectionInstance = {
    id: number
    nom: string
} & ActiviteSectionAssociations

export type ActiviteSectionAttributes = {
    id?: number
    nom?: string
    admin_activite_activite_id?: number
}

export type ActiviteSectionAssociations = {
    // -- belongsTo
    getActivite: Sequelize.BelongsToGetAssociationMixin<ActiviteInstance>
    setActivite: Sequelize.BelongsToSetAssociationMixin<ActiviteInstance, any>
    createActivite: Sequelize.BelongsToCreateAssociationMixin<ActiviteAttributes>
    
    // -- hasMany
    getSessions: Sequelize.HasManyGetAssociationsMixin<ActiviteSessionInstance>
    setSessions: Sequelize.HasManySetAssociationsMixin<ActiviteSessionInstance, any>
    createSession: Sequelize.HasManyCreateAssociationMixin<ActiviteSessionAttributes, ActiviteSessionInstance>
    addSession: Sequelize.HasManyAddAssociationMixin<ActiviteSessionInstance, any>
    addSessions: Sequelize.HasManyAddAssociationsMixin<ActiviteSessionInstance, any>
    removeSession: Sequelize.HasManyRemoveAssociationMixin<ActiviteSessionInstance, any>
    removeSessions: Sequelize.HasManyRemoveAssociationsMixin<ActiviteSessionInstance, any>
    hasSession: Sequelize.HasManyHasAssociationMixin<ActiviteSessionInstance, any>
    hasSessions: Sequelize.HasManyHasAssociationsMixin<ActiviteSessionInstance, any>
    countSessions: Sequelize.HasManyCountAssociationsMixin

    // -- hasMany
    getTarifs: Sequelize.HasManyGetAssociationsMixin<TarifInstance>
    setTarifs: Sequelize.HasManySetAssociationsMixin<TarifInstance, any>
    createTarif: Sequelize.HasManyCreateAssociationMixin<TarifAttributes, TarifInstance>
    addTarif: Sequelize.HasManyAddAssociationMixin<TarifInstance, any>
    addTarifs: Sequelize.HasManyAddAssociationsMixin<TarifInstance, any>
    removeTarif: Sequelize.HasManyRemoveAssociationMixin<TarifInstance, any>
    removeTarifs: Sequelize.HasManyRemoveAssociationsMixin<TarifInstance, any>
    hasTarif: Sequelize.HasManyHasAssociationMixin<TarifInstance, any>
    hasTarifs: Sequelize.HasManyHasAssociationsMixin<TarifInstance, any>
    countTarifs: Sequelize.HasManyCountAssociationsMixin
}

export default {
    tableName: "admin_activite_section",
    attributes: {
        id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
        nom: { type: Sequelize.STRING },
        admin_activite_activite_id: Sequelize.INTEGER
    },
    relations: [
        {
            type: "belongsTo",
            modelName: "activite",
            options: {  foreignKey: "admin_activite_activite_id", as:"activite" }
        },
        {
            type: "hasMany",
            modelName: "activiteSession",
            options: {  foreignKey: "admin_activite_section_id", as: "sessions" }
        },
        {
            type: "hasMany",
            modelName: "tarif",
            options:{ foreignKey: "admin_activite_section_id", as: "tarifs" }
        }
    ]
} as DatabaseModel<ActiviteSectionInstance, ActiviteSectionAttributes>