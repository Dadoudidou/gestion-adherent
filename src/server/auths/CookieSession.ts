import * as Hapi from "hapi"
import { Policy } from "catbox";
import { config } from "config";


export default (server: Hapi.Server) => {

    server.auth.strategy("session", "jwt", { 
        secret: config.secret,
        verifyOptions: {},
        authorize: async (request: Hapi.Request, payload: any, callback: ((err, isValid, credentials) => void)) => {
            let out = { err: undefined, isValid: false, credentials: null };

            // -- cache object
            let cache = server.app["cache"] as Policy;
            if(!cache) return callback(out.err, out.isValid, out.credentials);

            let sid = payload && payload.sid;

            let cached = await cache.get(sid, () => {});
            console.log("cached", cached);
            if(!cached) return callback(out.err, out.isValid, out.credentials);

            callback(undefined, true, cached);
        },
        validate: async (request: Hapi.Request, payload: any) => {
            let out = { err: undefined, isValid: false, credentials: null };

            // -- cache object
            let cache = server.app["cache"] as Policy;
            if(!cache) return out;

            let sid = payload && payload.id;
            let cached = await cache.get(String(sid), () => {});
            if(!cached) return out;

            out.isValid = true;
            out.credentials = cached;
            return out;
        }
     });

}