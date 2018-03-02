import { GraphQlContext } from "..";

export type schemaResolver<T> = (root: T, args: any, context: GraphQlContext, info: any) => any;
export type graphQLType<T> = {
    defs: string
    resolvers?: { [key: string]: { [key: string]: schemaResolver<T> } }
}
export type graphQLAction = {
    defs: string
    resolvers?: { [key: string]: schemaResolver<any> }
}

export abstract class GraphQLSchema<T> {
    abstract Type: {
        defs: string
        resolvers?: { [key: string]: { [key: string]: schemaResolver<T> } }
    }
    Query?: {
        name: string
        defs: string
        resolvers?: { [key: string]: schemaResolver<any> }
    }
    Mutation?: {
        name: string
        defs: string
        resolvers?: { [key: string]: schemaResolver<any> }
    }
    permissions: number[] = []
}

export abstract class GraphQLGroup {
    abstract name: string
    abstract childs: (GraphQLGroup | GraphQLSchema<any>)[]

    private _getGroupType(){
        this.childs.forEach(child => {
            
        })
    }
}


class query extends GraphQLGroup {
    name = "Query"
    childs = [
        new userGroup()
    ]
}

class userGroup extends GraphQLGroup {
    name = "UserGroup"
    childs = [
        new user(), new permission()
    ]
}

class user extends GraphQLSchema<any>{
    Type = {
        defs: ``
    }
}

class permission extends GraphQLSchema<any>{
    Type = {
        defs: ``
    }
}