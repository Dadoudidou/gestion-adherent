import { IPlugin } from "@client/__Plugins";
import { loadable } from "@client/System/Loadable";

export const UserSystemPlugin: IPlugin = {
    name: "UserSystem",
    loadRoutes: (parent) => {
        return [
            {
                path: `${parent}/login`,
                component: loadable(() => import("./Routes/Login/index"))
            }
        ];
    }
}