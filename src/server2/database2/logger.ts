import logger from "@server/utils/logger";
import consoleTransport from "@server/utils/Logger/transports/consoleTransport";

export const AppDatabaseLogger = logger.createLogger("Server:Database", {
        level: "debug"
    })
    .add(consoleTransport());