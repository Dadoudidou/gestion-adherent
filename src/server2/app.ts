import * as Hapi from "hapi"
import * as Inert from "inert"
import { graphiqlHapi, graphqlHapi } from "apollo-server-hapi"
import * as Boom from "boom";
import * as Path from "path"

import * as HapiBasicAuth from "hapi-auth-basic"
import { HapiAuthJWT } from "./utils/auth/plugins/hapi-auth-jwt"
import setGraphiqlStrategy from "./utils/auth/strategies/auth-basic-graphiql"
import setGraphqlStrategy from "./utils/auth/strategies/auth-jwt-graphql"

import { config } from "./config"

import { getSchema } from "./graphql/default"
import routeHandler_auth from "./routes/auth"
import routeHandler_Root from "./routes/root"

let server: Hapi.Server = undefined;

export const getServer = () => server;

async function createServer(){

    // -- création du serveur
    server = new Hapi.Server({ 
        ...config.server,
        debug: {
            request: ['error']
        }
    });

    // -- cache
    const cache = server.cache({ segment: "sessions", expiresIn: 1 * 24 * 60 * 60 * 1000 });
    server.app["cache"] = cache;

    // -- logs
    server.events.on('log', (event, tags) => {
        console.log(event);
    })

    // -- enregistrement de plugins
    await server.register(HapiBasicAuth);       // authentification basic
    await server.register(HapiAuthJWT);         // authentification basic jwt
    await server.register(Inert);               // static files and directory

    // -- enregistrement des stratégies d'authentifications
    setGraphiqlStrategy(server);
    setGraphqlStrategy(server);

    // -- /
    server.route({
        method: "GET",
        path: "/",
        handler: routeHandler_Root
    })

    // -- files
    server.route({
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

    // -- /api/graphql
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
    })

    // -- /auth
    server.route({
        method: "POST",
        path: "/auth",
        handler: routeHandler_auth
    })

    return server;
}


export default createServer;