import { RouterRoute } from "./../../Services/Router";

import TestPage from "./index";

export const loadRoutes = (parent = ""): RouterRoute[] => {
    return [
        {
            path: `${parent}/test`,
            component: TestPage
        }
    ]
}