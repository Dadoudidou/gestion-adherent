import * as Hapi from "hapi"
import { checkUser, Credentials, login } from "@server/utils/auth";
import * as jwt from "jsonwebtoken"
import { config } from "@server/config"

type AuthBasicValidate = (request: Hapi.Request, username: string, password: string, h: Hapi.ResponseToolkit) => Promise<{
    isValid: boolean
    credentials?: { token: string }
    response?: Hapi.ResponseObject
}>

export default (server: Hapi.Server) => {

    const validate: AuthBasicValidate = async (request, username, password, h) => {
        try {
            // -- check user
            let user = await checkUser(username, password);

            // -- test user permission GraphiQL

            // -- login user
            let _logged = await login(user);

            return {
                isValid: true,
                credentials: {
                    token: _logged.token
                }
            }
        } 
        catch(err) {
            return { isValid: false, credentials: null }
        }
        
        
    }

    server.auth.strategy("auth-basic-graphiql", "basic", { validate });
}