import * as Sequelize from "sequelize"
import { dataTypes } from "./../../dataTypes"
import { EntityClass } from "../../EntityClass";
import { DBModels } from "../..";
import { DocumentType } from "./document";
import { AdherentLicenceType } from "@server/datas/entities/members/licence";
import { AdhesionType } from "@server/datas/entities/members/adhesion";



export type AdherentType = {
    id: number
    nom: string
    prenom: string
    datenaissance: Date
    male: boolean
    adresse: string
    codepostal: string
    ville: string
    numero_licence: string
    telephone_fixe: string
    telephone_mobile: string
    email: string

    getDocuments: (opt?: Sequelize.FindOptions<DocumentType>) => Promise<DocumentType[]>
    getLicences: (opt?: Sequelize.FindOptions<AdherentLicenceType>) => Promise<AdherentLicenceType[]>
    getAdhesions: (opt?: Sequelize.FindOptions<AdhesionType>) => Promise<AdhesionType[]>
}

export type AdherentDBSet = {
    adherents: Sequelize.Model<AdherentType, any>
}

export class Entity_Adherent extends EntityClass {
    table_name = "adherent_adherent"
    model_name = "adherents"
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
        datenaissance: {
            type: dataTypes.DATE,
            allowNull: false,
        } as Sequelize.DefineAttributeColumnOptions,
        male: {
            type: dataTypes.BOOLEAN,
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
        numero_licence: {
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
    model_options: Sequelize.DefineOptions<Entity_Adherent> = {}

    associations = (models: DBModels) => {
        this._model.hasMany(models.documents, {
            as: "documents",
            foreignKey: "adherent_adherent_id"
        })
        this._model.hasMany(models.adherentLicences, {
            as: "licences",
            foreignKey: "adherent_adherent_id"
        })
        this._model.hasMany(models.adhesions, {
            as: "adhesions",
            foreignKey: "adherent_adherent_id"
        })
    }
}