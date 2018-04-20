import Fetch from "@shared/Services/Fetch"
import { Session } from "@shared/Services/Session";

const MainSid = "main:user"

const stock_sid = "main:sid";
const stock_user = "user";

export type clientAuth = {
    sid: string
    user: {
        id: number
        login: string
        nom: string
        prenom: string
        permissions: number[]
    }
}

export const Login = (user: string, pwd: string): Promise<any> => {

    return Fetch("/auth", {
        method: "post",
        body: JSON.stringify({ user, pwd })
    })
    .then(rep => rep.json())
    .then((rep: clientAuth) => {
        if(rep.sid){
            setToken(rep.sid);
            setClientAuth(rep);
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
    .then((rep: clientAuth) => {
        setToken(rep.sid);
        setClientAuth(rep);
        return rep;
    })
}


export const setClientAuth = (client: clientAuth) => {
    Session.set(stock_user, client);
}

export const getClientAuth = () => {
    return Session.get(stock_user);
}

export const setToken = (token: string) => {
    localStorage.setItem(stock_sid, token);
}

export const getToken = () => {
    return localStorage.getItem(stock_sid);
}

