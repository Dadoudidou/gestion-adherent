import {Log} from "./Log"
import * as assign from "object-assign"
import * as Hapi from "hapi"
import { Url } from "url";

export class RequestLog extends Log {

    id: any
    method: string
    path: string
    url: Url

    constructor(request?: Hapi.Request, event?: Hapi.RequestEvent){
        super(event);
        this.event = "request";
        if(request){
            this.id = request.info.id;
            this.method = request.method;
            this.path = request.path;
            this.url = request.url;
        }
    }
}