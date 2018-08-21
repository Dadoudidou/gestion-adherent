import { Options } from "sequelize";
import { ServerOptions } from "hapi";


export const config = {
    secret: "2#^>G.QDm+~][Xa",
    server: {
        host: "localhost",
        port: 9080,
        routes: {
            cors: {
                maxAge: 86400 // 1 jour
            }
        }
    } as ServerOptions,
    connectors: {
        default: {
            type: "mysql",
            host: "localhost",
            port: 3306,
            database: "gestion",
            user: "root",
            password: null,
            options: {
                define: {
                    timestamps: false
                },
                //logging: false
            } as Options
        }
    }
}