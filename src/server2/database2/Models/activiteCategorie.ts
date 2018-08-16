import * as Sequelize from "sequelize";
import { DatabaseModel } from "../index";
import { ActiviteInstance, ActiviteAttributes } from "./activite";
import { CampagneInstance } from "./campagne";

export type ActiviteCategorieInstance = {
    id: number
    nom: string
} & ActiviteCategorieAssociations

export type ActiviteCategorieAttributes = {
    id?: number
    nom?: string
}

export type ActiviteCategorieAssociations = {
    // -- hasmany
    getActivites: Sequelize.HasManyGetAssociationsMixin<ActiviteInstance>
    createActivite: Sequelize.HasManyCreateAssociationMixin<ActiviteAttributes, ActiviteInstance>
    addActivite: Sequelize.HasManyAddAssociationMixin<ActiviteInstance, any>
    removeActivite: Sequelize.HasManyRemoveAssociationMixin<ActiviteInstance, any>

    // -- belongsTo
    getCampagne: Sequelize.BelongsToGetAssociationMixin<CampagneInstance>
}

export default {
    tableName: "admin_activite_categorie",
    attributes: {
        id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
        nom: { type: Sequelize.STRING }
    },
    relations: [
        {
            type: "hasMany",
            modelName: "activite",
            options: {  foreignKey: "admin_activite_categorie_id", as:"activites" }
        },
        {
            type: "belongsTo",
            modelName: "campagne",
            options: {  foreignKey: "admin_saison_id", as:"campagne" }
        }
    ]
} as DatabaseModel<ActiviteCategorieInstance, ActiviteCategorieAttributes>