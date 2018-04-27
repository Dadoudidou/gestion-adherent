import { GraphqlObject } from "../../utils/GraphQLSchema/graphqlObject";

import { args_searchString, args_replaceVar } from "./../../utils/ArgsUtils"

import { dbcontext } from "./../../../../../datas";
import { TarifLicenceType } from "@server/datas/entities/admin/tarif_licence";

export class TarifLicence extends GraphqlObject {
    name = "TarifLicence";
    attributes = {
        id: "Int",
        montant: "Float",
        restriction_age_min: "Int",
        restriction_age_max: "Int",
        nom: "String",
        
        saison: {
            type: "Saison",
            args: {},
            resolver: (root: TarifLicenceType, args) => {
                return root.getSaison();
            }
        },

    };

    queryAttributes= {
        tarifsLicences: {
            type: "[TarifLicence]",
            args: {
                id: "Int",
                saison_id: "Int",
            },
            resolver: (root, args) => { 
                return dbcontext.models.tarifLicences.findAll({ 
                    where: args_replaceVar(args, "saison_id", "admin_saison_id") 
                }); 
            }
        }
    }
    mutationAttributes={
        addTarifLicence: {
            type: "TarifLicence",
            args: { tarif: "_TarifLicence!", saison_id: "Int!" },
            resolver: async (root, args, context) => {
                let saison = await dbcontext.models.saisons.find({ where: { id: args.saison_id } });
                if(!saison) throw new Error(`Not found saison with id ${args.saison_id}`);
                return saison.createLicence(args.tarif);
            }
        },
        deleteTarifLicence: {
            type: "Boolean",
            args: { tarif_id: "Int!" },
            resolver: async (root, args, context) => {
                let tarif = await dbcontext.models.tarifLicences.find({ where: { id: args.tarif_id } });
                if(!tarif) return true;
                await tarif.destroy();
                return true;
            }
        },
        updateTarifLicence: {
            type: "TarifLicence",
            args: { tarif_id: "Int!", tarif: "_TarifLicence!" },
            resolver: async (root, args, context) => {
                let tarif = await dbcontext.models.tarifLicences.find({ where: { id: args.tarif_id } });
                if(!tarif) throw new Error(`Not found tarif with id ${args.tarif_id}`);
                
                for(let key in args.tarif){ tarif[key] = args.tarif[key]; }
                tarif = await tarif.save();
                return tarif;
            }
        }
    }
}

export class InputTarifLicence  extends GraphqlObject
{
    type = "input"
    name="_TarifLicence";
    attributes = {
        montant: "Float",
        restriction_age_min: "Int",
        restriction_age_max: "Int",
        nom: "String",
    }
}