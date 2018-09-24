import Logger from "@modules/Logger";
import ConsoleTransport from "@modules/Logger/Transports/ConsoleTransport";


export const AppDatabaseLogger = Logger.createLogger("Server:Database", {
        level: "debug"
    })
    .add(ConsoleTransport());