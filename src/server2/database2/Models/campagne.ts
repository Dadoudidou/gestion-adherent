import * as Sequelize from "sequelize";
import { DatabaseModel } from "../index";
import { ActiviteCategorieInstance, ActiviteCategorieAttributes } from "./activiteCategorie";
import { TarifLicenceInstance, TarifLicenceAttributes } from "@server/database2/Models/tarifLicence";

export type CampagneInstance = {
    id: number
    debut: Date
    fin: Date
    nom: string
} & CampagneAssociations

export type CampagneAttributes = {
    id?: number
    debut?: Date
    fin?: Date
    nom?: string
}

export type CampagneAssociations = {
    // -- hasMany
    getCategories: Sequelize.HasManyGetAssociationsMixin<ActiviteCategorieInstance>
    createCategorie: Sequelize.HasManyCreateAssociationMixin<ActiviteCategorieAttributes, ActiviteCategorieInstance>
    addCategorie: Sequelize.HasManyAddAssociationMixin<ActiviteCategorieInstance, any>
    removeCategorie: Sequelize.HasManyRemoveAssociationMixin<ActiviteCategorieInstance, any>

    // -- hasMany
    getLicences: Sequelize.HasManyGetAssociationsMixin<TarifLicenceInstance>
    createLicences: Sequelize.HasManyCreateAssociationMixin<TarifLicenceAttributes, TarifLicenceInstance>
    addLicences: Sequelize.HasManyAddAssociationMixin<TarifLicenceInstance, any>
    removeLicences: Sequelize.HasManyRemoveAssociationMixin<TarifLicenceInstance, any>
}

export default {
    tableName: "admin_saison",
    attributes: {
        id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
        debut: Sequelize.DATE,
        fin: Sequelize.DATE,
        nom: Sequelize.STRING,
    },
    relations: [
        {
            type: "hasMany",
            modelName: "activiteCategorie",
            options: { foreignKey:"admin_saison_id", as:"categories"}
        },
        {
            type: "hasMany",
            modelName: "tarifLicence",
            options: { foreignKey: "admin_saison_id", as: "licences" }
        }
    ]
} as DatabaseModel<CampagneInstance, CampagneAttributes>