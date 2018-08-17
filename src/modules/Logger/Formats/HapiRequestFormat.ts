import * as winston from "winston";
import * as Hapi from "hapi"

export default winston.format((info, opts) => {
    
    if(info && info.request){
        let _request = info.request as Hapi.Request;
        info.reqMethod = _request.method;
        info.reqPath = _request.path;
        info.reqUrl = _request.url;
    }
    if(info && info.message && info.message["request"]){
        let _request = info.message["request"] as Hapi.Request;
        info.reqMethod = _request.method;
        info.reqPath = _request.path;
        info.reqUrl = _request.url;
    }
    return info;
})