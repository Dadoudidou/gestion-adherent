import { GraphqlObject } from "../../utils/GraphQLSchema/graphqlObject";

import { args_searchString, args_replaceVar } from "./../../utils/ArgsUtils"

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
                args = args_replaceVar(args, "saison_id", "admin_saison_id");
                args = args_replaceVar(args, "section_id", "admin_activite_section_id");
                return dbcontext.models.tarifs.findAll({ where: args }); 
            }
        }
    }

    mutationAttributes={
        addTarif: {
            type: "Tarif",
            args: { tarif: "_Tarif!" },
            resolver: async (root, args, context) => {
                let section = await dbcontext.models.actSections.find({ where: { id: args.tarif.section_id } });
                if(!section) throw new Error(`Not found section with id ${args.tarif.section_id}`);
                let saison = await (await(await section.getActivite()).getCategorie()).getSaison();

                args.tarif = args_replaceVar(args.tarif, "section_id", "admin_activite_section_id");
                return saison.createTarif(args.tarif);
            }
        },
        deleteTarif: {
            type: "Boolean",
            args: { tarif_id: "Int!" },
            resolver: async (root, args, context) => {
                let tarif = await dbcontext.models.tarifs.find({ where: { id: args.tarif_id } });
                if(!tarif) return true;
                await tarif.destroy();
                return true;
            }
        },
        updateTarif: {
            type: "Tarif",
            args: { tarif_id: "Int!", tarif: "_Tarif!" },
            resolver: async (root, args, context) => {
                let tarif = await dbcontext.models.tarifs.find({ where: { id: args.tarif_id } });
                if(!tarif) throw new Error(`Not found tarif with id ${args.tarif_id}`);
                
                args.tarif = args_replaceVar(args.tarif, "section_id", "admin_activite_section_id");
                for(let key in args.tarif){ tarif[key] = args.tarif[key]; }
                tarif = await tarif.save();
                return tarif;
            }
        }
    }
}

export class InputTarif  extends GraphqlObject
{
    type = "input"
    name="_Tarif";
    attributes = {
        montant: "Float!",
        nbsessionmin: "Int",
        nbsessionmax: "Int",
        carte: "Boolean",
        carte_nbsession: "Int",
        section_id: "Int!"
    }
}