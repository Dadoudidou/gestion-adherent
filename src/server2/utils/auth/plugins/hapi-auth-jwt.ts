import * as Hapi from "hapi"
import * as jwt from "jsonwebtoken"
import * as Boom from "boom";

export type HapiAuthJWTOptions = {
    secret: string
    verifyOptions?: jwt.VerifyOptions
    //authorize: (request: Hapi.Request, payload: any, callback: ((err, isValid, credentials) => void)) => void
    validate: HapiAuthJWTValidate
}

export type HapiAuthJWTValidate = (request: Hapi.Request, payload: any) => Promise<{
    err?: any
    isValid: boolean
    credentials?: any
}>

export const HapiAuthJWT: Hapi.Plugin<HapiAuthJWTOptions> = {
    name: "hapi-auth-jwt",
    register: async (server, options) => {
        server.auth.scheme("jwt", internals.implementation);
    }
}

const internals = {
    implementation: (server: Hapi.Server, options: HapiAuthJWTOptions): Hapi.ServerAuthSchemeObject => {
        return {
            authenticate:async (request, h) => {
                const req = request.raw.req;

                // -- vérification authorization
                const authorization = req.headers.authorization as string;
                if(!authorization){
                    throw Boom.unauthorized(undefined, "Jwt");
                }

                const parts = authorization.split(/\s+/);
                if(parts[0].toLowerCase() !== "jwt"){
                    throw Boom.unauthorized(undefined, "Jwt");
                }

                if(parts.length !== 2){
                    throw (Boom.badRequest('Bad HTTP authentication header format', 'Jwt'));
                }


                // -- vérification token
                let _token = parts[1];
                let _tokenDecoded = undefined;

                try {
                    let decoded = jwt.verify(_token, options.secret, options.verifyOptions);
                    let _result = await options.validate(request, decoded);
                    if(_result.err){
                        throw(Boom.internal(_result.err, { credentials: _result.credentials }));
                    }

                    if(!_result.isValid){
                        throw(Boom.unauthorized('Bad authentification', "Jwt"));
                    }

                    if(!_result.credentials){
                        throw(Boom.badImplementation("Bad credential object"));
                    }

                    return h.authenticated({ credentials: _result.credentials });
                } catch(err) {

                    if(err.name.toLowerCase() == "tokenexpirederror"){
                        throw(Boom.unauthorized("Token expired", "Jwt"))
                    }

                    if(err.name.toLowerCase() == "jsonwebtokenerror"){
                        throw(Boom.unauthorized(err.message, "Jwt"));
                    }

                    throw(Boom.unauthorized(err.message, "Jwt"));
                }
            }
        }
    }
}