import { RouterRoute } from "@shared/Services/Router";
import { loadable } from "@shared/Services/Loadable"

export const loadRoutes = (parent = ""): RouterRoute[] => {
    return [
        {
            path: `${parent}/users/login`,
            component: loadable(() => import("./Login/index"))
        },
        {
            path: `${parent}/login`,
            component: loadable(() => import("./Login/index"), { timeout: 2000 })
        }
    ]
}