import Fetch from "@client/System/Fetch"
import { Session } from "@client/System/Session";
import apolloStore from "@client/System/Store/apolloStore"
import { authTokenQueryData, authTokenQueryVariables, authTokenQuery } from "@client/__Plugins/UserSystem/Queries/authToken";

const MainSid = "main:user"

const stock_sid = "main:sid";
const stock_user = "user";

export type clientAuth = {
    id: number
    nom: string
    prenom: string
}

export const Login = (user: string, pwd: string): Promise<any> => {

    return Fetch("/auth", {
        method: "post",
        body: JSON.stringify({ user, pwd })
    })
    /*.then(rep => rep.json())
    .then((rep: clientAuth) => {
        if(rep.token){
            setToken(rep.token);
            setClientAuth(rep);
        } else {
            throw new Error("Une erreur est survenue");
        }
        return rep;
    });*/
}

export const logout = () => {
    localStorage.removeItem(stock_sid);
}

export const checkToken = (token: string) => {
    if(!token) return Promise.reject(new Error("Vous n'êtes pas connecté"));
    return apolloStore.query<authTokenQueryData, authTokenQueryVariables>({
        query: authTokenQuery,
        variables: { token }
    })
    .then(rep => {
        setClientAuth(rep.data.authToken)
        return rep.data.authToken;
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

