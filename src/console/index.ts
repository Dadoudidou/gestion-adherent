import database2 from "../server2/database2/index";
import { config } from "@server/config"
import { inspect } from "util"
import { exitOnError } from "../../node_modules/winston";

//import { getSchema } from "./../server2/graphql/default"
//console.log(getSchema());

const app = async () => {
    database2.setup({
        database: config.connectors.default.database,
        username: config.connectors.default.user,
        password: config.connectors.default.password,
        dialect: config.connectors.default.type,
        port: config.connectors.default.port,
        host: config.connectors.default.host,
        protocol: "tcp",
        ...config.connectors.default.options,
        logging: console.log
    });

    
    await database2.start();
    let activite = await database2.model("activiteSection").find({ where: { id:2 } });
    
    let test = await activite.getSessions()

    let essai = database2.model("activite")

    for(let key in activite){
        console.log(key, typeof activite[key]);
    }

}

app();