require("es6-promise").polyfill();
require("isomorphic-fetch");
import * as deepExtend from "deep-extend";


export class FetchError extends Error {
    type: string = "fetcherror"
    error: string = undefined;
    message: string = undefined;
    statusCode: any = undefined;

    static is(obj: any){
        if(obj == undefined) return false;
        if(!obj.type) return false;
        if(obj.type == "fetcherror") return true;
        return false;
    }

    constructor(error: string, message: string, statusCode: any){
        super(`[${error}] ${message}`);
        this.error = error;
        this.message = message;
        this.statusCode = statusCode;
    }
}

/**
 * Wrap la fonction fetch avec des paramètres de bases
 */
export default (input: RequestInfo, init?: RequestInit): Promise<any> => {

    let _options = deepExtend({}, init);

    return fetch(input, init)
    .then(response => {
        if(response.status >= 200 && response.status < 300){
            return response;
        }

        // -- json
        let contentType = response.headers.get("content-type");
        if(contentType && contentType.indexOf("application/json") !== -1){
            return response
            .json()
            .then(data => {
                let error = new FetchError(data.error, data.message, data.statusCode);
                return new Promise((resolve, reject) => { reject(error); });
            })
        }

        // -- autres erreurs
        let error = new Error(response.statusText || response.status.toString())
        error["response"] = response;
        return new Promise((resolve, reject) => { reject(error); });
    })
}

