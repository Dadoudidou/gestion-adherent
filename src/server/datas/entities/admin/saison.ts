import * as Sequelize from "sequelize"
import { dataTypes } from "./../../dataTypes"
import { EntityClass } from "../../EntityClass";
import { DBModels } from "../..";
import { ActCategorieType } from "./activite_categorie";


export type SaisonType = {
    id: number
    debut: Date
    fin: Date
    nom: string

    getCategories: (opt?: Sequelize.FindOptions<ActCategorieType>) => Promise<ActCategorieType[]>
}

export type SaisonDBSet = {
    saisons: Sequelize.Model<SaisonType, any>
}

export class Entity_Saison extends EntityClass {
    table_name = "admin_saison"
    model_name = "saisons"
    model_attributes = {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        } as Sequelize.DefineAttributeColumnOptions,
        debut: {
            type: dataTypes.DATE,
            allowNull: false
        } as Sequelize.DefineAttributeColumnOptions,
        fin: {
            type: dataTypes.DATE,
            allowNull: false
        } as Sequelize.DefineAttributeColumnOptions,
        nom: {
            type: dataTypes.STRING,
            allowNull: false,
        } as Sequelize.DefineAttributeColumnOptions
    }
    model_options: Sequelize.DefineOptions<Entity_Saison> = {}
    
    associations = (models: DBModels) => {
        this._model.hasMany(models.actCategories, {
            as: "categories",
            foreignKey: "admin_saison_id"
        })
    }
}