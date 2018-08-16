import * as Sequelize from "sequelize";
import { DatabaseModel } from "../index";
import { ComptabiliteFactureInstance, ComptabiliteFactureAttributes } from "@server/database2/Models/comptabiliteFacture";

export type ComptabiliteTiersInstance = {
    id: number
    nom: string
    prenom: string
    adresse: string
    codepostal: string
    ville: string
    email:string
    telephone_fixe: string
    telephone_mobile: string
} & ComptabiliteTiersAssociations

export type ComptabiliteTiersAttributes = Partial<{
    id: number
    nom: string
    prenom: string
    adresse: string
    codepostal: string
    ville: string
    email:string
    telephone_fixe: string
    telephone_mobile: string
}>

export type ComptabiliteTiersAssociations = {
    // -- hasMany
    getFactures: Sequelize.HasManyGetAssociationsMixin<ComptabiliteFactureInstance>
    setFactures: Sequelize.HasManySetAssociationsMixin<ComptabiliteFactureInstance, any>
    createFacture: Sequelize.HasManyCreateAssociationMixin<ComptabiliteFactureAttributes, ComptabiliteFactureInstance>
    addFacture: Sequelize.HasManyAddAssociationMixin<ComptabiliteFactureInstance, any>
    addFactures: Sequelize.HasManyAddAssociationsMixin<ComptabiliteFactureInstance, any>
    removeFacture: Sequelize.HasManyRemoveAssociationMixin<ComptabiliteFactureInstance, any>
    removeFactures: Sequelize.HasManyRemoveAssociationsMixin<ComptabiliteFactureInstance, any>
    hasFacture: Sequelize.HasManyHasAssociationMixin<ComptabiliteFactureInstance, any>
    hasFactures: Sequelize.HasManyHasAssociationsMixin<ComptabiliteFactureInstance, any>
    countFactures: Sequelize.HasManyCountAssociationsMixin
}

export default {
    tableName: "comptabilite_tiers",
    attributes: {
        id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
        nom: Sequelize.STRING,
        prenom: Sequelize.STRING,
        adresse: Sequelize.STRING,
        codepostal: Sequelize.STRING,
        ville: Sequelize.STRING,
        telephone_fixe: Sequelize.STRING,
        telephone_mobile: Sequelize.STRING,
        email: Sequelize.STRING
    },
    relations: [
        {
            type: "hasMany",
            modelName: "comptabiliteFacture",
            options: { foreignKey: "comptabilite_tiers_id", as: "factures" }
        }
    ]
} as DatabaseModel<ComptabiliteTiersInstance, ComptabiliteTiersAttributes>