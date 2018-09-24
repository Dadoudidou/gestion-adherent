import { dbcontext } from "@server/database";

import * as jwt from "jsonwebtoken"
import { config } from "@server/config"

import { Policy } from "catbox";

import * as Boom from "boom";
import { sharedCheckPermissions } from "@shared/permissions";
import database2 from "@server/database2";
import { UserInstance, CheckPassword } from "@server/database2/Models/user";
import { asyncForEach } from "@server/utils/array";


export type Credentials = {
    token: string
    permissions: {id: number, nom: string}[]
    user: UserInstance
}

export type checkUserResponse = {
    id: number,
    nom: string,
    prenom: string,
    login: string,
    permissions: { id: number, nom: string }[]
}

type JwtData = {
    id: number
}


/** Test des entrées utilisateurs */
const TestUsernamePassword = async function(username: string, password: string) {
    if(!username || !password){
        throw Boom.badRequest("username and password must not empty");
    }
    if(username.trim() == "" || password.trim() == "") {
        throw Boom.badRequest("username and password must not empty");
    }
    return ({ username, password })
}

/** Vérification de l'existence en base de donnée */
const checkDatabaseUser = async (username: string, password: string) => {
    let _user = await database2.model("user").find({ where: { login: username }});
    //let _user = await dbcontext.models.users.find({ where: { login: username }});
    if(!_user) throw Boom.forbidden("username or password are invalid");
    let _passwordChecked = await CheckPassword(password, _user.pwd);
    if(!_passwordChecked) throw Boom.forbidden("username or password are invalid");
    return _user;
}

const checkDatabaseUserId = async (id: number) => {
    let _user = await database2.model("user").find({ where: { id: id }});
    if(!_user) throw Boom.forbidden("username or password are invalid");
    return _user;
}

/** Récupération des droits */
const getPermissions = async (user: UserInstance) => {
    let _permissions: { id: number, nom: string }[] = [];
    let _groups = await user.getGroups();
    await asyncForEach(_groups, async (group) => {
        let permissions = await group.getPermissions();
        if(!permissions) return;
        permissions.forEach(permission => {
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
export const login = async (username: string, password: string) : Promise<Credentials> => {

    // -- test des paramètres
    let _args = await TestUsernamePassword(username, password);
    // -- test bdd
    let _user = await checkDatabaseUser(_args.username, _args.password);
    // -- get permissions
    let _permissions = await getPermissions(_user);

    // -- génération d'un token
    let _token = jwt.sign(
        { id: _user.id } as JwtData, 
        config.secret, 
        { expiresIn: 1 * 24 * 60 * 60 * 1000 }
    );
    
    return {
        token: _token,
        permissions: _permissions,
        user: _user
    };
}

/** Test les permissions d'accès d'un utilisateur */
export const checkPermissions = (permissions:number[], credential: Credentials): boolean => {
    if(!credential) return false;
    if(!credential.permissions) return false;
    return sharedCheckPermissions(permissions, credential.permissions.map(x => x.id));
}

/** Lit un token */
export const readUserToken = (token: string) : JwtData => {
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

export const getUserInfos = async (token: string): Promise<Credentials> => {

    let _info = readUserToken(token);

    // -- récupération des informations
    let _user = await checkDatabaseUserId(_info.id);
    // -- get permissions
    let _permissions = await getPermissions(_user);

    return {
        token: token,
        permissions: _permissions,
        user: _user
    }
}