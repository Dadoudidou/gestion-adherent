import * as Sequelize from "sequelize"
import { config } from "./../config/index"

import { Entity_Saison, SaisonDBSet } from "./entities/admin/saison";
import { ActCategorieDBSet, Entity_ActCategorie } from "./entities/admin/activite_categorie";
import { ActActiviteDBSet, Entity_ActActivite } from "./entities/admin/activite_activite";
import { ActSectionDBSet, Entity_ActSection } from "./entities/admin/activite_section";
import { ActSessionDBSet, Entity_ActSession } from "./entities/admin/activite_session";
import { LieuDBSet, Entity_Lieu } from "./entities/admin/lieu";
import { UserDBSet, Entity_User } from "./entities/users/user";
import { GroupDBSet, Entity_Group } from "./entities/users/group";
import { PermissionDBSet, Entity_Permission } from "./entities/users/permission";
import { Entity_Adherent, AdherentDBSet } from "./entities/members/adherent";
import { Entity_Document, DocumentDBSet } from "./entities/members/document";
import { Entity_TarifLicence, TarifLicenceDBSet } from "./entities/admin/tarif_licence";
import { AdherentLicenceDBSet, Entity_AdherentLicence } from "./entities/members/licence";
import { TarifDBSet, Entity_Tarif } from "./entities/admin/tarif";
import { AdhesionDBSet, Entity_Adhesion } from "./entities/members/adhesion";
import { Entity_Facture, FactureDBSet } from "./entities/comptabilite/facture";
import { Entity_FactureDetail, FactureDetailDBSet } from "./entities/comptabilite/facture_detail";
import { Entity_FacturePaiement, FacturePaiementDBSet } from "./entities/comptabilite/facture_paiement";
import { Entity_Tiers, TiersDBSet } from "./entities/comptabilite/tiers";

export type DBModels = { } &
    SaisonDBSet & TarifLicenceDBSet & TarifDBSet &
    ActCategorieDBSet & ActActiviteDBSet & ActSectionDBSet & ActSessionDBSet &
    AdherentDBSet & DocumentDBSet & AdherentLicenceDBSet & AdhesionDBSet &
    LieuDBSet &
    UserDBSet & GroupDBSet & PermissionDBSet &
    FactureDBSet & FactureDetailDBSet & FacturePaiementDBSet & TiersDBSet

class DBContext {

    private _entities = [
        new Entity_Saison(),
        new Entity_ActCategorie(),
        new Entity_ActActivite(),
        new Entity_ActSection(),
        new Entity_ActSession(),
        new Entity_Lieu(),
        new Entity_User(),
        new Entity_Group(),
        new Entity_Permission(),
        new Entity_Adherent(),
        new Entity_Document(),
        new Entity_TarifLicence(),
        new Entity_AdherentLicence(),
        new Entity_Tarif(),
        new Entity_Adhesion(),
        new Entity_Facture(),
        new Entity_FactureDetail(),
        new Entity_FacturePaiement(),
        new Entity_Tiers(),
    ]
    private _sequelize: Sequelize.Sequelize

    public models: DBModels

    constructor(){
        this.initConnection();
        this.initModels();
    }

    private initConnection(){
        this._sequelize = new Sequelize(
            {
                database: config.connectors.default.database,
                username: config.connectors.default.user,
                password: config.connectors.default.password,
                dialect: config.connectors.default.type,
                port: config.connectors.default.port,
                host: config.connectors.default.host,
                protocol: "tcp",
                ...config.connectors.default.options
            }
        );
    }

    private initModels(){
        this.models = {} as any;
        // -- création des models
        this._entities.forEach(entity => {
            this.models[entity.model_name] = entity.getModel(this._sequelize);
        })
        // -- association des models
        this._entities.forEach(entity => entity.setAssociations(this.models));
    }

    public start(){
        this._sequelize
            .authenticate()
            .then(() => {
                console.log("Connexion établie au serveur mysql");
            })
            .catch(err => {
                console.error("Error Connection :", err);
            })
    }

}

export const dbcontext = new DBContext();