import * as Sequelize from "sequelize";
import { DatabaseModel } from "../index";
import { ActiviteSessionInstance, ActiviteSessionAttributes } from "./activiteSession";

export type LieuInstance = {
    id: number
    nom: string
    adresse: string
    codepostal: string
    ville: string
} & LieuAssociations

export type LieuAttributes = Partial<{
    id: number
    nom: string
    adresse: string
    codepostal: string
    ville: string
}>

export type LieuAssociations = {
    // -- hasMany
    getSessions: Sequelize.HasManyGetAssociationsMixin<ActiviteSessionInstance>
    createSession: Sequelize.HasManyCreateAssociationMixin<ActiviteSessionAttributes, ActiviteSessionInstance>
    addSession: Sequelize.HasManyAddAssociationMixin<ActiviteSessionInstance, any>
    removeSession: Sequelize.HasManyRemoveAssociationMixin<ActiviteSessionInstance, any>
}

export default {
    tableName: "admin_lieu",
    attributes: {
        id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
        nom: Sequelize.STRING,
        adresse: Sequelize.STRING,
        codepostal: Sequelize.STRING,
        ville: Sequelize.STRING
    },
    relations: [
        {
            type: "hasMany",
            modelName: "activiteSession",
            options: { foreignKey:"admin_lieu_id", as:"sessions"}
        }
    ]
} as DatabaseModel<LieuInstance, LieuAttributes>