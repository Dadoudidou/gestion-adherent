import { RouterRoute } from "./../../Services/Router";

import InscriptionExpressPage from "./index"

export const loadRoutes = (parent = ""): RouterRoute[] => {
    return [
        {
            path: `${parent}/inscription-express`,
            component: InscriptionExpressPage
        }
    ]
}