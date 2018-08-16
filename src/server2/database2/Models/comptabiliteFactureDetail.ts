import * as Sequelize from "sequelize";
import { DatabaseModel } from "../index";
import { ActiviteSessionInstance, ActiviteSessionAttributes } from "./activiteSession";

export type ComptabiliteFactureDetailInstance = {
    id: number
    libelle: string
    description: string
    montant: number
    ordre: number
} & ComptabiliteFactureDetailAssociations

export type ComptabiliteFactureDetailAttributes = Partial<{
    id: number
    libelle: string
    description: string
    montant: number
    ordre: number
    comptabilite_facture_id: number
}>

export type ComptabiliteFactureDetailAssociations = {
    // -- belongsTo
    getTiers: Sequelize.BelongsToGetAssociationMixin<ComptabiliteFactureDetailInstance>
    setTiers: Sequelize.BelongsToSetAssociationMixin<ComptabiliteFactureDetailInstance, any>
}

export default {
    tableName: "comptabilite_facture_detail",
    attributes: {
        id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
        libelle: Sequelize.STRING,
        description: Sequelize.TEXT,
        montant: Sequelize.DECIMAL,
        ordre: Sequelize.INTEGER
    },
    relations: [
        {
            type: "belongsTo",
            modelName: "comptabiliteFacture",
            options: {foreignKey: "comptabilite_tiers_id", as: "facture"}
        }
    ]
} as DatabaseModel<ComptabiliteFactureDetailInstance, ComptabiliteFactureDetailAttributes>