import { GraphqlGroup } from "../utils/GraphQLSchema/graphqlObject";
import { UserGroup } from "./userGroup";
import { User } from "./userGroup/user";


export class Query extends GraphqlGroup
{
    name="Query"
    childs=[
        new UserGroup()
    ]
}

export class Mutation extends GraphqlGroup
{
    name="Mutation"
    childs=[
        new UserGroup()
    ]
}