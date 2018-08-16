import * as Sequelize from "sequelize";
import { DatabaseModel } from "../index";
import { ActiviteSessionInstance, ActiviteSessionAttributes } from "./activiteSession";
import { CampagneInstance } from "@server/database2/Models/campagne";
import { ActiviteSectionInstance } from "@server/database2/Models/activiteSection";

export type TarifInstance = {
    id: number
    montant: number
    nbsessionmin?: number
    nbsessionmax?: number
    carte?: boolean
    carte_nbsession?: number
    restriction_date_debut?: Date
    restriction_date_fin?: Date
} & TarifAssociations

export type TarifAttributes = Partial<{
    id: number
    montant: number
    nbsessionmin?: number
    nbsessionmax?: number
    carte?: boolean
    carte_nbsession?: number
    restriction_date_debut?: Date
    restriction_date_fin?: Date
    admin_saison_id: number
    admin_activite_section_id: number
}>

export type TarifAssociations = {
    // -- belongsTo
    getCampagne: Sequelize.BelongsToGetAssociationMixin<CampagneInstance>
    setCampagne: Sequelize.BelongsToSetAssociationMixin<CampagneInstance, any>

    // -- belongsTo
    getSection: Sequelize.BelongsToGetAssociationMixin<ActiviteSectionInstance>
    setSection: Sequelize.BelongsToSetAssociationMixin<ActiviteSectionInstance, any>
}

export default {
    tableName: "admin_licence",
    attributes: {
        id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
        montant: Sequelize.DECIMAL,
        nbsessionmin: Sequelize.INTEGER,
        nbsessionmax: Sequelize.INTEGER,
        carte: Sequelize.BOOLEAN,
        carte_nbsession: Sequelize.INTEGER,
        restriction_date_debut: Sequelize.DATE,
        restriction_date_fin: Sequelize.DATE
    },
    relations: [
        {
            type: "belongsTo",
            modelName: "campagne",
            options: { foreignKey:"admin_saison_id", as:"campagne"}
        },
        {
            type: "belongsTo",
            modelName: "activiteSection",
            options: { foreignKey:"admin_activite_section_id", as:"section"}
        }
    ]
} as DatabaseModel<TarifInstance, TarifAttributes>