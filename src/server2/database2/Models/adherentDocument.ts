import * as Sequelize from "sequelize";
import { DatabaseModel } from "../index";

export type AdherentDocumentInstance = {
    id: number
    type: string
    date_creation: Date
    libelle: string
    document: any
    validite: string
} & AdherentDocumentAssociations

export type AdherentDocumentAttributes = Partial<{
    id: number
    type: string
    date_creation: Date
    libelle: string
    document: any
    validite: string
    adherent_adherent_id: number
}>

export type AdherentDocumentAssociations = {

}

export default {
    tableName: "adherent_document",
    attributes: {
        id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
        type: Sequelize.STRING,
        date_creation: Sequelize.DATE,
        libelle: Sequelize.STRING,
        document: Sequelize.BLOB,
        validite: Sequelize.STRING
    },
    relations: [
    ]
} as DatabaseModel<AdherentDocumentInstance, AdherentDocumentAttributes>