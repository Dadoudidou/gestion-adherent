import * as Sequelize from "sequelize"
import { dataTypes } from "./../../dataTypes"
import { EntityClass } from "../../EntityClass";
import { DBModels } from "../..";
import { FactureType } from "./facture";

export type FacturePaiementType = {
    id: number
    type: string
    montant: number
    date_banque: Date
    reference: string
    banque: string
    valide: boolean
    getFacture: () => Promise<FactureType>
} & Sequelize.Instance<any>

export type FacturePaiementDBSet = {
    FacturePaiements: Sequelize.Model<FacturePaiementType, any>
}

export class Entity_FacturePaiement extends EntityClass {
    table_name = "comptabilite_facture_paiement"
    model_name = "FacturePaiements"
    model_attributes = {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        } as Sequelize.DefineAttributeColumnOptions,
        type: {
            type: dataTypes.STRING,
            allowNull: false,
        } as Sequelize.DefineAttributeColumnOptions,
        montant: {
            type: dataTypes.DECIMAL,
            allowNull: false,
        } as Sequelize.DefineAttributeColumnOptions,
        date_banque: {
            type: dataTypes.STRING,
            allowNull: true,
        } as Sequelize.DefineAttributeColumnOptions,
        reference: {
            type: dataTypes.STRING,
            allowNull: true,
        } as Sequelize.DefineAttributeColumnOptions,
        banque: {
            type: dataTypes.STRING,
            allowNull: true,
        } as Sequelize.DefineAttributeColumnOptions,
        valide: {
            type: dataTypes.INTEGER,
            allowNull: false,
        } as Sequelize.DefineAttributeColumnOptions,
        comptabilite_facture_id: {
            type: dataTypes.INTEGER,
            allowNull: false,
        } as Sequelize.DefineAttributeColumnOptions,
    }
    model_options: Sequelize.DefineOptions<Entity_FacturePaiement> = {}

    associations = (models: DBModels) => {
        this._model.belongsTo(models.Factures, {
            as: "facture",
            foreignKey: "comptabilite_facture_id"
        })
    }
}