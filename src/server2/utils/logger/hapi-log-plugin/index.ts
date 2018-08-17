import * as Hapi from "hapi"
import Logger from "@modules/Logger";
import consoleTransport from "@server/utils/Logger/transports/consoleTransport";
import HapiEventFormat from "@modules/Logger/Formats/HapiEventFormat";

const HapiLog = Logger.createLogger("App:Server:Log").add(consoleTransport());
const HapiRequestLog = Logger.createLogger("App:Server:Request").add(consoleTransport());
const HapiRequestErrorLog = Logger.createLogger("App:Server:RequestError").add(consoleTransport());
const HapiResponseLog = Logger.createLogger("App:Server:Response").add(consoleTransport());

const requestLogHandler = (request: Hapi.Request, event: Hapi.RequestEvent) => {
    let _message = `[${request.method}] ${request.path}`
    HapiRequestLog.info(_message, { request, event });
}
const logHandler = (event: Hapi.LogEvent) => {
    HapiLog.info(event.data as any, { event });
}
const errorHandler = (request: Hapi.Request, event: Hapi.RequestEvent) => {
    let _error = event.error as any
    let _stacktrace = _error["stack"];
    let _message: string = _error.output.payload.message;
    if(_stacktrace)  _message = _stacktrace.split("\n")[0];
    HapiRequestErrorLog.error(_stacktrace, { request, event, stacktrace: _stacktrace });
}
const responseHandler = (request: Hapi.Request) => {
    let _message = `[${request.method}] [${request.response["statusCode"]}] ${request.path}`
    HapiResponseLog.info(_message, { request });
}

const routeHandler = (route: Hapi.RequestRoute) => {
    HapiLog.info(`Route added: [${route.method}] ${route.path}`);
}

export default {
    name: "hapi-log",
    register: async (server, options) => {
        server.events.on({ name: "log" }, logHandler);
        server.events.on({ name: "request", channels: ["error"] }, errorHandler);
        server.events.on({ name: "response" }, responseHandler);
        server.events.on({ name: "request", channels:["app"] }, requestLogHandler);
        server.ext('onPreResponse', (request: Hapi.Request) => {
            const { response } = request;
            
            /*if(response && response["isBoom"] && response["isServer"]){
                console.log(response["stack"] )
                //HapiRequestErrorLog.error(response["toString"](), { stacktrace:  });
            }*/
            return response;
        });
    }
}


