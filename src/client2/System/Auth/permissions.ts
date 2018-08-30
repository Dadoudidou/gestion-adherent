import { clientAuth } from "@shared/Services/Auth";

export enum PermissionsList {
    "authentification" = 1,
    "users/users/view" = 3,
    "users/permissions/view" = 4,
    "users/permissions/add" = 5,
    "users/permissions/remove" = 6,
    "users/permissions/edit" = 7,
    "users/users/add" = 8,
    "users/users/edit" = 9,
    "users/users/remove" = 10,
    "users/groups/add" = 11,
    "users/groups/edit" = 12,
    "users/groups/remove" = 13,
    "users/groups/view" = 14,
    "system/logs" = 15
}

export const testPermissions = (permissions:number[], user: clientAuth): boolean => {
    if(!user) return false;
    if(!user.user) return false;
    if(!user.user.permissions) return false;
    let _auth = true;
    let i = 0;
    while(_auth == true && i <permissions.length){
        if(user.user.permissions.indexOf(permissions[i]) == -1)
            _auth = false;
        i++;
    }
    return _auth;
}