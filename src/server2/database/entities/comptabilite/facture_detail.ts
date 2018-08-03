import * as Sequelize from "sequelize"
import { dataTypes } from "./../../dataTypes"
import { EntityClass } from "../../EntityClass";
import { DBModels } from "../..";
import { FactureType } from "./facture";

export type FactureDetailInputType = {
    id: number
    libelle: string
    description: string
    montant: number
    ordre: number
}

export type FactureDetailType = {
    id: number
    libelle: string
    description: string
    montant: number
    ordre: number
    getFacture: () => Promise<FactureType>
} & Sequelize.Instance<any>

export type FactureDetailDBSet = {
    FactureDetails: Sequelize.Model<FactureDetailType, FactureDetailInputType>
}

export class Entity_FactureDetail extends EntityClass {
    table_name = "comptabilite_facture_detail"
    model_name = "FactureDetails"
    model_attributes = {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        } as Sequelize.DefineAttributeColumnOptions,
        libelle: {
            type: dataTypes.STRING,
            allowNull: false,
        } as Sequelize.DefineAttributeColumnOptions,
        description: {
            type: dataTypes.TEXT,
            allowNull: true,
        } as Sequelize.DefineAttributeColumnOptions,
        montant: {
            type: dataTypes.DECIMAL,
            allowNull: false,
        } as Sequelize.DefineAttributeColumnOptions,
        ordre: {
            type: dataTypes.INTEGER,
            allowNull: true,
        } as Sequelize.DefineAttributeColumnOptions,
        comptabilite_facture_id: {
            type: dataTypes.INTEGER,
            allowNull: false,
        } as Sequelize.DefineAttributeColumnOptions,
    }
    model_options: Sequelize.DefineOptions<Entity_FactureDetail> = {}

    associations = (models: DBModels) => {
        this._model.belongsTo(models.Factures, {
            as: "facture",
            foreignKey: "comptabilite_facture_id"
        })
    }
}