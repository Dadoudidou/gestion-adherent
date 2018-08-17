import database2 from "../server2/database2/index";
import { config } from "@server/config"
import { inspect } from "util"
import { exitOnError } from "../../node_modules/winston";
import { GraphQLSingleton } from "@server/graphql/V1";
import logger from "@server/utils/logger";
import consoleTransport from "@server/utils/Logger/transports/consoleTransport";

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
        //...config.connectors.default.options,
        //logging: console.log
    });
    
    let model = await database2.model("comptabiliteFacture").count();
    

    process.exit();
}

app();