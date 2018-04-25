import { GraphqlGroup } from "../../utils/GraphQLSchema/graphqlObject";
import { Lieu } from "./lieu"
import { Saison } from "./saison"
import { AdminActiviteGroup } from "./activites"
import { Tarif } from "@server/routes/api/graphql/graph1/adminGroup/tarif";
import { TarifLicence } from "@server/routes/api/graphql/graph1/adminGroup/tarif_licence";

export class AdminGroup extends GraphqlGroup
{
    name="AdminGroup"
    childs=[
        new Lieu(),
        new Saison(),
        new AdminActiviteGroup(),
        new Tarif(),
        new TarifLicence(),
    ]
}