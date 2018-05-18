import { RouterRoute } from "./../../Services/Router";

import TestPage from "./index";
import { TestComponent } from "./index"

export const loadRoutes = (parent = ""): RouterRoute[] => {
    return [
        {
            path: `${parent}/test`,
            component: TestComponent
        },
        {
            path: `${parent}/test2`,
            component: TestComponent
        }
    ]
}