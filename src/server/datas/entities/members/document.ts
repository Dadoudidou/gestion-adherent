import * as Sequelize from "sequelize"
import { dataTypes } from "./../../dataTypes"
import { EntityClass } from "../../EntityClass";
import { DBModels } from "../..";



export type DocumentType = {
    id: number
    type: string
    date_creation: Date
    libelle: string
    document: any
    validite: string
    adherent_adherent_id: number
}

export type DocumentDBSet = {
    documents: Sequelize.Model<DocumentType, any>
}

export class Entity_Document extends EntityClass {
    table_name = "adherent_document"
    model_name = "documents"
    model_attributes = {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        } as Sequelize.DefineAttributeColumnOptions,
        type: {
            type: dataTypes.STRING,
            allowNull: false,
        } as Sequelize.DefineAttributeColumnOptions,
        date_creation: {
            type: dataTypes.DATE,
            allowNull: false,
        } as Sequelize.DefineAttributeColumnOptions,
        libelle: {
            type: dataTypes.STRING,
            allowNull: false,
        } as Sequelize.DefineAttributeColumnOptions,
        document: {
            type: dataTypes.BLOB,
            allowNull: false,
        } as Sequelize.DefineAttributeColumnOptions,
        validite: {
            type: dataTypes.STRING,
            allowNull: true,
        } as Sequelize.DefineAttributeColumnOptions,
        adherent_adherent_id: {
            type: dataTypes.INTEGER,
            allowNull: false,
        } as Sequelize.DefineAttributeColumnOptions,
    }
    model_options: Sequelize.DefineOptions<Entity_Document> = {}

    associations = (models: DBModels) => {

    }
}