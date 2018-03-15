import { GraphqlObject } from "../../../utils/GraphQLSchema/graphqlObject";

import { args_searchString } from "./../../../utils/ArgsUtils"

import { dbcontext } from "./../../../../../../datas";
import { ActActiviteType } from "./../../../../../../datas/entities/admin/activite_activite";

export class Activite extends GraphqlObject {
    name = "Activite";
    attributes = {
        id: "Int",
        nom: "String",
        sections: {
            type: "[Section]",
            resolver: (root: ActActiviteType, args) => {
                let _args = args_searchString(args, "nom");
                return root.getSections({ where: _args });
            }
        },
        categorie: {
            type: "Categorie",
            resolver: (root: ActActiviteType) => {
                return root.getCategorie();
            }
        }
    };

    queryAttributes= {
        activites: {
            type: "[Activite]",
            resolver: (root, args) => { 
                let _args = args_searchString(args, "nom");
                return dbcontext.models.actActivites.findAll({ where: _args }); 
            }
        }
    }
}