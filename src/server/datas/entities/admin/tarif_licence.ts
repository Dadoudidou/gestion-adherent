import * as Sequelize from "sequelize"
import { dataTypes } from "./../../dataTypes"
import { EntityClass } from "../../EntityClass";
import { DBModels } from "../..";
import { SaisonType } from "@server/datas/entities/admin/saison";
import { AdherentLicenceType } from "@server/datas/entities/members/licence";


export type TarifLicenceType = {
    id: number
    montant: number
    restriction_age_min?: number
    restriction_age_max?: number
    admin_saison_id: number
    nom?: string

    getSaison: () => Promise<SaisonType>
    getLicences: (opt?: Sequelize.FindOptions<AdherentLicenceType>) => Promise<AdherentLicenceType[]>
} & Sequelize.Instance<any>

export type TarifLicenceDBSet = {
    tarifLicences: Sequelize.Model<TarifLicenceType, any>
}

export class Entity_TarifLicence extends EntityClass {
    table_name = "admin_licence"
    model_name = "tarifLicences"
    model_attributes = {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        } as Sequelize.DefineAttributeColumnOptions,
        montant: {
            type: dataTypes.DECIMAL,
            allowNull: false
        } as Sequelize.DefineAttributeColumnOptions,
        restriction_age_min: {
            type: dataTypes.INTEGER,
            allowNull: true
        } as Sequelize.DefineAttributeColumnOptions,
        restriction_age_max: {
            type: dataTypes.INTEGER,
            allowNull: true,
        } as Sequelize.DefineAttributeColumnOptions,
        admin_saison_id: {
            type: dataTypes.INTEGER,
            allowNull: false,
        } as Sequelize.DefineAttributeColumnOptions,
        nom: {
            type: dataTypes.STRING,
            allowNull: true,
        } as Sequelize.DefineAttributeColumnOptions
    }
    model_options: Sequelize.DefineOptions<Entity_TarifLicence> = {}
    
    associations = (models: DBModels) => {
        this._model.belongsTo(models.saisons, {
            as: "saison",
            foreignKey: "admin_saison_id"
        });
        this._model.hasMany(models.adherentLicences, {
            as: "licences",
            foreignKey: "admin_licence_id"
        });
    }
}