import { GraphqlGroup } from "../../utils/GraphQLSchema/graphqlObject";
import { Lieu, InputLieu } from "./lieu"
import { Saison, InputSaison } from "./saison"
import { AdminActiviteGroup } from "./activites"
import { Tarif, InputTarif } from "@server/routes/api/graphql/graph1/adminGroup/tarif";
import { TarifLicence, InputTarifLicence } from "@server/routes/api/graphql/graph1/adminGroup/tarif_licence";

export class AdminGroup extends GraphqlGroup
{
    name="AdminGroup"
    childs=[
        new InputLieu(),
        new InputSaison(),
        new InputTarif(),
        new InputTarifLicence(),
        
        new Lieu(),
        new Saison(),
        new AdminActiviteGroup(),
        new Tarif(),
        new TarifLicence(),

        
    ]
}