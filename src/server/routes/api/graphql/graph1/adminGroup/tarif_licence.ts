import { GraphqlObject } from "../../utils/GraphQLSchema/graphqlObject";

import { args_searchString } from "./../../utils/ArgsUtils"

import { dbcontext } from "./../../../../../datas";
import { TarifLicenceType } from "@server/datas/entities/admin/tarif_licence";

export class TarifLicence extends GraphqlObject {
    name = "TarifLicence";
    attributes = {
        id: "Int",
        montant: "Float",
        restriction_age_min: "Int",
        restriction_age_max: "Int",
        
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
                return dbcontext.models.tarifLicences.findAll({ where: {
                    ...args,
                    admin_saison_id: args.saison_id,
                } }); 
            }
        }
    }
}