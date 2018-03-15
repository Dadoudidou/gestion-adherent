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
}