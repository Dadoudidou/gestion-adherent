import * as jwt from "jsonwebtoken"
import { config } from "./../config"
import { dbcontext } from "datas";
import { CheckPassword } from "datas/entities/users/user";
import { PermissionType } from "datas/entities/users/permission";

export type Credentials = {
    sid: string
    user: {
        id: number,
        nom: string,
        prenom: string,
        login: string,
        permissions: number[]
    }
}

type testLoginOut = {
    isValid: boolean
    credentials: Credentials
    err?: string
}

export const testLogin = (username: string, password: string): Promise<testLoginOut> => {

    return new Promise((resolve, reject) => {
        if(!username || !password){
            return reject(new Error("username and password must not empty" ));
        }
        if(username.trim() == "" || password.trim() == "") {
            return reject(new Error("username and password must not empty"));
        }
        resolve({ username, password });
    })
    .then(obj => {
        /*return {
            isValid: true,
            credentials: {
                sid: jwt.sign({ id:1 }, config.secret, { expiresIn: 1 * 24 * 60 * 60 * 1000 }),
                id: 1,
            }
        }*/
        
        return dbcontext.models.users
            .find({ where: { login: username } })
            .then(user => {
                if(!user) throw new Error("username or password are invalid");
                return CheckPassword(password, user.pwd)
                    .then(success => {
                        if(!success) throw new Error("username or password are invalid");
                        return user;
                    })
            })
            .then(user => {
                // -- get permissions
                let _permissions = [];
                user.getGroups({ include: [ { model:dbcontext.models.permissions, as:"permissions"} ] })
                .then(groups => {
                    groups.forEach(group => {
                        if(!group["permissions"]) return;
                        group["permissions"].forEach((permission: PermissionType) => {
                            let _index = _permissions.indexOf(permission.id);
                            if(_index == -1) _permissions.push(permission.id);
                        })
                    })
                })

                return {
                    isValid: true,
                    credentials: {
                        sid: jwt.sign({ id: user.id }, config.secret, { expiresIn: 1 * 24 * 60 * 60 * 1000 }),
                        user: {
                            id: user.id,
                            nom: user.nom,
                            prenom: user.prenom,
                            login: user.login,
                            permissions: _permissions
                        }
                    } as Credentials
                }
            })
    })
    .catch((err: Error) => {
        return {
            isValid: false,
            credentials: null,
            err: err.message
        }
    })
    
}

/**
 * Test les droits d'un utilisateur
 * @param permissions tableau de droits devant apparaître chez l'utilisateur
 * @param credential 
 */
export const testPermissions = (permissions:number[], credential: Credentials) => {
    if(!credential) return false;
    if(!credential.user) return false;
    if(!credential.user.permissions) return false;
    let _auth = true;
    let i = 0;
    while(_auth == true && i <permissions.length){
        if(credential.user.permissions.indexOf(permissions[i]) == -1)
            _auth = false;
        i++;
    }
    return _auth;
}