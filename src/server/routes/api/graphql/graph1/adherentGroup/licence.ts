import { GraphqlObject } from "../../utils/GraphQLSchema/graphqlObject";

import { args_searchString } from "./../../utils/ArgsUtils"

import { dbcontext } from "./../../../../../datas";
import { AdherentLicenceType } from "@server/datas/entities/members/licence";


export class AdherentLicence extends GraphqlObject {
    name = "AdherentLicence";
    attributes = {
        id: "Int",
        tshirt: "String",
        type: "String",
        dernier_club: "String",

        tarif: {
            type: "TarifLicence",
            args: {},
            resolver: (root: AdherentLicenceType) => {
                return root.getTarif();
            }
        },
        adherent: {
            type: "Adherent",
            args: {},
            resolver: (root: AdherentLicenceType) => {
                return root.getAdherent();
            }
        }
    };

    queryAttributes= {

    }
}