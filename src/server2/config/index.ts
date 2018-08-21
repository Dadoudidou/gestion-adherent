import { Options } from "sequelize";
import { ServerOptions } from "hapi";

// -- import du fichier .env
import * as DotEnv from "dotenv"
DotEnv.config();


export const config = {
    secret: process.env.APP_SECRET as any,
    server: {
        host: process.env.APP_SERVER_HOST as any,
        port: process.env.APP_SERVER_PORT as any,
        routes: {
            cors: {
                maxAge: 86400 // 1 jour
            }
        }
    } as ServerOptions,
    connectors: {
        default: {
            type: "mysql",
            host: process.env.APP_DB_HOST as any,
            port: process.env.APP_DB_PORT as any,
            database: process.env.APP_DB_DATABASE as any,
            user: process.env.APP_DB_USER as any,
            password: process.env.APP_DB_PASSWORD as any,
            options: {
                define: {
                    timestamps: false
                },
                //logging: false
            } as Options
        }
    }
}