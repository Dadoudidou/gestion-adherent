import * as fileSystem from "fs";
import * as Path from "path"
import * as Sequelize from "sequelize";
import { ActiviteInstance, ActiviteAttributes } from "./Models/activite";
import { ActiviteSectionInstance, ActiviteSectionAttributes } from "./Models/activiteSection";
import { CampagneInstance, CampagneAttributes } from "./Models/campagne";
import { ActiviteCategorieInstance, ActiviteCategorieAttributes } from "./Models/activiteCategorie";
import { ActiviteSessionInstance, ActiviteSessionAttributes } from "./Models/activiteSession";
import { LieuInstance, LieuAttributes } from "./Models/lieu";
import { TarifLicenceInstance, TarifLicenceAttributes } from "@server/database2/Models/tarifLicence";
import { TarifInstance, TarifAttributes } from "@server/database2/Models/tarif";
import { UserInstance, UserAttributes } from "@server/database2/Models/user";
import { UserGroupInstance, UserGroupAttributes } from "@server/database2/Models/userGroup";
import { UserPermissionInstance, UserPermissionAttributes } from "@server/database2/Models/userPermission";
import { AdherentInstance, AdherentAttributes } from "@server/database2/Models/adherent";
import { AdherentAdhesionInstance, AdherentAdhesionAttributes } from "@server/database2/Models/adherentAdhesion";
import { AdherentDocumentInstance, AdherentDocumentAttributes } from "@server/database2/Models/adherentDocument";
import { ComptabiliteFactureInstance, ComptabiliteFactureAttributes } from "@server/database2/Models/comptabiliteFacture";
import { ComptabiliteFactureDetailInstance, ComptabiliteFactureDetailAttributes } from "@server/database2/Models/comptabiliteFactureDetail";
import { ComptabiliteFacturePaiementInstance, ComptabiliteFacturePaiementAttributes } from "@server/database2/Models/comptabiliteFacturePaiement";
import { ComptabiliteTiersInstance, ComptabiliteTiersAttributes } from "@server/database2/Models/comptabiliteTiers";






var modelsFiles = require.context("./Models/", false, /\.ts$/);


type ModelsNames = 
    "activite" | "activiteCategorie" | "activiteSection" | "activiteSession" |
    "lieu" | "campagne" | "tarifLicence" | "tarif" |
    "user" | "userGroup" | "userPermission" |
    "adherent" | "adherentAdhesion" | "adherentDocument" |
    "comptabiliteFacture" | "comptabiliteFactureDetail" | "comptabiliteFacturePaiement" | "comptabiliteTiers"

type InstancesModels<P = ModelsNames> = 
    P extends "activite" ? DBModel<ActiviteInstance, ActiviteAttributes> :
    P extends "activiteCategorie" ? DBModel<ActiviteCategorieInstance, ActiviteCategorieAttributes> :
    P extends "activiteSection" ? DBModel<ActiviteSectionInstance, ActiviteSectionAttributes> :
    P extends "activiteSession" ? DBModel<ActiviteSessionInstance, ActiviteSessionAttributes> :
    P extends "lieu" ? DBModel<LieuInstance, LieuAttributes> :
    P extends "campagne" ? DBModel<CampagneInstance, CampagneAttributes> :
    P extends "tarifLicence" ? DBModel<TarifLicenceInstance, TarifLicenceAttributes> :
    P extends "tarif" ? DBModel<TarifInstance, TarifAttributes> :
    P extends "user" ? DBModel<UserInstance, UserAttributes> :
    P extends "userGroup" ? DBModel<UserGroupInstance, UserGroupAttributes> :
    P extends "userPermission" ? DBModel<UserPermissionInstance, UserPermissionAttributes> :
    P extends "adherent" ? DBModel<AdherentInstance, AdherentAttributes> :
    P extends "adherentAdhesion" ? DBModel<AdherentAdhesionInstance, AdherentAdhesionAttributes> :
    P extends "adherentDocument" ? DBModel<AdherentDocumentInstance, AdherentDocumentAttributes> :
    P extends "comptabiliteFacture" ? DBModel<ComptabiliteFactureInstance, ComptabiliteFactureAttributes> :
    P extends "comptabiliteFactureDetail" ? DBModel<ComptabiliteFactureDetailInstance, ComptabiliteFactureDetailAttributes> :
    P extends "comptabiliteFacturePaiement" ? DBModel<ComptabiliteFacturePaiementInstance, ComptabiliteFacturePaiementAttributes> :
    P extends "comptabiliteTiers" ? DBModel<ComptabiliteTiersInstance, ComptabiliteTiersAttributes> :
    never;





type DBModel<TInstance, Tattributes> = Sequelize.Model<TInstance & Model<TInstance, Tattributes>, Tattributes>

interface Model<TInstance, TAttributes> {
    save(options?: Sequelize.InstanceSaveOptions): Promise<this>;
    get(key: keyof TAttributes, options?: { plain?: boolean, clone?: boolean }): any;
    set<K extends keyof TAttributes>(key: K, value: TAttributes[K], options?: Sequelize.InstanceSetOptions): this;
    set(keys: Object, options?: Sequelize.InstanceSetOptions): this;
}

type DefineAttributes<T> = {
    [P in keyof T]?: string | Sequelize.DataTypeAbstract | Sequelize.DefineAttributeColumnOptions
} & Sequelize.DefineAttributes

type DatabaseModelRelationType = "belongsTo" | "belongsToMany" | "hasMany" | "hasOne" | "manyToMany";
type DatabaseModelRelationOption<T extends DatabaseModelRelationType> = 
    T extends "belongsTo" ? Sequelize.AssociationOptionsBelongsTo :
    T extends "belongsToMany" ? Sequelize.AssociationOptionsBelongsToMany :
    T extends "hasMany" ? Sequelize.AssociationOptionsHasMany :
    T extends "hasOne" ? Sequelize.AssociationOptionsHasOne :
    Sequelize.AssociationOptionsManyToMany

type DatabaseModelRelation<T extends DatabaseModelRelationType> = {
    type : T
    modelName: ModelsNames
    options?: DatabaseModelRelationOption<T>
}

export type DatabaseModel<TInstance, TAttributes> = {
    tableName: string
    attributes: DefineAttributes<TAttributes>
    options?: Sequelize.DefineOptions<TInstance>
    relations?: DatabaseModelRelation<DatabaseModelRelationType>[]
}

export class DatabaseSingleton {

    static instance:DatabaseSingleton = null;
    static getInstance = () => {
        if(DatabaseSingleton.instance === null){
            DatabaseSingleton.instance = new DatabaseSingleton();
        }
        return DatabaseSingleton.instance;
    }

    private sequelize: Sequelize.Sequelize = null;
    private pathToModels: string = "./database2/Models";
    private models: {[key:string]:Sequelize.Model<any, any>} = {}
    private relationships: {[key:string]: DatabaseModelRelation<any>[]} = {}

    setup(options: Sequelize.Options){
        this.sequelize = new Sequelize(options);
        this.init();
    }

    model<TModel extends ModelsNames>(name: TModel): InstancesModels<TModel> {
        return this.models[name] as any
    }

    seq(){
        return Sequelize;
    }

    init(){
        // -- création des models
        //var req = require.context(this.pathToModels, false, /\.ts$/);
        modelsFiles.keys().forEach((name) => {

            //let object: DatabaseModel<any, any> = require(this.pathToModels + "/" + name);
            let object: DatabaseModel<any, any> = modelsFiles(name).default;
            let options: Sequelize.DefineOptions<any> = {
                tableName: object.tableName,
                ...object.options
            };
            let modelName = name.replace(/\.ts$/i, "").replace(/^\.\//i, "");

            this.models[modelName] = this.sequelize.define(modelName, object.attributes, options);
            if(object.relations){
                this.relationships[modelName] = object.relations;
            }
        });
        // -- création des relations
        for(let modelName in this.relationships){
            let model = this.models[modelName];
            let relations = this.relationships[modelName];
            relations.forEach(relation => {
                let relatedModel = this.models[relation.modelName];
                if(!relatedModel) return;
                model[relation.type](relatedModel, relation.options);
            });
        }
    }

    async start(){
        await this.sequelize
            .authenticate()
            .then(() => {
                console.log("Connexion au serveur de base de donnée")
            })
            .catch(err => {
                console.log(err);
            })
    }

}

export default DatabaseSingleton.getInstance();