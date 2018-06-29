import * as Sequelize from "sequelize"
import { dataTypes } from "./../../dataTypes"
import { EntityClass } from "../../EntityClass";
import { DBModels } from "../..";
import { TiersType } from "./tiers";
import { FactureDetailType } from "./facture_detail";
import { FacturePaiementType } from "./facture_paiement";

export type FactureType = {
    id: number
    date_creation: Date
    getTiers: () => Promise<TiersType>
    getDetails: (opt?: Sequelize.FindOptions<FactureDetailType>) => Promise<FactureDetailType[]>
    getPaiements: (opt?: Sequelize.FindOptions<FacturePaiementType>) => Promise<FacturePaiementType[]>
} & Sequelize.Instance<any>

export type FactureDBSet = {
    Factures: Sequelize.Model<FactureType, any>
}

export class Entity_Facture extends EntityClass {
    table_name = "comptabilite_facture"
    model_name = "Factures"
    model_attributes = {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        } as Sequelize.DefineAttributeColumnOptions,
        comptabilite_tiers_id: {
            type: dataTypes.INTEGER,
            allowNull: false,
        } as Sequelize.DefineAttributeColumnOptions,
        date_creation: {
            type: dataTypes.DATE,
            allowNull: false,
        } as Sequelize.DefineAttributeColumnOptions,
    }
    model_options: Sequelize.DefineOptions<Entity_Facture> = {}

    associations = (models: DBModels) => {
        this._model.belongsTo(models.Tiers, {
            as: "tiers",
            foreignKey: "comptabilite_tiers_id"
        });
        this._model.hasMany(models.FactureDetails, {
            as: "details",
            foreignKey: "comptabilite_facture_id"
        });
        this._model.hasMany(models.FacturePaiements, {
            as: "paiements",
            foreignKey: "comptabilite_facture_id"
        })
    }
}