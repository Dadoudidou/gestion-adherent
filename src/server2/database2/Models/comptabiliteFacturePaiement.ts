import * as Sequelize from "sequelize";
import { DatabaseModel } from "../index";
import { ActiviteSessionInstance, ActiviteSessionAttributes } from "./activiteSession";
import { ComptabiliteFactureDetailInstance } from "@server/database2/Models/comptabiliteFactureDetail";

export type ComptabiliteFacturePaiementInstance = {
    id: number
    date_creation: Date
} & ComptabiliteFacturePaiementAssociations

export type ComptabiliteFacturePaiementAttributes = Partial<{
    id: number
    type: string
    montant: number
    date_banque: Date
    reference: string
    banque: string
    valide: boolean
    comptabilite_facture_id: number
}>

export type ComptabiliteFacturePaiementAssociations = {
    // -- belongsTo
    getTiers: Sequelize.BelongsToGetAssociationMixin<ComptabiliteFactureDetailInstance>
    setTiers: Sequelize.BelongsToSetAssociationMixin<ComptabiliteFactureDetailInstance, any>
}

export default {
    tableName: "comptabilite_facture_paiement",
    attributes: {
        id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
        type: Sequelize.STRING,
        montant: Sequelize.DECIMAL,
        date_banque: Sequelize.DATEONLY,
        reference: Sequelize.STRING,
        banque: Sequelize.STRING,
        valide: Sequelize.BOOLEAN,
    },
    relations: [
        {
            type: "belongsTo",
            modelName: "comptabiliteFacture",
            options: {foreignKey: "comptabilite_facture_id", as: "facture"}
        }
    ]
} as DatabaseModel<ComptabiliteFacturePaiementInstance, ComptabiliteFacturePaiementAttributes>