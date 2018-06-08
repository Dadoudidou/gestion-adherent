import * as Sequelize from "sequelize"
import { dataTypes } from "./../../dataTypes"
import { EntityClass } from "../../EntityClass";
import { DBModels } from "../..";
import { TarifLicenceType } from "@server/database/entities/admin/tarif_licence";
import { AdherentType } from "@server/database/entities/members/adherent";


export type AdherentLicenceType = {
    id: number
    tshirt?: string
    type?: string
    dernier_club?: string
    admin_licence_id: number
    adherent_adherent_id: number

    getTarif: () => Promise<TarifLicenceType>
    getAdherent: () => Promise<AdherentType>
} & Sequelize.Instance<any>

export type AdherentLicenceDBSet = {
    adherentLicences: Sequelize.Model<AdherentLicenceType, any>
}

export class Entity_AdherentLicence extends EntityClass {
    table_name = "adherent_licence"
    model_name = "adherentLicences"
    model_attributes = {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        } as Sequelize.DefineAttributeColumnOptions,
        tshirt: {
            type: dataTypes.STRING,
            allowNull: true
        } as Sequelize.DefineAttributeColumnOptions,
        type: {
            type: dataTypes.STRING,
            allowNull: true
        } as Sequelize.DefineAttributeColumnOptions,
        dernier_club: {
            type: dataTypes.STRING,
            allowNull: true,
        } as Sequelize.DefineAttributeColumnOptions,
        admin_licence_id: {
            type: dataTypes.INTEGER,
            allowNull: false,
        } as Sequelize.DefineAttributeColumnOptions,
        adherent_adherent_id: {
            type: dataTypes.INTEGER,
            allowNull: false,
        } as Sequelize.DefineAttributeColumnOptions
    }
    model_options: Sequelize.DefineOptions<Entity_AdherentLicence> = {}
    
    associations = (models: DBModels) => {
        this._model.belongsTo(models.tarifLicences, {
            as: "tarif",
            foreignKey: "admin_licence_id"
        });
        this._model.belongsTo(models.adherents, {
            as: "adherent",
            foreignKey: "adherent_adherent_id"
        })
    }
}