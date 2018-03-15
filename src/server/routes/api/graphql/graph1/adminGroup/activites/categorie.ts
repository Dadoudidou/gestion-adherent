import { GraphqlObject } from "../../../utils/GraphQLSchema/graphqlObject";

import { args_searchString } from "./../../../utils/ArgsUtils"

import { dbcontext } from "./../../../../../../datas";
import { ActCategorieType } from "./../../../../../../datas/entities/admin/activite_categorie";

export class Categorie extends GraphqlObject {
    name = "Categorie";
    attributes = {
        id: "Int",
        nom: "String",
        activites: {
            type: "[Activite]",
            resolver: (root: ActCategorieType, args) => {
                let _args = args_searchString(args, "nom");
                return root.getActivites({ where: _args });
            }
        },
        saison: {
            type: "Saison",
            resolver: (root: ActCategorieType) => {
                return root.getSaison();
            }
        }
    };

    queryAttributes= {
        categories: {
            type: "[Categorie]",
            resolver: (root, args) => { 
                let _args = args_searchString(args, "nom");
                return dbcontext.models.actCategories.findAll({ where: _args }); 
            }
        }
    }
}