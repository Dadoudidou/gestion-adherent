import * as winston from "winston";
import HapiEventFormat from "@modules/Logger/Formats/HapiEventFormat";
import HapiRequestFormat from "@modules/Logger/Formats/HapiRequestFormat";
import * as stringify from "json-stringify-safe"

const formatConsole = winston.format.printf(info => {

    let _return = `${info.level}:`;
    
    if(info.label) _return = `[${info.label}] ${_return}`;
    if(info.timestamp) _return = `${info.timestamp} ${_return}`;

    if(info.message){
        if(typeof info.message == "string")
            _return = `${_return} ${info.message}`
    }

    /*if(info.error){
        if(typeof info.error == "string")
            _return = `${_return} ${info.message}`
        else if(typeof info.error == "object"){
            let _keys = []; for(let k in info.error as any) _keys.push(k);
            _return = `${_return}`
        }
    }*/


    let _keys = [];
    for(let k in info) _keys.push(k);

    return _return; // + JSON.stringify(_keys);;
});


export default () => new winston.transports.Console({
    format: winston.format.combine(
        winston.format.colorize(),
        winston.format.timestamp(),
        HapiEventFormat(),
        HapiRequestFormat(),
        formatConsole,
    )
});