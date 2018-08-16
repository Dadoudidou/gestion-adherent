import * as Sequelize from "sequelize";
import { DatabaseModel } from "../index";
import { ActiviteSectionInstance } from "./activiteSection";
import { LieuInstance } from "./lieu";

export type ActiviteSessionInstance = {
    id: number
    jour: number
    heure_debut: string
    heure_fin: string
    place: number
} & ActiviteSessionAssociations

export type ActiviteSessionAttributes = Partial<{
    id: number
    jour: number
    heure_debut: string
    heure_fin: string
    place: number
    admin_activite_section_id: number
    admin_lieu_id: number
}>

export type ActiviteSessionAssociations = {
    // -- belongsTo
    getSection: Sequelize.BelongsToGetAssociationMixin<ActiviteSectionInstance>

    // -- belongsTo
    getLieu: Sequelize.BelongsToGetAssociationMixin<LieuInstance>
}

export default {
    tableName: "admin_activite_session",
    attributes: {
        id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
        jour: Sequelize.INTEGER,
        heure_debut: Sequelize.STRING,
        heure_fin: Sequelize.STRING,
        place: Sequelize.INTEGER,
        admin_activite_section_id: Sequelize.INTEGER,
        admin_lieu_id: Sequelize.INTEGER
    },
    relations: [
        {
            type: "belongsTo",
            modelName: "activiteSection",
            options: {  foreignKey: "admin_activite_section_id", as: "section" }
        },
        {
            type: "belongsTo",
            modelName: "lieu",
            options: {  foreignKey: "admin_lieu_id", as:"lieu" }
        }
    ]
} as DatabaseModel<ActiviteSessionInstance, ActiviteSessionAttributes>