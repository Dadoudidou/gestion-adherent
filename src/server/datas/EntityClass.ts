import * as Sequelize from "sequelize"
import { DBModels } from ".";

export abstract class EntityClass {
    protected abstract table_name: string
    protected abstract model_name: string
    protected model_attributes: Sequelize.DefineAttributes = {}
    protected model_options: Sequelize.DefineOptions<any> = {}
    protected associations: (models: DBModels) => void


    protected _model: Sequelize.Model<any, any>

    getModel(sequelize: Sequelize.Sequelize){
        this._model = sequelize.define(this.table_name, this.model_attributes, {  
            tableName: this.table_name,
            ...this.model_options
        });
        return this._model;
    }
    setAssociations(models){
        if(this.associations){
            this.associations(models);
        }
    }
}