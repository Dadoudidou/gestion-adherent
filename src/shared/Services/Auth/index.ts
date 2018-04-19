import Fetch from "@shared/Services/Fetch"

const MainSid = "main:sid"

export const Login = (user: string, pwd: string): Promise<any> => {

    return Fetch("/auth", {
        method: "post",
        body: JSON.stringify({ user, pwd })
    })
    .then(rep => rep.json())
    .then(rep => {
        if(rep.sid){
            localStorage.setItem(MainSid, rep.sid);
        } else {
            throw new Error("Une erreur est survenue");
        }
        return rep;
    });
}

export const logout = () => {

}

export const checkToken = (token: string) => {
    if(!token) return Promise.reject(new Error("Vous n'êtes pas connecté"));
    return Fetch("/auth", {
        method: "post",
        body: JSON.stringify({ token })
    })
    .then(rep => rep.json())
}

export const getToken = () => {
    return localStorage.getItem(MainSid);
}

export const isLoggedIn = () => {
    let _sid = getToken();
    if(_sid) return true;
    return false;
}