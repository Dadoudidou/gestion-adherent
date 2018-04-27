import { GraphqlObject } from "../../utils/GraphQLSchema/graphqlObject";

import { args_searchString } from "./../../utils/ArgsUtils"

import { dbcontext } from "./../../../../../datas";
import { SaisonType } from "./../../../../../datas/entities/admin/saison";

export class Saison extends GraphqlObject {
    name = "Saison";
    attributes = {
        id: "Int",
        debut: "Date",
        fin: "Date",
        nom: "String",
        categories: {
            type: "[Categorie]",
            args: {
                nom: "String"
            },
            resolver: (root: SaisonType, args) => {
                let _args = args_searchString(args, "nom");
                return root.getCategories({ where: _args });
            }
        }
    };

    queryAttributes= {
        saisons: {
            type: "[Saison]",
            resolver: () => { return dbcontext.models.saisons.findAll(); }
        }
    }

    mutationAttributes={
        addSaison: {
            type: "Saison",
            args: { saison: "_Saison!" },
            resolver: async (root, args, context) => {
                return dbcontext.models.saisons.create(args.saison);
            }
        },
        deleteSaison: {
            type: "Boolean",
            args: { id: "Int!" },
            resolver: async (root, args, context) => {
                let entity = await dbcontext.models.saisons.find({ where: { id: args.id } });
                if(!entity) return true;
                await entity.destroy();
                return true;
            }
        },
        updateSaison: {
            type: "Saison",
            args: { id: "Int!", saison: "_Saison!" },
            resolver: async (root, args, context) => {
                let entity = await dbcontext.models.saisons.find({ where: { id: args.id } });
                if(!entity) throw new Error(`Not found saison with id ${args.id}`);
                
                for(let key in args.saison){ entity[key] = args.saison[key]; }
                entity = await entity.save();
                return entity;
            }
        }
    }
}

export class InputSaison  extends GraphqlObject
{
    type = "input"
    name="_Saison";
    attributes = {
        debut: "Date",
        fin: "Date",
        nom: "String"
    }
}