import { RouterRoute } from "./../../Services/Router";

import TestPage from "./index";
import { Test1 } from "./index"

export const loadRoutes = (parent = ""): RouterRoute[] => {
    return [
        {
            path: `${parent}/test`,
            component: TestPage
        },
        {
            path: `${parent}/test2`,
            component: Test1
        }
    ]
}