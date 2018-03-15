import { GraphqlObject } from "../../../utils/GraphQLSchema/graphqlObject";

import { args_searchString } from "./../../../utils/ArgsUtils"

import { dbcontext } from "./../../../../../../datas";
import { ActSessionType } from "./../../../../../../datas/entities/admin/activite_session";

export class Session extends GraphqlObject {
    name = "Session";
    attributes = {
        id: "Int",
        jour: "Int",
        heure_debut: "String",
        heure_fin: "String",
        place: "Int",
        section: {
            type: "Section",
            resolver: (root: ActSessionType, args) => {
                return root.getSection();
            }
        },
        lieu: {
            type: "Lieu",
            resolver: (root: ActSessionType) => {
                return root.getLieu();
            }
        }
    };

}