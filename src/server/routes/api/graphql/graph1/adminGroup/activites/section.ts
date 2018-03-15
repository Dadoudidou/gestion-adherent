import { GraphqlObject } from "../../../utils/GraphQLSchema/graphqlObject";

import { args_searchString } from "./../../../utils/ArgsUtils"

import { dbcontext } from "./../../../../../../datas";
import { ActSectionType } from "./../../../../../../datas/entities/admin/activite_section";

export class Section extends GraphqlObject {
    name = "Section";
    attributes = {
        id: "Int",
        nom: "String",
        sessions: {
            type: "[Session]",
            args: {
                jour: "Int"
            },
            resolver: (root: ActSectionType, args) => {
                return root.getSessions({ where: args });
            }
        },
        activite: {
            type: "Activite",
            resolver: (root: ActSectionType) => {
                return root.getActivite();
            }
        }
    };

    queryAttributes= {
        sections: {
            type: "[Section]",
            args: {
                id: "Int",
                nom: "String"
            },
            resolver: (root, args) => { 
                let _args = args_searchString(args, "nom");
                return dbcontext.models.actSections.findAll({ where: _args }); 
            }
        }
    }
}