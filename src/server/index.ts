import * as Hapi from "hapi"
import { graphiqlHapi, graphqlHapi } from "apollo-server-hapi"
import * as HapiBasicAuth from "hapi-auth-basic"
import * as HapiCookieAuth from "hapi-auth-cookie"
import { HapiAuthJWT } from "./auths/hapiAuthJwtPlugin"
import * as Boom from "boom";

import { config } from "./config"
import BasicAdmin from "./auths/BasicAdmin"
import authCookieSession from "./auths/CookieSession";

import handler_login from "./routes/login"
import { schema, GraphQlContext } from "./routes/api/graphql"
import { test } from "./routes/api/graphql/utils/GraphQLSchema/graphqlObject"

// -- database
import { dbcontext } from "./datas"
import { getLogger } from "./services/Logger";
dbcontext.start();


async function webserver() {
    const server = new Hapi.Server({ ...config.server });

    // -- cache
    const cache = server.cache({ segment: "sessions", expiresIn: 1 * 24 * 60 * 60 * 1000 });
    server.app["cache"] = cache;


    // -- auths
    await server.register(HapiBasicAuth as any);
    await server.register(HapiAuthJWT);
    //await server.register(HapiCookieAuth);
    BasicAdmin(server);
    authCookieSession(server);

    //#region ROUTES

    // -- /
    server.route({
        method: "GET",
        path: "/",
        handler: (request, reply) => {
            return test();
        }
    })

    // -- /api/graphql
    await server.register({
        plugin: graphqlHapi as any,
        options: {
            path: "/api/graphql",
            route: {
                auth: "session",
            },
            graphqlOptions: (request: Hapi.Request) => {
                return {
                    schema: schema,
                    context: {
                        auth: request.auth,
                        request: request,
                        credentials: request.auth.credentials
                    } as GraphQlContext,
                    formatError: err => {
                        //console.debug(err);
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
                auth: "basic-admin",
                ext: {
                    onPreResponse: [{
                        method: async (request, reply: Hapi.ResponseToolkit) => {
                            let _response = request.response;
                            let _token = (request.auth && request.auth.credentials) ? request.auth.credentials.sid : undefined;

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

    // -- /login
    server.route({
        method: "GET",
        path: "/login",
        handler: handler_login
    })

    //#endregion

    await server.start();
    return server;
    
}


webserver()
    .then((server) => {
        //console.log(`Serveur démarré à l'url : ${server.info.uri}`);
        //getLogger().info(`Serveur démarré à l'url : ${server.info.uri}`);
    })
    .catch((err) => {
        
        //process.exit(1);
    });;