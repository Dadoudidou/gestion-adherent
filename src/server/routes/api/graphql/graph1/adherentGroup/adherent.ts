import { GraphqlObject } from "../../utils/GraphQLSchema/graphqlObject";

import { args_searchString } from "./../../utils/ArgsUtils"

import { dbcontext } from "./../../../../../datas";
import { AdherentType } from "@server/datas/entities/members/adherent";

export class Adherent extends GraphqlObject {
    name = "Adherent";
    attributes = {
        id: "Int",
        nom: "String",
        prenom: "String",
        datenaissance: "Date",
        male: "Boolean",
        adresse: "String",
        codepostal: "String",
        ville: "String",
        numero_licence: "String",
        telephone_fixe: "String",
        telephone_mobile: "String",
        email: "String",

        documents: {
            type: "[AdherentDocument]",
            args: {},
            resolver: (root: AdherentType) => {
                return root.getDocuments();
            }
        },
        licences: {
            type: "[AdherentLicence]",
            args: {},
            resolver: (root: AdherentType) => {
                return root.getLicences();
            }
        },
        adhesions: {
            type: "[Adhesion]",
            args: {},
            resolver: (root: AdherentType) => {
                return root.getAdhesions();
            }
        },
    };

    queryAttributes= {
        adherents: {
            type: "[Adherent]",
            args: { },
            resolver: (root, args) => { 
                return dbcontext.models.adherents.findAll(); 
            }
        }
    }
}