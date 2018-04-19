import { Request, ResponseToolkit } from "hapi";
import * as jwt from "jsonwebtoken"
import { config } from "@server/config"
import { testLogin, JwtPayload } from "@server/auths"
import * as boom from "boom";
import { Policy } from "catbox";

const handler = async ( request: Request, h: ResponseToolkit ) => {

    // -- paramètres
    let _user = undefined;
    let _pwd = undefined;
    let _token = undefined;

    let _cache = request.server.app["cache"] as Policy;

    // -- récupération des paramètres
    let _post = request.payload as any;
    if(typeof _post == "string"){
        try {
            _post = JSON.parse(_post);
        } catch(err){ }
    }
    _user = (_post && _post.user) ? _post.user : _user;
    _pwd = (_post && _post.pwd) ? _post.pwd : _pwd;
    _token = (_post && _post.token) ? _post.token : _token;


    // -- test token 
    if(_token){
        return jwt.verify(_token, config.secret, undefined, async (err, decoded: JwtPayload) => {
            if(err){
                if(err.name.toLowerCase() == "tokenexpirederror")
                    throw(boom.unauthorized("Token expiré", "Jwt"));
                throw(boom.unauthorized());
            }

            // -- cache ok ?
            if(!decoded.id) throw(boom.badData("Le token fourni n'est pas valide"));
            let _cached = await _cache.get(decoded.id.toString());
            if(!_cached) throw(boom.unauthorized("Session perdue"));

            return {
                sid: _token
            }
        })
    }
    
    if(!_user || !_pwd) throw(boom.badRequest("Le login et le mot de passe sont obligatoires"));

    let _login = await testLogin(_user, _pwd);
    if(!_login) throw(boom.forbidden("Le login ou mot de passe sont incorrects"));
    if(_login.isValid){
        // -- mise en cache
        let _cache = request.server.app["cache"] as Policy;
        await _cache.set(_login.credentials.user.id.toString(), _login.credentials, 0);
        // -- retour
        return {
            sid: _login.credentials.sid
        }
    }

    throw(boom.forbidden("Le login ou mot de passe sont incorrects"));

}

export default handler;