import * as Express from "express"
import { ApolloServer } from "apollo-server-express"
import * as morgan from "morgan"
import * as moment from "moment"
import { config } from "./config"
import routeHandler_auth from "./routes/auth"
import routeHandler_Root from "./routes/root"
import * as jwt from "express-jwt"

// -- graphql config
import ApiGraphQL, { GraphQLContext } from "./graphql/V1";
ApiGraphQL.setup();

// -- database config
import database2 from "@server/database2";
import Logger from "@modules/Logger";
import consoleTransport from "@modules/Logger/Transports/consoleTransport";
import { getUserInfos } from "@server/utils/auth";
import { nextTick } from "async";

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

// -- config moment
moment.locale("fr");


async function createServer(){

    // -- express Server
    const app = Express();

    // -- configuration
    app.set("port", config.server.port);

    // -- logger
    let _loggerExpress = Logger.createLogger("Server:Express", { level: "debug", exitOnError: false })
        .add(consoleTransport({ handleExceptions: true }));
    let _loggerGraphql = Logger.createLogger("Server:GraphQL", { level: "debug", exitOnError: false })
        .add(consoleTransport({ handleExceptions: true }));

    // -- log request
    app.use(morgan("dev", { stream: { write: (message, encoding) => {
        if(typeof message == "string") message = message.replace("\n", "");
        _loggerExpress.info(message);
    }}}));

    // -- auth jwt
    app.use(async (req, res, next) => {
        // -- recherche de auth jwt
        if(req.headers.authorization && req.headers.authorization.split(' ')[0].toUpperCase() == 'JWT'){
            let _token = req.headers.authorization.split(' ')[1];
            let credential = await getUserInfos(_token);
            req.user = credential;
        }
        next();
    });

    // -- routes /
    app.get("/", routeHandler_Root);

    // -- apollo server
    const graphQlServer = new ApolloServer({
        schema: ApiGraphQL.setup().getSchema(),
        context: async (request) => {
            let _request = request as Express.Request
            return {
                request: _request,
                credentials: _request.user,
                db: database2,
                logger: _loggerGraphql
            } as GraphQLContext
        },
        formatError: error => {
            _loggerGraphql.error(error);
            return error;
        },
        debug: true,
        uploads: true,
        tracing: false
    });
    graphQlServer.applyMiddleware({
        app: app,
        path: "/api_v1/graphql",
    })

    // -- log error
    app.use((err, req, res, next) => {
        _loggerExpress.error(`${err.status || 500} - ${err.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
    });

    // -- static files
    app.use("/static", Express.static("build/static"));


    

    

    


    // -- ecoute du port
    app.listen(app.get("port"));

    return app;
}


export default createServer;