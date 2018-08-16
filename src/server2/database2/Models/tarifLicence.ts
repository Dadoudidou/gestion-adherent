import * as Sequelize from "sequelize";
import { DatabaseModel } from "../index";
import { ActiviteSessionInstance, ActiviteSessionAttributes } from "./activiteSession";
import { CampagneInstance } from "@server/database2/Models/campagne";

export type TarifLicenceInstance = {
    id: number
    nom: string
    montant: number
    restriction_age_min?: number
    restriction_age_max?: number
} & TarifLicenceAssociations

export type TarifLicenceAttributes = Partial<{
    id: number
    nom: string
    montant: number
    restriction_age_min?: number
    restriction_age_max?: number
    admin_saison_id?: number
}>

export type TarifLicenceAssociations = {
    // -- belongsTo
    getCampagne: Sequelize.BelongsToGetAssociationMixin<CampagneInstance>
    setCampagne: Sequelize.BelongsToSetAssociationMixin<CampagneInstance, any>
}

export default {
    tableName: "admin_licence",
    attributes: {
        id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
        nom: Sequelize.STRING,
        montant: Sequelize.DECIMAL,
        restriction_age_min: Sequelize.INTEGER,
        restriction_age_max: Sequelize.INTEGER
    },
    relations: [
        {
            type: "belongsTo",
            modelName: "campagne",
            options: { foreignKey:"admin_saison_id", as:"campagne"}
        }
    ]
} as DatabaseModel<TarifLicenceInstance, TarifLicenceAttributes>