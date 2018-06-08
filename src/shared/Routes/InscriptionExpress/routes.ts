import { RouterRoute } from "./../../Services/Router";
import { injectReducer, default as store } from "@shared/Services/Store/redux"
import * as IE from "./reducer"
import * as IEStepAdherents from "./components/StepAdherent/reducer"

export type IEReducer = { 
    InscriptionExpress: IE.IEState,
    InscriptionExpressStepAdherents: IEStepAdherents.IEState
}

import InscriptionExpressPage from "./index"

export const loadRoutes = (parent = ""): RouterRoute[] => {

    // -- load reducer
    injectReducer({
        InscriptionExpress: IE.reducer,
        InscriptionExpressStepAdherents: IEStepAdherents.reducer
    });

    return [
        {
            path: `${parent}/inscription-express`,
            component: InscriptionExpressPage
        }
    ]
}