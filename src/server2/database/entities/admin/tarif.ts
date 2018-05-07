import * as Sequelize from "sequelize"
import { dataTypes } from "./../../dataTypes"
import { EntityClass } from "../../EntityClass";
import { DBModels } from "../..";
import { SaisonType } from "@server/datas/entities/admin/saison";
import { ActSectionType } from "@server/datas/entities/admin/activite_section";
import { AdhesionType } from "@server/datas/entities/members/adhesion";


export type TarifType = {
    id: number
    montant: number
    nbsessionmin?: number
    nbsessionmax?: number
    carte?: boolean
    carte_nbsession?: number
    admin_saison_id: number
    admin_activite_section_id: number

    getSaison: () => Promise<SaisonType>
    getSection: () => Promise<ActSectionType>
    getAdhesions: (opt?: Sequelize.FindOptions<AdhesionType>) => Promise<AdhesionType[]>
} & Sequelize.Instance<any>

export type TarifDBSet = {
    tarifs: Sequelize.Model<TarifType, any>
}

export class Entity_Tarif extends EntityClass {
    table_name = "admin_tarif"
    model_name = "tarifs"
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
        nbsessionmin: {
            type: dataTypes.INTEGER,
            allowNull: true
        } as Sequelize.DefineAttributeColumnOptions,
        nbsessionmax: {
            type: dataTypes.INTEGER,
            allowNull: true,
        } as Sequelize.DefineAttributeColumnOptions,
        carte: {
            type: dataTypes.BOOLEAN,
            allowNull: true,
        } as Sequelize.DefineAttributeColumnOptions,
        carte_nbsession: {
            type: dataTypes.INTEGER,
            allowNull: true,
        } as Sequelize.DefineAttributeColumnOptions,
        admin_saison_id: {
            type: dataTypes.INTEGER,
            allowNull: false,
        } as Sequelize.DefineAttributeColumnOptions,
        admin_activite_section_id: {
            type: dataTypes.INTEGER,
            allowNull: false,
        } as Sequelize.DefineAttributeColumnOptions
    }
    model_options: Sequelize.DefineOptions<Entity_Tarif> = {}
    
    associations = (models: DBModels) => {
        this._model.belongsTo(models.saisons, {
            as: "saison",
            foreignKey: "admin_saison_id"
        });
        this._model.belongsTo(models.actSections, {
            as: "section",
            foreignKey: "admin_activite_section_id"
        });
        this._model.hasMany(models.adhesions, {
            as: "adhesions",
            foreignKey: "admin_tarif_id"
        })
    }
}