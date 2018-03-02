import * as Sequelize from "sequelize"
import { dataTypes } from "./../../dataTypes"
import { EntityClass } from "../../EntityClass";
import { ActSectionType } from "./activite_section";
import { DBModels } from "../..";
import { ActCategorieType } from "./activite_categorie";


export type ActActiviteType = {
    id: number
    nom: string
    admin_activite_categorie_id: number

    getSections: (opt?: Sequelize.FindOptions<ActSectionType>) => Promise<ActSectionType[]>
    getCategorie: () => Promise<ActCategorieType>
}

export type ActActiviteDBSet = {
    actActivites: Sequelize.Model<ActActiviteType, any>
}

export class Entity_ActActivite extends EntityClass {
    table_name = "admin_activite_activite"
    model_name = "actActivites"
    model_attributes = {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        } as Sequelize.DefineAttributeColumnOptions,
        nom: {
            type: dataTypes.STRING,
            allowNull: false,
        } as Sequelize.DefineAttributeColumnOptions,
        admin_activite_categorie_id: {
            type: dataTypes.INTEGER,
            allowNull: false,
        } as Sequelize.DefineAttributeColumnOptions,
    }
    model_options: Sequelize.DefineOptions<Entity_ActActivite> = {}

    associations = (models: DBModels) => {
        this._model.hasMany(models.actSections, {
            as: "sections",
            foreignKey: "admin_activite_activite_id"
        })
        this._model.belongsTo(models.actCategories, {
            as: "categorie",
            foreignKey: "admin_activite_categorie_id"
        })
    }
}