import { RouterRoute } from "./../../Services/Router";

import NotFoundPage from "./NotFound";

export const loadRoutes = (parent = ""): RouterRoute[] => {
    return [
        {
            path: `${parent}/notfound`,
            component: NotFoundPage
        }
    ]
}