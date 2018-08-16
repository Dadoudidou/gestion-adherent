import * as Sequelize from "sequelize";
import { DatabaseModel } from "../index";
import { AdherentInstance } from "@server/database2/Models/adherent";
import { ActiviteSectionInstance } from "@server/database2/Models/activiteSection";
import { TarifInstance } from "@server/database2/Models/tarif";
import { ActiviteSessionInstance, ActiviteSessionAttributes } from "@server/database2/Models/activiteSession";
import { ComptabiliteFactureInstance } from "@server/database2/Models/comptabiliteFacture";

export type AdherentAdhesionInstance = {
    id: number
    valide: boolean
} & AdherentAdhesionAssociations

export type AdherentAdhesionAttributes = Partial<{
    id: number
    valide: boolean
    adherent_adherent_id: number
    admin_activite_section_id: number
    admin_tarif_id: number
}>

export type AdherentAdhesionAssociations = {
    // -- belongsTo
    getAdherent: Sequelize.BelongsToGetAssociationMixin<AdherentInstance>
    setAdherent: Sequelize.BelongsToSetAssociationMixin<AdherentInstance, any>

    // -- belongsTo
    getSection: Sequelize.BelongsToGetAssociationMixin<ActiviteSectionInstance>
    setSection: Sequelize.BelongsToSetAssociationMixin<ActiviteSectionInstance, any>

    // -- belongsTo
    getTarif: Sequelize.BelongsToGetAssociationMixin<TarifInstance>
    setTarif: Sequelize.BelongsToSetAssociationMixin<TarifInstance, any>

    // -- belongsToMany
    addSession: Sequelize.BelongsToManyAddAssociationMixin<ActiviteSessionInstance, any, any>
    addSessions: Sequelize.BelongsToManyAddAssociationsMixin<ActiviteSessionInstance, any, any>
    countSessions: Sequelize.BelongsToManyCountAssociationsMixin
    createSession: Sequelize.BelongsToManyCreateAssociationMixin<ActiviteSessionAttributes, ActiviteSessionInstance, any>
    getSessions: Sequelize.BelongsToManyGetAssociationsMixin<ActiviteSessionInstance>
    hasSession: Sequelize.BelongsToManyHasAssociationMixin<ActiviteSessionInstance, any>
    hasSessions: Sequelize.BelongsToManyHasAssociationsMixin<ActiviteSessionInstance, any>
    removeSession: Sequelize.BelongsToManyRemoveAssociationMixin<ActiviteSessionInstance, any>
    removeSessions: Sequelize.BelongsToManyRemoveAssociationsMixin<ActiviteSessionInstance, any>
    setSessions: Sequelize.BelongsToManySetAssociationsMixin<ActiviteSessionInstance, any, any>

    // -- belongsTo
    getFacture: Sequelize.BelongsToGetAssociationMixin<ComptabiliteFactureInstance>
    setFacture: Sequelize.BelongsToSetAssociationMixin<ComptabiliteFactureInstance, any>
}

export default {
    tableName: "adherent_adhesion",
    attributes: {
        id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
        valide: Sequelize.BOOLEAN
    },
    relations: [
        {
            type: "belongsTo",
            modelName: "adherent",
            options: { foreignKey: "adherent_adherent_id", as: "adherent" }
        },
        {
            type: "belongsTo",
            modelName: "activiteSection",
            options: { foreignKey: "admin_activite_section_id", as: "section" }
        },
        {
            type: "belongsTo",
            modelName: "tarif",
            options: { foreignKey: "admin_tarif_id", as: "tarif" }
        },
        {
            type: "belongsToMany",
            modelName: "activiteSession",
            options: { foreignKey: "adherent_adhesion_id", as: "sessions", through: "adherent_adhesion_session" }
        },
        {
            type: "belongsTo",
            modelName: "comptabiliteFacture",
            options: { foreignKey: "comptabilite_facture_id", as: "facture" }
        },
    ]
} as DatabaseModel<AdherentAdhesionInstance, AdherentAdhesionAttributes>