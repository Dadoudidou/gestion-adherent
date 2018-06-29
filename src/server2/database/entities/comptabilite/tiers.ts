import * as Sequelize from "sequelize"
import { dataTypes } from "./../../dataTypes"
import { EntityClass } from "../../EntityClass";
import { DBModels } from "../..";
import { FactureType } from "./facture";

export type TiersType = {
    id: number
    nom: string
    prenom: string
    adresse: string
    codepostal: string
    ville: string
    email:string
    telephone_fixe: string
    telephone_mobile: string

    getFactures: (opt?: Sequelize.FindOptions<FactureType>) => Promise<FactureType[]>

} & Sequelize.Instance<any>

export type TiersDBSet = {
    Tiers: Sequelize.Model<TiersType, any>
}

export class Entity_Tiers extends EntityClass {
    table_name = "comptabilite_tiers"
    model_name = "Tiers"
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
        prenom: {
            type: dataTypes.STRING,
            allowNull: false,
        } as Sequelize.DefineAttributeColumnOptions,
        adresse: {
            type: dataTypes.STRING,
            allowNull: true,
        } as Sequelize.DefineAttributeColumnOptions,
        codepostal: {
            type: dataTypes.STRING,
            allowNull: true,
        } as Sequelize.DefineAttributeColumnOptions,
        ville: {
            type: dataTypes.STRING,
            allowNull: true,
        } as Sequelize.DefineAttributeColumnOptions,
        telephone_fixe: {
            type: dataTypes.STRING,
            allowNull: true,
        } as Sequelize.DefineAttributeColumnOptions,
        telephone_mobile: {
            type: dataTypes.STRING,
            allowNull: true,
        } as Sequelize.DefineAttributeColumnOptions,
        email: {
            type: dataTypes.STRING,
            allowNull: true,
        } as Sequelize.DefineAttributeColumnOptions,
    }
    model_options: Sequelize.DefineOptions<Entity_Tiers> = {}

    associations = (models: DBModels) => {
        this._model.hasMany(models.Factures, {
            as: "factures",
            foreignKey: "comptabilite_tiers_id"
        })
    }
}