import * as Sequelize from "sequelize";
import database2, { DatabaseModel } from "../index";
import { AdherentDocumentInstance, AdherentDocumentAttributes } from "@server/database2/Models/adherentDocument";
import { AdherentAdhesionInstance, AdherentAdhesionAttributes } from "@server/database2/Models/adherentAdhesion";
import { TarifLicenceInstance, TarifLicenceAttributes } from "@server/database2/Models/tarifLicence";

export type AdherentInstance = {
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
} & AdherentAssociations & AdherentInstanceMethods

export type AdherentAttributes = Partial<{
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
}>

export type AdherentAssociations = {
    // -- hasMany
    /*getLicences: Sequelize.HasManyGetAssociationsMixin<AdherentLicenceInstance>
    setLicences: Sequelize.HasManySetAssociationsMixin<AdherentLicenceInstance, any>
    createLicence: Sequelize.HasManyCreateAssociationMixin<AdherentLicenceAttributes, AdherentLicenceInstance>
    addLicence: Sequelize.HasManyAddAssociationMixin<AdherentLicenceInstance, any>
    addLicences: Sequelize.HasManyAddAssociationsMixin<AdherentLicenceInstance, any>
    removeLicence: Sequelize.HasManyRemoveAssociationMixin<AdherentLicenceInstance, any>
    removeLicences: Sequelize.HasManyRemoveAssociationsMixin<AdherentLicenceInstance, any>
    hasLicence: Sequelize.HasManyHasAssociationMixin<AdherentLicenceInstance, any>
    hasLicences: Sequelize.HasManyHasAssociationsMixin<AdherentLicenceInstance, any>
    countLicences: Sequelize.HasManyCountAssociationsMixin*/

    // -- hasMany
    getDocuments: Sequelize.HasManyGetAssociationsMixin<AdherentDocumentInstance>
    setDocuments: Sequelize.HasManySetAssociationsMixin<AdherentDocumentInstance, any>
    createDocument: Sequelize.HasManyCreateAssociationMixin<AdherentDocumentAttributes, AdherentDocumentInstance>
    addDocument: Sequelize.HasManyAddAssociationMixin<AdherentDocumentInstance, any>
    addDocuments: Sequelize.HasManyAddAssociationsMixin<AdherentDocumentInstance, any>
    removeDocument: Sequelize.HasManyRemoveAssociationMixin<AdherentDocumentInstance, any>
    removeDocuments: Sequelize.HasManyRemoveAssociationsMixin<AdherentDocumentInstance, any>
    hasDocument: Sequelize.HasManyHasAssociationMixin<AdherentDocumentInstance, any>
    hasDocuments: Sequelize.HasManyHasAssociationsMixin<AdherentDocumentInstance, any>
    countDocuments: Sequelize.HasManyCountAssociationsMixin

    // -- hasMany
    getAdhesions: Sequelize.HasManyGetAssociationsMixin<AdherentAdhesionInstance>
    setAdhesions: Sequelize.HasManySetAssociationsMixin<AdherentAdhesionInstance, any>
    createAdhesion: Sequelize.HasManyCreateAssociationMixin<AdherentAdhesionAttributes, AdherentAdhesionInstance>
    addAdhesion: Sequelize.HasManyAddAssociationMixin<AdherentAdhesionInstance, any>
    addAdhesions: Sequelize.HasManyAddAssociationsMixin<AdherentAdhesionInstance, any>
    removeAdhesion: Sequelize.HasManyRemoveAssociationMixin<AdherentAdhesionInstance, any>
    removeAdhesions: Sequelize.HasManyRemoveAssociationsMixin<AdherentAdhesionInstance, any>
    hasAdhesion: Sequelize.HasManyHasAssociationMixin<AdherentAdhesionInstance, any>
    hasAdhesions: Sequelize.HasManyHasAssociationsMixin<AdherentAdhesionInstance, any>
    countAdhesions: Sequelize.HasManyCountAssociationsMixin

    // -- belongsToMany
    addLicence: Sequelize.BelongsToManyAddAssociationMixin<TarifLicenceInstance, any, AdherentLicenceJoinAttributes>
    addLicences: Sequelize.BelongsToManyAddAssociationsMixin<TarifLicenceInstance, any, AdherentLicenceJoinAttributes>
    countLicences: Sequelize.BelongsToManyCountAssociationsMixin
    createLicence: Sequelize.BelongsToManyCreateAssociationMixin<TarifLicenceAttributes, TarifLicenceInstance, AdherentLicenceJoinAttributes>
    getLicences: Sequelize.BelongsToManyGetAssociationsMixin<TarifLicenceInstance>
    hasLicence: Sequelize.BelongsToManyHasAssociationMixin<TarifLicenceInstance, any>
    hasLicences: Sequelize.BelongsToManyHasAssociationsMixin<TarifLicenceInstance, any>
    removeLicence: Sequelize.BelongsToManyRemoveAssociationMixin<TarifLicenceInstance, any>
    removeLicences: Sequelize.BelongsToManyRemoveAssociationsMixin<TarifLicenceInstance, any>
    setLicences: Sequelize.BelongsToManySetAssociationsMixin<TarifLicenceInstance, any, AdherentLicenceJoinAttributes>
}

type AdherentInstanceMethods = {
    getAdhesionsByCampagnes: (campagnes_ids: number[]) => Promise<AdherentAdhesionInstance[]>
}

export default {
    tableName: "adherent_adherent",
    attributes: {
        id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
        nom: Sequelize.STRING,
        prenom: Sequelize.STRING,
        datenaissance: Sequelize.DATEONLY,
        male: Sequelize.BOOLEAN,
        adresse: Sequelize.STRING,
        codepostal: Sequelize.STRING,
        ville: Sequelize.STRING,
        numero_licence: Sequelize.STRING,
        telephone_fixe: Sequelize.STRING,
        telephone_mobile: Sequelize.STRING,
        email: Sequelize.STRING
    },
    relations: [
        /*{
            type: "hasMany",
            modelName: "adherentLicence",
            options: { foreignKey: "adherent_adherent_id", as: "licences" }
        },*/
        {
            type: "hasMany",
            modelName: "adherentDocument",
            options: { foreignKey: "adherent_adherent_id", as: "documents" }
        },
        {
            type: "hasMany",
            modelName: "adherentAdhesion",
            options: { foreignKey: "adherent_adherent_id", as: "adhesions" }
        },
        {
            type: "belongsToMany",
            modelName: "tarifLicence",
            options: { foreignKey: "adherent_id", as: "licences", through: "adherent_admin_licence" }
        }
    ],
    options: {
        instanceMethods:{
            getAdhesionsByCampagnes(campagnes_ids: number[]){
                return this.getAdhesions({
                    include: [{ 
                        model: database2.model("activiteSection"),
                        as: 'section',
                        required: true,
                        include: [{
                            model: database2.model("activite"),
                            as: 'activite',
                            required: true,
                            include: [{
                                model: database2.model("activiteCategorie"),
                                as: 'categorie',
                                required: true,
                                where: { admin_saison_id: campagnes_ids }
                            }]
                        }]
                    }]
                })
            },
        }
    }
} as DatabaseModel<AdherentInstance, AdherentAttributes>


export type AdherentLicenceJoinAttributes = Partial<{
    id: number
    tshirt?: string
    type?: string
    dernier_club?: string
}>