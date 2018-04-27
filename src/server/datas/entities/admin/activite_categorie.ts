import * as Sequelize from "sequelize"
import { dataTypes } from "./../../dataTypes"
import { EntityClass } from "../../EntityClass";
import { ActActiviteType } from "./activite_activite";
import { DBModels } from "../..";
import { SaisonType } from "./saison";


export type ActCategorieType = {
    id: number
    nom: string
    admin_saison_id: number

    getActivites: (opt?: Sequelize.FindOptions<ActActiviteType>) => Promise<ActActiviteType[]>
    getSaison: () => Promise<SaisonType>

    createActivite: (value: Partial<ActActiviteType>) => Promise<ActActiviteType>

} & Sequelize.Instance<any>

export type ActCategorieDBSet = {
    actCategories: Sequelize.Model<ActCategorieType, any>
}

export class Entity_ActCategorie extends EntityClass {
    table_name = "admin_activite_categorie"
    model_name = "actCategories"
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
        admin_saison_id: {
            type: dataTypes.INTEGER,
            allowNull: false,
        } as Sequelize.DefineAttributeColumnOptions,
    }
    model_options: Sequelize.DefineOptions<Entity_ActCategorie> = {}

    associations = (models: DBModels) => {
        this._model.hasMany(models.actActivites, {
            as: "activites",
            foreignKey: "admin_activite_categorie_id"
        })
        this._model.belongsTo(models.saisons, {
            as: "saison",
            foreignKey: "admin_saison_id"
        })
    }
}