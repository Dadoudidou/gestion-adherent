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
}