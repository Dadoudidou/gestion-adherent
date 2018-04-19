import { Request, ResponseToolkit } from "hapi";
import * as jwt from "jsonwebtoken"
import { config } from "@server/config"
import { testLogin } from "@server/auths"
import * as boom from "boom";

const handler = async ( request: Request, h: ResponseToolkit ) => {

    // -- paramètres
    let _user = undefined;
    let _pwd = undefined;
    let _token = undefined;

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
        jwt.verify(_token, config.secret, undefined, (err, decoded: any) => {
            if(err){
                if(err.name.toLowerCase() == "tokenexpirederror")
                    throw(boom.unauthorized("Token expiré", "Jwt"));
                throw(boom.unauthorized());
            }
            if(!decoded.user) throw(boom.unauthorized);
            if(!decoded.user.id) throw(boom.unauthorized());
            /*return authModelUser({ id: decoded.user.id }, (obj, user) => {
                return reply(obj);
            });*/
        })
    }
    
    if(!_user || !_pwd) throw(boom.badRequest("Le login et le mot de passe sont obligatoires"));

    let _login = await testLogin(_user, _pwd);
    if(!_login) throw(boom.forbidden("Le login ou mot de passe sont incorrects"));
    if(_login.isValid){
        return {
            connected: true
        }
    }

    throw(boom.forbidden("Le login ou mot de passe sont incorrects"));

}

export default handler;