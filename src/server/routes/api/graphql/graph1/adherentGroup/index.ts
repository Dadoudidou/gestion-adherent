import { GraphqlGroup } from "../../utils/GraphQLSchema/graphqlObject";
import { AdherentDocument } from "@server/routes/api/graphql/graph1/adherentGroup/document";
import { Adherent } from "@server/routes/api/graphql/graph1/adherentGroup/adherent";
import { AdherentLicence } from "@server/routes/api/graphql/graph1/adherentGroup/licence";
import { Adhesion } from "@server/routes/api/graphql/graph1/adherentGroup/adhesion";


export class AdherentGroup extends GraphqlGroup
{
    name="AdherentGroup"
    childs=[
        new AdherentDocument(),
        new Adherent(),
        new AdherentLicence(),
        new Adhesion()
    ]
}