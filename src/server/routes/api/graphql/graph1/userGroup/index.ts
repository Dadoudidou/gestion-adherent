import { GraphqlGroup } from "../../utils/GraphQLSchema/graphqlObject";
import { User, InputUser } from "./user"
import { Group } from "./group";
import { Permission } from "./permission";

export class UserGroup extends GraphqlGroup
{
    name="UserGroup"
    childs=[
        new User(),
        new InputUser(),
        new Group(),
        new Permission()
    ]
}