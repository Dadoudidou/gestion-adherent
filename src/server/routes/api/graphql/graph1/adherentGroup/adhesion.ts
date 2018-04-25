import { GraphqlObject } from "../../utils/GraphQLSchema/graphqlObject";

import { args_searchString } from "./../../utils/ArgsUtils"

import { dbcontext } from "./../../../../../datas";
import { AdhesionType } from "@server/datas/entities/members/adhesion";

export class Adhesion extends GraphqlObject {
    name = "Adhesion";
    attributes = {
        id: "Int",
        valide: "Boolean",

        adherent: {
            type: "Adherent",
            resolver: (root: AdhesionType) => {
                return root.getAdherent();
            }
        },
        section: {
            type: "Section",
            resolver: (root: AdhesionType) => {
                return root.getSection();
            }
        },
        sessions: {
            type: "[Session]",
            resolver: (root: AdhesionType) => {
                return root.getSessions();
            }
        },
        tarif: {
            type: "Tarif",
            resolver: (root: AdhesionType) => {
                return root.getTarif();
            }
        }
    };

    queryAttributes= {
        
    }
}