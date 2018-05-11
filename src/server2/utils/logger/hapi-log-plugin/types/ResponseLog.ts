import {Log} from "./Log"
import * as assign from "object-assign"
import * as Hapi from "hapi"

export class ResponseLog extends Log {

    id: string
    method: string
    path: string
    query: any
    payload: any
    responseTime: number
    statusCode: number
    httpVersion: string
    sourceRemoteAddress: string
    sourceUserAgent: any
    sourceReferrer: any
    route: string
    headers: any

    constructor(request?: Hapi.Request){
        super();
        this.event = "response";
        this.id = request.info.id;
        this.method = request.method;
        this.path = request.path;
        this.responseTime = request.info.responded - request.info.received;
        this.statusCode = request.raw.res.statusCode;
        this.httpVersion = request.raw.req.httpVersion;
        this.sourceRemoteAddress = request.info.remoteAddress;
        this.sourceUserAgent = request.raw.req.headers["user-agent"];
        this.sourceReferrer = request.raw.req.headers['referer'];
        this.route = request.route.path;
        this.headers = request.raw.req.headers;
        this.query = request.query || request.payload;
        this.payload = request.payload;
    }
}