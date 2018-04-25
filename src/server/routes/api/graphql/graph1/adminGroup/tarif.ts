import { GraphqlObject } from "../../utils/GraphQLSchema/graphqlObject";

import { args_searchString } from "./../../utils/ArgsUtils"

import { dbcontext } from "./../../../../../datas";
import { TarifType } from "@server/datas/entities/admin/tarif";

export class Tarif extends GraphqlObject {
    name = "Tarif";
    attributes = {
        id: "Int",
        montant: "Float",
        nbsessionmin: "Int",
        nbsessionmax: "Int",
        carte: "Boolean",
        carte_nbsession: "Int",
        saison: {
            type: "Saison",
            args: {},
            resolver: (root: TarifType, args) => {
                return root.getSaison();
            }
        },
        section: {
            type: "Section",
            args: {},
            resolver: (root: TarifType) => {
                return root.getSection();
            }
        }
    };

    queryAttributes= {
        tarifs: {
            type: "[Tarif]",
            args: {
                id: "Int",
                saison_id: "Int",
                section_id: "Int",
                carte: "Boolean"
            },
            resolver: (root, args) => { 
                return dbcontext.models.tarifs.findAll({ where: {
                    ...args,
                    admin_saison_id: args.saison_id,
                    admin_activite_section_id: args.section_id
                } }); 
            }
        }
    }
}