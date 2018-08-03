import * as Sequelize from "sequelize"
import { dataTypes } from "./../../dataTypes"
import { EntityClass } from "../../EntityClass";
import { DBModels } from "../..";
import { TiersType } from "./tiers";
import { FactureDetailType, FactureDetailInputType } from "./facture_detail";
import { FacturePaiementType, FacturePaiementInputType } from "./facture_paiement";
import { AdhesionType } from "../members/adhesion";

export type FactureTableType = {
    id?: number
    date_creation: Date
    comptabilite_tiers_id: number
}

export type FactureType = {
    id: number
    date_creation: Date

    getTiers: () => Promise<TiersType>
    setTiers: (value: TiersType) => Promise<TiersType>

    getDetails: (opt?: Sequelize.FindOptions<FactureDetailType>) => Promise<FactureDetailType[]>
    setDetails: (values: FactureDetailType[]) => Promise<void>
    createDetail: (value: Partial<FactureDetailInputType>) => Promise<FactureDetailType>

    getPaiements: (opt?: Sequelize.FindOptions<FacturePaiementType>) => Promise<FacturePaiementType[]>
    setPaiements: (values: FacturePaiementType[]) => Promise<void>
    createPaiement: (value: Partial<FacturePaiementInputType>) => Promise<FacturePaiementType>

    getAdhesions: (opt?: Sequelize.FindOptions<AdhesionType>) => Promise<AdhesionType[]>
    setAdhesions: (values: AdhesionType[]) => Promise<void>
} & Sequelize.Instance<any>

export type FactureDBSet = {
    Factures: Sequelize.Model<FactureType, FactureTableType>
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
        });
        this._model.hasMany(models.adhesions, {
            as: "adhesions",
            foreignKey: "comptabilite_facture_id"
        });
    }
}