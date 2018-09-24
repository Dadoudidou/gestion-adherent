import * as Hapi from "hapi"
import * as Inert from "inert"
import { ApolloServer } from "apollo-server-hapi"
import * as Boom from "boom";
import * as Path from "path"
import * as moment from "moment"
import * as HapiBasicAuth from "hapi-auth-basic"
import { HapiAuthJWT } from "./utils/auth/plugins/hapi-auth-jwt"
import setGraphiqlStrategy from "./utils/auth/strategies/auth-basic-graphiql"
import setGraphqlStrategy from "./utils/auth/strategies/auth-jwt-graphql"
import { config } from "./config"
import { getSchema } from "./graphql/default"
import routeHandler_auth from "./routes/auth"
import routeHandler_Root from "./routes/root"

import ApiGraphQL, { GraphQLContext } from "./graphql/V1";
ApiGraphQL.setup();

import database2 from "@server/database2";
database2.setup({
    database: config.connectors.default.database,
    username: config.connectors.default.user,
    password: config.connectors.default.password,
    dialect: config.connectors.default.type,
    port: config.connectors.default.port,
    host: config.connectors.default.host,
    protocol: "tcp",
    ...config.connectors.default.options,
})

import HapiLogPlugin from "@server/utils/Logger/hapi-log-plugin"
import { each } from "bluebird";

moment.locale("fr");

let HapiServer: Hapi.Server = undefined;

export const getServer = () => HapiServer;


async function createServer(){

    // -- création du serveur
    /*HapiServer = new Hapi.Server({ 
        ...config.server,
        debug: { request: ['error'] }
    });

    // -- cache
    const cache = HapiServer.cache({ segment: "sessions", expiresIn: 1 * 24 * 60 * 60 * 1000 });
    HapiServer.app["cache"] = cache;

    // -- enregistrement de plugins
    await HapiServer.register(HapiBasicAuth);       // authentification basic
    await HapiServer.register(HapiAuthJWT);         // authentification basic jwt
    await HapiServer.register(Inert);               // static files and directory
    await HapiServer.register(HapiLogPlugin)        // log server

    // -- enregistrement des stratégies d'authentifications
    setGraphiqlStrategy(HapiServer);
    setGraphqlStrategy(HapiServer);

    // -- connexion au serveur de base de données
    await database2.start();

    //#region ROUTES

    // -- /
    HapiServer.route({
        method: "GET",
        path: "/",
        options: {
            log: { collect: true }
        },
        handler: routeHandler_Root
    })

    // -- files
    HapiServer.route({
        method: 'GET',
        path: '/static/{param*}',
        handler: {
            directory: {
                path: "./build/static",
                listing: false,
                index: false
            }
        }
    })

    // -- graphQL
    const apolloServer = new ApolloServer({
        schema: ApiGraphQL.setup().getSchema(),
        context: async ({request, h}) => {
            let _request = request as Hapi.Request;
            return {
                auth: _request.auth,
                request: _request,
                credentials: _request.auth.credentials,
                db: database2
            } as any
        },
        debug: true,
        uploads: true
    });
    await apolloServer.applyMiddleware({
        app: HapiServer,
        path: "/api_v1/graphql",
        uploads: true,
        route: {
            //auth: "auth-jwt-graphql",
            //payload: {
                //output: "file",
                //parse: true
            //},
            pre:[{
                assign: "FileUpload",
                method: async (request: Hapi.Request, h: Hapi.ResponseToolkit) => {
                    console.log(request.mime);
                    let _operations = request.payload["operations"];
                    let _map = request.payload["map"];
                    if(_operations && _map){
                        const pay = {...JSON.parse(_operations)};
                        const map = {...JSON.parse(_map)};
                        for(let key in map){
                            if(request.payload[key]){
                                console.log("--------------------------------------")
                                //console.log(request.payload[key].path)
                                //console.log(request.payload[key].bytes)
                                //console.log(request.payload[key].filename)
                                //console.log(request.payload[key].headers)
                                //console.log(request.payload[key].toString())
                                console.log("--------------------------------------")
                            }
                        }
                        if(_operations.query){
                            request = {
                                ...request,
                                payload: _operations.query
                            } as any
                        }
                    }
                    return request;
                },
            }]
        },
    })
    await apolloServer.installSubscriptionHandlers(HapiServer.listener);*/

    // -- /api_v1/graphql
    /*await server.register({
        plugin: graphqlHapi as any,
        options: {
            path: "/api_v1/graphql",
            route: {
                //auth: "auth-jwt-graphql",
                pre: [
                    {
                        method: async (request: Hapi.Request, h: Hapi.ResponseToolkit) => {

                           

                            console.log("--------------------------------------")
                            console.log(request.payload);
                            console.log("--------------------------------------")
                            let _operations = request.payload["operations"];
                            let _map = request.payload["map"];
                            if(_operations && _map){
                                const pay = {...JSON.parse(_operations)};
                                const map = {...JSON.parse(_map)};
                                for(let key in map){
                                    if(request.payload[key]){
                                        console.log("--------------------------------------")
                                        console.log(request.payload[key].name)
                                        console.log(request.payload[key].filename)
                                        console.log(request.payload[key].headers)
                                        console.log(request.payload[key].toString())
                                        console.log("--------------------------------------")
                                    }
                                }
                            }
                            //console.log(request.raw)

                            
                            //let _process = await processRequest(request.raw.req, request.raw.res);
                            return true;
                        },
                        assign: "fileUpload"
                    }
                ]
            },
            graphqlOptions: (request: Hapi.Request) => {
                return {
                    schema: ApiGraphQL.setup().getSchema(),
                    context: {
                        auth: request.auth,
                        request: request,
                        credentials: request.auth.credentials,
                        db: database2
                    } as GraphQLContext,
                    formatError: err => {
                        console.debug(err);
                        if(err.originalError && Boom.isBoom(err.originalError)){

                        }
                        return err;
                    },
                    debug: true
                }
            }
        },
    })*/

    // -- /api_v1/graphiql
    /*await HapiServer.register({
        plugin: graphiqlHapi as any,
        options:{
            path: "/api_v1/graphiql",
            route: {
                description: "GraphiQL Endpoint (documentation)",
                auth: "auth-basic-graphiql",
                ext: {
                    onPreResponse: [{
                        method: async (request, reply: Hapi.ResponseToolkit) => {
                            let _response = request.response;
                            let _token = (request.auth && request.auth.credentials) ? request.auth.credentials.token : undefined;

                            if(_response.isBoom || !_response.source || !_token){
                                return reply.continue;
                            }
                            return reply.response(request.response.source.replace("</head>", `
                                <script>
                                window.__TOKEN = "${_token}";
                                console.info("A new AccessToken '${_token}' was automatically injected into this debug session.");
                                </script>
                                </head>
                            `));
                        }
                    }]
                }
            },
            graphiqlOptions: {
                endpointURL: "/api_v1/graphql",
                passHeader: "'Authorization': window.__TOKEN ? 'JWT ' + window.__TOKEN : ''"
            }
        }
    })*/

    // -- /api/graphql
    /*
    await server.register({
        plugin: graphqlHapi as any,
        options: {
            path: "/api/graphql",
            route: {
                auth: "auth-jwt-graphql",
            },
            graphqlOptions: (request: Hapi.Request) => {
                return {
                    schema: getSchema(),
                    context: {
                        auth: request.auth,
                        request: request,
                        credentials: request.auth.credentials
                    },
                    formatError: err => {
                        console.debug(err);
                        if(err.originalError && Boom.isBoom(err.originalError)){

                        }
                        return err;
                    },
                    debug: true
                }
            }
        },
    })

    // -- /graphiql
    await server.register({
        plugin: graphiqlHapi as any,
        options:{
            path: "/graphiql",
            route: {
                description: "GraphiQL Endpoint (documentation)",
                auth: "auth-basic-graphiql",
                ext: {
                    onPreResponse: [{
                        method: async (request, reply: Hapi.ResponseToolkit) => {
                            let _response = request.response;
                            let _token = (request.auth && request.auth.credentials) ? request.auth.credentials.token : undefined;

                            if(_response.isBoom || !_response.source || !_token){
                                return reply.continue;
                            }
                            return reply.response(request.response.source.replace("</head>", `
                                <script>
                                window.__TOKEN = "${_token}";
                                console.info("A new AccessToken '${_token}' was automatically injected into this debug session.");
                                </script>
                                </head>
                            `));
                        }
                    }]
                }
            },
            graphiqlOptions: {
                endpointURL: "/api/graphql",
                passHeader: "'Authorization': window.__TOKEN ? 'JWT ' + window.__TOKEN : ''"
            }
        }
    })*/

    // -- /auth
    /*HapiServer.route({
        method: "POST",
        path: "/auth",
        handler: routeHandler_auth
    })

    // -- /all pages
    HapiServer.route({
        method: "*",
        path: "/{p*}",
        options: {
            log: { collect: true }
        },
        handler: (request, reply) => {
            return reply.response("Not found").code(404);
            //return "Not found";
        }
    })*/

    //#endregion

    return HapiServer;
}


export default createServer;