import { GraphqlObject } from "../../../utils/GraphQLSchema/graphqlObject";

import { args_searchString, args_replaceVar } from "./../../../utils/ArgsUtils"

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
    mutationAttributes={
        addSection: {
            type: "Section",
            args: { 
                activite_id: "Int",
                nom: "String!"
            },
            resolver: async (root, args, context) => {
                args = args_replaceVar(args, "activite_id", "admin_activite_activite_id");
                return dbcontext.models.actSections.create(args);
            }
        },
        deleteSection: {
            type: "Boolean",
            args: { id: "Int!" },
            resolver: async (root, args, context) => {
                let entity = await dbcontext.models.actSections.find({ where: { id: args.id } });
                if(!entity) return true;
                await entity.destroy();
                return true;
            }
        },
        updateSection: {
            type: "Section",
            args: { id: "Int!", nom: "String!", activite_id: "Int!"},
            resolver: async (root, args, context) => {
                let entity = await dbcontext.models.actSections.find({ where: { id: args.id } });
                if(!entity) throw new Error(`Not found lieu with id ${args.id}`);
                
                entity.nom = args.nom;
                entity.admin_activite_activite_id = args.activite_id;
                entity = await entity.save();
                return entity;
            }
        }
    }
}
