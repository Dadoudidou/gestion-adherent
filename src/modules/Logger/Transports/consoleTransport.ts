import * as winston from "winston";

const formatConsole = winston.format.printf(info => {

    let _return = `${info.level}:`;
    
    if(info.label) _return = `[${info.label}] ${_return}`;
    if(info.timestamp) _return = `${info.timestamp} ${_return}`;

    if(info.message){
        if(typeof info.message == "string")
            _return = `${_return} ${info.message}`
    }


    let _keys = [];
    for(let k in info) _keys.push(k);

    return _return; // + JSON.stringify(_keys);;
});


export default (options?: winston.transports.ConsoleTransportOptions) => new winston.transports.Console({
    ...options,
    format: winston.format.combine(
        winston.format.colorize(),
        winston.format.timestamp(),
        formatConsole,
    )
});