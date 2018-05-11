import { dbcontext } from "@server/database";

import * as jwt from "jsonwebtoken"
import { config } from "@server/config"
import { getServer } from "@server/app"

import { CheckPassword, UserType } from "@server/database/entities/users/user";
import { PermissionType } from "@server/database/entities/users/permission";
import { Policy } from "catbox";

import * as Boom from "boom";
import { sharedCheckPermissions } from "@shared/permissions";


const TestUsernamePassword = async function(username: string, password: string) {
    if(!username || !password){
        throw Boom.badRequest("username and password must not empty");
    }
    if(username.trim() == "" || password.trim() == "") {
        throw Boom.badRequest("username and password must not empty");
    }
    return ({ username, password })
}

const checkDatabaseUser = async (username: string, password: string) => {
    let _user = await dbcontext.models.users.find({ where: { login: username }});
    if(!_user) throw Boom.forbidden("username or password are invalid");
    let _passwordChecked = await CheckPassword(password, _user.pwd);
    if(!_passwordChecked) throw Boom.forbidden("username or password are invalid");
    return _user;
}

const getPermissions = async (user: UserType) => {
    let _permissions: { id: number, nom: string }[] = [];
    let _groups = await user.getGroups({ include: [ { model:dbcontext.models.permissions, as:"permissions"} ] });
    _groups.forEach(group => {
        if(!group["permissions"]) return;
        group["permissions"].forEach((permission: PermissionType) => {
            let _index = _permissions.map(x => x.id).indexOf(permission.id);
            if(_index == -1) {
                _permissions.push({ 
                    id: permission.id,
                    nom: permission.nom.toLowerCase()
                });
            }
        })
    })
    return _permissions;
}


export type Credentials = {
    sid: string
    user: {
        id: number,
        nom: string,
        prenom: string,
        login: string,
        permissions: { id: number, nom: string }[]
    }
}

export type cacheUser = {
    token: string
    user: checkUserResponse
}

export type checkUserResponse = {
    id: number,
    nom: string,
    prenom: string,
    login: string,
    permissions: { id: number, nom: string }[]
}

/** Test la présence d'un utilisateur */
export const checkUser = async (username: string, password: string) => {
    let _args = await TestUsernamePassword(username, password);
    let _user = await checkDatabaseUser(_args.username, _args.password);
    let _permissions = await getPermissions(_user);

    return {
        id: _user.id,
        login: _user.login,
        nom: _user.nom,
        prenom: _user.prenom,
        permissions: _permissions
    } as checkUserResponse
}

/** Connecte un utilisateur */
export const login = async (user: checkUserResponse) => {

    // -- génération d'un token
    let _token = jwt.sign({ id: user.id }, config.secret, { expiresIn: 1 * 24 * 60 * 60 * 1000 });

    // -- objet en cache
    let _cacheObj: cacheUser = {
        token: _token,
        user
    };

    // -- mise en cache
    let _server = getServer();
    if(!_server) throw new Error("No server initied");
    let cache = _server.app["cache"] as Policy;
    if(cache){
        await cache.set(user.id.toString(), _cacheObj, 0);
    }

    return _cacheObj;
}

/** Test les permissions d'accès d'un utilisateur */
export const checkPermissions = (permissions:number[], user: cacheUser): boolean => {
    if(!user) return false;
    if(!user.user) return false;
    if(!user.user.permissions) return false;
    return sharedCheckPermissions(permissions, user.user.permissions.map(x => x.id));
}

export const readUserToken = async (token: string) => {
    try {
        let decoded = jwt.verify(token, config.secret) as any;
        return decoded;
    } catch(err){
        if(err.name.toLowerCase() == "tokenexpirederror"){
            throw(Boom.unauthorized("Token expired", "Jwt"))
        }

        if(err.name.toLowerCase() == "jsonwebtokenerror"){
            throw(Boom.unauthorized(err.message, "Jwt"));
        }

        throw(Boom.unauthorized(err.message, "Jwt"));
    }
    
}

export const getUserLogged = async (userId: string | number) => {
    let _server = getServer();
    if(!_server) throw new Error("Server not initialized");

    //get cache object
    let cache = _server.app["cache"] as Policy;
    if(!cache) throw new Error("Cache not initialized");

    let cached = await cache.get(String(userId)) as any;
    if(!cached) throw new Error("User not connected");

    return cached as cacheUser;
}