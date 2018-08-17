import * as Hapi from "hapi"
import { RequestLog } from "./types/RequestLog";
import { ErrorRequestLog } from "./types/ErrorRequestLog";
import { Log } from "./types/Log";
import { ResponseLog } from "./types/ResponseLog";


export interface ILogReporter {
    execute(data);
}

export type HapiLoggerOptions = {
    reporters: {
        filter?: (event: Log) => boolean
        reporter: ILogReporter
    }[]
}

export class HapiLogger {
    _options: HapiLoggerOptions = undefined;
    constructor(options: HapiLoggerOptions){
        this._options = options;
    }

    requestLogHandler = (request: Hapi.Request, event: Hapi.RequestEvent) => {
        let _log = new RequestLog(request, event);
        this.sendToReporters(_log);
    }
    logHandler = (event: Hapi.LogEvent) => {
        let _log = new Log(event);
        this.sendToReporters(_log);
    }
    errorHandler = (request: Hapi.Request, error: Hapi.RequestEvent) => {
        let _log = new ErrorRequestLog(request, error);
        this.sendToReporters(_log);
    }
    responseHandler = (request: Hapi.Request) => {
        let _log = new ResponseLog(request);
        this.sendToReporters(_log);
    }
    sendToReporters = (log: Log) => {
        this._options.reporters.forEach(report => {
            if(report.filter){
                if(!report.filter(log)) return;
            }
            report.reporter.execute(log);
        })
    }
}

export default {
    name: "hapi-log",
    register: async (server, options) => {
        let _logger = new HapiLogger(options);
        server.events.on("log", _logger.logHandler);
        server.events.on({ name: "request", channels: ["error"] }, _logger.errorHandler);
        server.events.on("response", _logger.responseHandler);
        server.events.on({ name: "request", channels:["app"] }, _logger.requestLogHandler);
    }
} as Hapi.Plugin<HapiLoggerOptions>


