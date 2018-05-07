import { Request, ResponseToolkit } from "hapi";
import { readUserToken, getUserLogged, checkUser, login } from "@server/utils/auth";
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
        let _decoded = await readUserToken(_token);
        let _user = await getUserLogged(_decoded.id);
        return _user;
    }

    if(!_user || !_pwd) throw(boom.badRequest("Le login et le mot de passe sont obligatoires"));

    // -- test user
    let _userDb = await checkUser(_user, _pwd);
    // -- connection user
    let _login = await login(_userDb);
    return _login;
}

export default handler;