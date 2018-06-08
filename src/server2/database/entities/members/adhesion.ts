import * as Sequelize from "sequelize"
import { dataTypes } from "./../../dataTypes"
import { EntityClass } from "../../EntityClass";
import { DBModels } from "../..";
import { AdherentType } from "@server/database/entities/members/adherent";
import { ActSectionType } from "@server/database/entities/admin/activite_section";
import { TarifType } from "@server/database/entities/admin/tarif";
import { ActSessionType } from "@server/database/entities/admin/activite_session";


export type AdhesionType = {
    id: number
    valide: boolean
    adherent_adherent_id: number
    admin_activite_section_id: number
    admin_tarif_id: number

    getAdherent: () => Promise<AdherentType>
    getSection: () => Promise<ActSectionType>
    getTarif: () => Promise<TarifType>
    getSessions: (opt?: Sequelize.FindOptions<ActSessionType>) => Promise<ActSessionType[]>
} & Sequelize.Instance<any>

export type AdhesionDBSet = {
    adhesions: Sequelize.Model<AdhesionType, any>
}

export class Entity_Adhesion extends EntityClass {
    table_name = "adherent_adhesion"
    model_name = "adhesions"
    model_attributes = {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        } as Sequelize.DefineAttributeColumnOptions,
        valide: {
            type: dataTypes.BOOLEAN,
            allowNull: false,
        } as Sequelize.DefineAttributeColumnOptions,
        adherent_adherent_id: {
            type: dataTypes.INTEGER,
            allowNull: false,
        } as Sequelize.DefineAttributeColumnOptions,
        admin_activite_section_id: {
            type: dataTypes.INTEGER,
            allowNull: false,
        } as Sequelize.DefineAttributeColumnOptions,
        admin_tarif_id: {
            type: dataTypes.INTEGER,
            allowNull: false,
        } as Sequelize.DefineAttributeColumnOptions,
    }
    model_options: Sequelize.DefineOptions<Entity_Adhesion> = {}

    associations = (models: DBModels) => {
        this._model.belongsTo(models.adherents, {
            as: "adherent",
            foreignKey: "adherent_adherent_id"
        });
        this._model.belongsTo(models.actSections, {
            as: "section",
            foreignKey: "admin_activite_section_id"
        });
        this._model.belongsTo(models.tarifs, {
            as: "tarif",
            foreignKey: "admin_tarif_id"
        });
        this._model.belongsToMany(models.actSessions, {
            through: "adherent_adhesion_session",
            as: "sessions",
            foreignKey: "adherent_adhesion_id"
        });
    }
}