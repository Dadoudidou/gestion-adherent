import {Log} from "./Log"
import { RequestLog } from "./RequestLog"
import * as assign from "object-assign"
import * as Hapi from "hapi"

export class ErrorRequestLog extends RequestLog {

    constructor(request?: Hapi.Request, event?: Hapi.RequestEvent){
        super(request, event);
        this.event = "error";
    }
}