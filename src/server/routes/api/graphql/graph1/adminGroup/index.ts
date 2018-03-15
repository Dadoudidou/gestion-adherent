import { GraphqlGroup } from "../../utils/GraphQLSchema/graphqlObject";
import { Lieu } from "./lieu"
import { Saison } from "./saison"
import { AdminActiviteGroup } from "./activites"

export class AdminGroup extends GraphqlGroup
{
    name="AdminGroup"
    childs=[
        new Lieu(),
        new Saison(),
        new AdminActiviteGroup()
    ]
}