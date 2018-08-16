import * as Sequelize from "sequelize";
import { DatabaseModel } from "../index";
import { ActiviteSessionInstance, ActiviteSessionAttributes } from "./activiteSession";
import { ComptabiliteFactureDetailInstance, ComptabiliteFactureDetailAttributes } from "@server/database2/Models/comptabiliteFactureDetail";
import { ComptabiliteFacturePaiementInstance, ComptabiliteFacturePaiementAttributes } from "@server/database2/Models/comptabiliteFacturePaiement";
import { ComptabiliteTiersInstance, ComptabiliteTiersAttributes } from "@server/database2/Models/comptabiliteTiers";

export type ComptabiliteFactureInstance = {
    id: number
    date_creation: Date
} & ComptabiliteFactureAssociations

export type ComptabiliteFactureAttributes = Partial<{
    id?: number
    date_creation: Date
    comptabilite_tiers_id: number
}>

export type ComptabiliteFactureAssociations = {
    // -- hasMany
    getDetails: Sequelize.HasManyGetAssociationsMixin<ComptabiliteFactureDetailInstance>
    setDetails: Sequelize.HasManySetAssociationsMixin<ComptabiliteFactureDetailInstance, any>
    createDetail: Sequelize.HasManyCreateAssociationMixin<ComptabiliteFactureDetailAttributes, ComptabiliteFactureDetailInstance>
    addDetail: Sequelize.HasManyAddAssociationMixin<ComptabiliteFactureDetailInstance, any>
    addDetails: Sequelize.HasManyAddAssociationsMixin<ComptabiliteFactureDetailInstance, any>
    removeDetail: Sequelize.HasManyRemoveAssociationMixin<ComptabiliteFactureDetailInstance, any>
    removeDetails: Sequelize.HasManyRemoveAssociationsMixin<ComptabiliteFactureDetailInstance, any>
    hasDetail: Sequelize.HasManyHasAssociationMixin<ComptabiliteFactureDetailInstance, any>
    hasDetails: Sequelize.HasManyHasAssociationsMixin<ComptabiliteFactureDetailInstance, any>
    countDetails: Sequelize.HasManyCountAssociationsMixin

    // -- hasMany
    getPaiements: Sequelize.HasManyGetAssociationsMixin<ComptabiliteFacturePaiementInstance>
    setPaiements: Sequelize.HasManySetAssociationsMixin<ComptabiliteFacturePaiementInstance, any>
    createPaiement: Sequelize.HasManyCreateAssociationMixin<ComptabiliteFacturePaiementAttributes, ComptabiliteFacturePaiementInstance>
    addPaiement: Sequelize.HasManyAddAssociationMixin<ComptabiliteFacturePaiementInstance, any>
    addPaiements: Sequelize.HasManyAddAssociationsMixin<ComptabiliteFacturePaiementInstance, any>
    removePaiement: Sequelize.HasManyRemoveAssociationMixin<ComptabiliteFacturePaiementInstance, any>
    removePaiements: Sequelize.HasManyRemoveAssociationsMixin<ComptabiliteFacturePaiementInstance, any>
    hasPaiement: Sequelize.HasManyHasAssociationMixin<ComptabiliteFacturePaiementInstance, any>
    hasPaiements: Sequelize.HasManyHasAssociationsMixin<ComptabiliteFacturePaiementInstance, any>
    countPaiements: Sequelize.HasManyCountAssociationsMixin

    // -- belongsTo
    getTiers: Sequelize.BelongsToGetAssociationMixin<ComptabiliteTiersInstance>
    setTiers: Sequelize.BelongsToSetAssociationMixin<ComptabiliteTiersInstance, any>
    createTiers: Sequelize.BelongsToCreateAssociationMixin<ComptabiliteTiersAttributes>

}

export default {
    tableName: "comptabilite_facture",
    attributes: {
        id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
        date_creation: Sequelize.DATE,
    },
    relations: [
        {
            type: "hasMany",
            modelName: "comptabiliteFactureDetail",
            options: { foreignKey: "comptabilite_facture_id", as: "details" }
        },
        {
            type: "hasMany",
            modelName: "comptabiliteFacturePaiement",
            options: { foreignKey: "comptabilite_facture_id", as: "paiements" }
        },
        {
            type: "belongsTo",
            modelName: "comptabiliteTiers",
            options: { foreignKey: "comptabilite_tiers_id", as: "tiers" }
        }
    ]
} as DatabaseModel<ComptabiliteFactureInstance, ComptabiliteFactureAttributes>