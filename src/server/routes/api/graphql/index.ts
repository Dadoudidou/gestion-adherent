import { makeExecutableSchema } from "graphql-tools"

/*import { graphql_saison } from "./graph/saison";
import { GraphQLSchema } from "./utils/GraphQLSchema";
import { Query } from "./graph/_query";
import { graphql_date } from "./graph/date";
import { graphql_json } from "./graph/json";
import { Mutation } from "./graph/_mutation";
import { graphql_actCategorie } from "./graph/actCategorie";
import { graphql_actSection } from "./graph/actSection";
import { graphql_actSession } from "./graph/actSession";
import { graphql_actActivite } from "./graph/actActivite";
import { graphql_Lieu } from "./graph/lieu";
import { graphql_user } from "./graph/user";
import { graphql_group } from "./graph/group";
import { graphql_permission } from "./graph/permission";*/

/*
export const __tabGraphs: GraphQLSchema<any>[] = [
    new graphql_date(),
    new graphql_json(),
    new graphql_saison(),
    new graphql_actCategorie(),
    new graphql_actActivite(),
    new graphql_actSection(),
    new graphql_actSession(),
    new graphql_Lieu(),
    new graphql_user(),
    new graphql_group(),
    new graphql_permission()
]
__tabGraphs.push(new Query());
__tabGraphs.push(new Mutation());

export let typeDefs = "";
let resolvers = {};
__tabGraphs.forEach(graph => {
    if(graph.Type.defs.trim() != ''){
        typeDefs = typeDefs + graph.Type.defs;
        if(graph.Type.resolvers){
            resolvers = { ... resolvers, ...graph.Type.resolvers }
        }
    }
});*/

import { Query, Mutation } from "./graph1/query";

let typeDefs = "";
let resolvers = {};

let _query = new Query();
let _mutation = new Mutation();
typeDefs += `
    scalar Date
    scalar JSON
`;
typeDefs += _query.gen_objectDefs();
typeDefs += _query.gen_defs("Query");
typeDefs += _mutation.gen_defs("Mutation");
resolvers = {
    ...resolvers, 
    Date: {
        __parseValue(value){ return new Date(value); },
        __serialize(value: Date){ return value.toISOString(); },
        __parseLiteral(ast){ return null; }
    },
    JSON: {
        __parseValue(value){ return JSON.stringify(value); },
        __serialize(value: any){ return JSON.parse(value); },
        __parseLiteral(ast){ return null; }
    },
    ..._query.gen_objectResolvers(),
    ..._query.gen_resolvers("Query"),
    ..._mutation.gen_resolvers("Mutation")
}


//console.log(typeDefs);

/*console.log(JSON.stringify(resolvers, function (key, val) {
    if (typeof val === 'function') {
        return val + ''; // implicitly `toString` it
    }
    return val;
}));*/

export const schema = makeExecutableSchema({
    resolvers: resolvers,
    typeDefs: typeDefs
})

import * as Hapi from "hapi";
import { Credentials } from "./../../../auths";

export type GraphQlContext = {
    auth: Hapi.RequestAuth
    request: Hapi.Request
    credentials: Credentials
}