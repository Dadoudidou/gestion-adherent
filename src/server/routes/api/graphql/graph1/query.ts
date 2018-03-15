import { GraphqlGroup } from "../utils/GraphQLSchema/graphqlObject";
import { UserGroup } from "./userGroup";
import { User } from "./userGroup/user";
import { AdminGroup } from "./adminGroup"


export class Query extends GraphqlGroup
{
    name="Query"
    childs=[
        new UserGroup(),
        new AdminGroup()
    ]
}

export class Mutation extends GraphqlGroup
{
    name="Mutation"
    childs=[
        new UserGroup()
    ]
}