import * as Hapi from "hapi"
import { testLogin } from ".";
import { Policy } from "catbox";

export default (server: Hapi.Server) => {

    type basicValidate = (request: Hapi.Request, username: string, password: string, h: Hapi.ResponseToolkit) => Promise<{
        isValid?: boolean
        credentials?: object
        response?: Hapi.ResponseObject
    }>


    const validate: basicValidate = async (request, username, password, h) => {

        let login = await testLogin(username, password);
        if(!login) return {
            isValid: false,
            credentials: null
        }
        if(login.isValid){
            // -- mise en cache et cookie
            let cache = server.app["cache"] as Policy;
            if(cache){
                let sid = login.credentials.sid;
                await cache.set(login.credentials.user.id.toString(), login.credentials, 0);
            }
            
        }
        return {
            isValid: login.isValid,
            credentials: login.credentials
        }
    }

    server.auth.strategy("basic-admin", "basic", { validate });
}