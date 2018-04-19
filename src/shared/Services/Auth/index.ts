import Fetch from "@shared/Services/Fetch"

export const Login = (user: string, pwd: string): Promise<any> => {

    return Fetch("/auth", {
        method: "post",
        body: JSON.stringify({ user, pwd })
    })
    .then(rep => rep.json());
    //stockage token
}

export const logout = () => {

}

export const requireAuth = () => {

}

export const getToken = () => {

}

export const isLoggedIn = () => {

}