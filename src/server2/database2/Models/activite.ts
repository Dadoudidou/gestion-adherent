import * as Sequelize from "sequelize";
import { DatabaseModel } from "../index";
import { ActiviteCategorieInstance } from "./activiteCategorie";
import { ActiviteSectionInstance, ActiviteSectionAttributes } from "./activiteSection";

export type ActiviteInstance = {
    id: number
    nom: string
} & ActiviteAssociations

export type ActiviteAttributes = {
    id?: number
    nom?: string
    admin_activite_categorie_id?: number
}

export type ActiviteAssociations = {
    // -- belongsTo
    getCategorie: Sequelize.BelongsToGetAssociationMixin<ActiviteCategorieInstance>

    // -- hasMany
    getSections: Sequelize.HasManyGetAssociationsMixin<ActiviteSectionInstance>
    createSection: Sequelize.HasManyCreateAssociationMixin<ActiviteSectionAttributes, ActiviteSectionInstance>
    addSection: Sequelize.HasManyAddAssociationMixin<ActiviteSectionInstance, any>
    removeSection: Sequelize.HasManyRemoveAssociationMixin<ActiviteSectionInstance, any>
}

export default {
    tableName: "admin_activite_activite",
    attributes: {
        id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
        nom: Sequelize.STRING,
        admin_activite_categorie_id: Sequelize.INTEGER
    },
    relations: [
        {
            type: "belongsTo",
            modelName: "activiteCategorie",
            options: { foreignKey: "admin_activite_categorie_id", as: "categorie" }
        },
        {
            type: "hasMany",
            modelName: "activiteSection",
            options: {foreignKey: "admin_activite_activite_id", as: "sections" }
        }
    ]
} as DatabaseModel<ActiviteInstance, ActiviteAttributes>