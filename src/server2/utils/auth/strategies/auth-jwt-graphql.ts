import * as Hapi from "hapi"
import { checkUser, Credentials, login, getUserLogged } from "@server/utils/auth";
import * as jwt from "jsonwebtoken"
import { config } from "@server/config"
import { HapiAuthJWTValidate, HapiAuthJWTOptions } from "./../plugins/hapi-auth-jwt"
import { Policy } from "catbox";


export default (server: Hapi.Server) => {

    const validate: HapiAuthJWTValidate = async (request, decoded) => {
        try {

            let cached = await getUserLogged(decoded.id);

            //get cache object
            /*let cache = server.app["cache"] as Policy;
            if(!cache) return { isValid: false, err: new Error("Cache not initialized") }

            let cached = await cache.get(String(decoded.id));
            if(!cached) return { isValid: false, err: new Error("User not connected") }*/

            return {
                isValid: true,
                credentials: cached
            }
        } 
        catch(err) {
            return { isValid: false, credentials: null, err: err }
        }
        
        
    }

    server.auth.strategy("auth-jwt-graphql", "jwt", { 
        validate,
        secret: config.secret,
        verifyOptions: {}
    } as HapiAuthJWTOptions);
}