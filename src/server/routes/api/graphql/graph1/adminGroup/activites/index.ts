import { GraphqlGroup } from "../../../utils/GraphQLSchema/graphqlObject";
import { Activite } from "./activite"
import { Categorie } from "./categorie"
import { Section } from "./section"
import { Session } from "./session"

export class AdminActiviteGroup extends GraphqlGroup
{
    name="AdminActiviteGroup"
    childs=[
        new Categorie(),
        new Activite(),
        new Section(),
        new Session()
    ]
}