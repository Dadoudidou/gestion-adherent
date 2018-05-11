export enum PERMISSIONS {
    AUTHENTICATED       = 1,
    USER_SHOW           = 10,
    USER_CREATE         = 11,
    USER_EDIT           = 12,
    USER_REMOVE         = 13,
    GROUP_SHOW          = 20,
    GROUP_CREATE        = 21,
    GROUP_EDIT          = 22,
    GROUP_REMOVE        = 23,
    SYSTEM_SUPERUSER    = 90,
    SYSTEM_LOG          = 91
}


export const sharedCheckPermissions = (permissions: number[], user_permissions: number[]): boolean => {
    let _auth = true;
    let i = 0;

    // -- si droits super utilisateur
    if(user_permissions.indexOf(PERMISSIONS.SYSTEM_SUPERUSER) > -1) return true;

    // -- test de tous les droits
    while(_auth == true && i <permissions.length){
        if(user_permissions.indexOf(permissions[i]) == -1)
            _auth = false;
        i++;
    }
    return _auth;
}