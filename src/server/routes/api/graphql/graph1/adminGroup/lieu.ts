import { GraphqlObject } from "../../utils/GraphQLSchema/graphqlObject";

import { args_searchString } from "./../../utils/ArgsUtils"

import { dbcontext } from "./../../../../../datas";
import { LieuType } from "./../../../../../datas/entities/admin/lieu";

export class Lieu extends GraphqlObject {
    name = "Lieu";
    attributes = {
        id: "Int",
        nom: "String",
        adresse: "String",
        codepostal: "String",
        ville: "String",
        sessions: {
            type: "[Session]",
            args: {
                jour: "Int"
            },
            resolver: (root: LieuType, args) => {
                return root.getSessions({ where: args });
            }
        }
    };

    queryAttributes= {
        lieux: {
            type: "[Lieu]",
            args: {
                id: "Int",
                nom: "String",
                ville: "String"
            },
            resolver: (root, args) => { 
                let _args = args_searchString(args, "nom");
                _args = args_searchString(_args, "ville");
                return dbcontext.models.lieux.findAll({ where: _args }); 
            }
        }
    }
    mutationAttributes={
        addLieu: {
            type: "Lieu",
            args: { lieu: "_Lieu!" },
            resolver: async (root, args, context) => {
                return dbcontext.models.lieux.create(args.lieu);
            }
        },
        deleteLieu: {
            type: "Boolean",
            args: { id: "Int!" },
            resolver: async (root, args, context) => {
                let entity = await dbcontext.models.lieux.find({ where: { id: args.id } });
                if(!entity) return true;
                await entity.destroy();
                return true;
            }
        },
        updateLieu: {
            type: "Lieu",
            args: { id: "Int!", lieu: "_Lieu!" },
            resolver: async (root, args, context) => {
                let entity = await dbcontext.models.lieux.find({ where: { id: args.id } });
                if(!entity) throw new Error(`Not found lieu with id ${args.id}`);
                
                for(let key in args.lieu){ entity[key] = args.lieu[key]; }
                entity = await entity.save();
                return entity;
            }
        }
    }
}

export class InputLieu  extends GraphqlObject
{
    type = "input"
    name="_Lieu";
    attributes = {
        nom: "String",
        adresse: "String",
        codepostal: "String",
        ville: "String",
    }
}