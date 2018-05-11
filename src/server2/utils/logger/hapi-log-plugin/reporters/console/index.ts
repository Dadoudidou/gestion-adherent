import { ILogReporter } from "./../../index";
import * as Moment from "moment"

import { RequestLog } from "./../../types/RequestLog";
import { ErrorRequestLog } from "./../../types/ErrorRequestLog";
import { Log } from "./../../types/Log";
import { ResponseLog } from "./../../types/ResponseLog";

export type ReporterConsoleOptions = {
    timestampFormat: string
    utc: boolean,
    color: boolean
}

type OutputLog = {
    timestamp?: number
    tags?: string[]
    id?: string
    data?: string
}

export class ReporterConsole implements ILogReporter {

    static defaultOptions: ReporterConsoleOptions = {
        color: true,
        utc: true,
        timestampFormat: "YYYYMMDD/HHmmss.SSS"
    }

    private _options: ReporterConsoleOptions = undefined;

    constructor(options?: Partial<ReporterConsoleOptions>){
        this._options = {
            ...ReporterConsole.defaultOptions,
            ...options
        }
    }

    private _formatTimestamp = (event: OutputLog) => {
        let _timestamp = Moment(event.timestamp);
        if(this._options.utc) _timestamp = _timestamp.utc();
        return _timestamp.format(this._options.timestampFormat);
    }

    private _formatTags = (event: OutputLog) => {
        if(!event.tags) return "";
        if(event.tags.length == 0) return "";
        return ` [${event.tags.join(",")}] `;
    }

    private _formatOutput = (event: OutputLog) => {
        let _timestamp = this._formatTimestamp(event);
        let _tags = this._formatTags(event);
        let _id = event.id ? ` ${event.id} ` : ""

        return `${_timestamp},${_id}${_tags} ${event.data}`;
    }

    private _formatRequest = (event: RequestLog): OutputLog => {
        let _tags = ["request"];
        if(event.tags) _tags = [..._tags, ...event.tags];
        return {
            tags: _tags,
            timestamp: event.timestamp,
            data: "request"
        }
    }
    
    private _formatError = (event: ErrorRequestLog): OutputLog => {
        let _tags = ["error"];
        if(event.tags) _tags = [..._tags, ...event.tags];
        let _output = `message: ${event.error["message"]}, stack: ${event.error['stack']}`;
        return {
            tags: _tags,
            timestamp: event.timestamp,
            id: event.id,
            data: _output
        }
    }

    private _formatMethod = (method: string ) => {
        const methodColors = {
            get: 32,
            delete: 31,
            put: 36,
            post: 33
        };
        let formattedMethod = method.toLowerCase();
        if (this._options.color) {
            const color = methodColors[method.toLowerCase()] || 34;
            formattedMethod = `\x1b[1;${color}m${formattedMethod}\x1b[0m`;
        }

        return formattedMethod;
    }

    private _formatStatusCode = (statusCode: number) => {

        let color;
        if (statusCode && this._options.color) {
            color = 32;
            if (statusCode >= 500) {
                color = 31;
            }
            else if (statusCode >= 400) {
                color = 33;
            }
            else if (statusCode >= 300) {
                color = 36;
            }

            return `\x1b[${color}m${statusCode}\x1b[0m`;
        }

        return statusCode;
    }

    private _formatResponse = (event: ResponseLog): OutputLog => {

        let _method = this._formatMethod(event.method);
        let _statusCode = this._formatStatusCode(event.statusCode);
        let _query = event.query ? JSON.stringify(event.query) : "";
        let _post = event.payload && typeof(event.payload) == "string" ? event.payload : JSON.stringify(event.payload);
        let _tags = ["response"];
        if(event.tags) _tags = [..._tags, ...event.tags];

        let _output = `${_method} ${event.path} ${_query} ${_statusCode} (${event.responseTime}ms)`;
        return {
            tags: _tags,
            timestamp: event.timestamp,
            id: event.sourceRemoteAddress,
            data: _output
        }
    }

    private _formatLog = (event: Log): OutputLog => {
        return {
            data: typeof(event.data) == "string" ? event.data : JSON.stringify(event.data),
            tags: event.tags,
            timestamp: event.timestamp
        }
    }

    execute = (log: Log) => {
        let _res: OutputLog = undefined;
        if(log instanceof RequestLog){
            _res = this._formatRequest(log);
        } else if(log instanceof ErrorRequestLog){
            _res = this._formatError(log);
        } else if(log instanceof ResponseLog){
            _res = this._formatResponse(log);
        } else {
            _res = this._formatLog(log);
        }
        console.log(this._formatOutput(_res));
    }

}