import { GraphqlObject } from "../../utils/GraphQLSchema/graphqlObject";

import { args_searchString } from "./../../utils/ArgsUtils"

import { dbcontext } from "./../../../../../datas";

export class AdherentDocument extends GraphqlObject {
    name = "AdherentDocument";
    attributes = {
        id: "Int",
        type: "String",
        date_creation: "Date",
        libelle: "String",
        document: "String",
        validite: "String",
    };

    queryAttributes= {
        documents: {
            type: "[AdherentDocument]",
            args: {
                id: "Int",
                type: "String",
                libelle: "String"
            },
            resolver: (root, args) => { 
                let _args = args_searchString(args, "type");
                _args = args_searchString(_args, "libelle");
                return dbcontext.models.documents.findAll({ where: _args }); 
            }
        }
    }
}