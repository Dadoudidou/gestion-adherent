import * as winston from "winston";
import * as Hapi from "hapi"

export default winston.format((info, opts) => {
    if(info && info.event){
        let _event = info.event as Hapi.LogEvent;
        info.pid = process.pid;
        info.tags = _event.tags;
        info.data = _event.data;
        info.error = _event.error;
        //if(info.error && info.error.output && info.error.output.payload && info.error.output.payload.message){
            //info.message = info.error.output.payload.message;
        //}
    }
    return info;
})