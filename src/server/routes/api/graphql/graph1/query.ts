import { GraphqlGroup } from "../utils/GraphQLSchema/graphqlObject";
import { UserGroup } from "./userGroup";
import { User } from "./userGroup/user";
import { AdminGroup } from "./adminGroup"
import { AdherentGroup } from "@server/routes/api/graphql/graph1/adherentGroup";
import { AdherentDocument } from "@server/routes/api/graphql/graph1/adherentGroup/document";
import { Adherent } from "@server/routes/api/graphql/graph1/adherentGroup/adherent";
import { AdherentLicence } from "@server/routes/api/graphql/graph1/adherentGroup/licence";
import { Adhesion } from "@server/routes/api/graphql/graph1/adherentGroup/adhesion";
import { Lieu } from "@server/routes/api/graphql/graph1/adminGroup/lieu";
import { Saison } from "@server/routes/api/graphql/graph1/adminGroup/saison";
import { AdminActiviteGroup } from "@server/routes/api/graphql/graph1/adminGroup/activites";
import { Tarif } from "@server/routes/api/graphql/graph1/adminGroup/tarif";
import { TarifLicence } from "@server/routes/api/graphql/graph1/adminGroup/tarif_licence";


export class Query extends GraphqlGroup
{
    name="Query"
    childs=[
        new UserGroup(),

        new Lieu(),
        new Saison(),
        new AdminActiviteGroup(),
        new Tarif(),
        new TarifLicence(),

        new AdherentDocument(),
        new Adherent(),
        new AdherentLicence(),
        new Adhesion()
    ]
}

export class Mutation extends GraphqlGroup
{
    name="Mutation"
    childs=[
        new UserGroup()
    ]
}