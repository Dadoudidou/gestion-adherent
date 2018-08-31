import { IPlugin } from "@client/__Plugins";
import { loadable } from "@client/System/Loadable";

export const AdminPlugin: IPlugin = {
    name: "AdminPlugin",
    loadRoutes: (parent) => {
        return [
            {
                path: `${parent}/admin/import`,
                component: loadable(() => import("./Routes/ImportAdherent/index"))
            }
        ]
    }
}