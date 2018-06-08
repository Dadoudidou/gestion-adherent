import { IAction, actionCreator, isType } from "@shared/Modules/redux-actions"
import { IEViewAdherentTabValue } from "./comps/ViewAdherent";


const _rootActions = "IEActions/StepAdherentsActions/"
export const Actions = {
    selectAdherent: actionCreator<number>(`${_rootActions}selectAdherent`),
    selectTab: actionCreator<IEViewAdherentTabValue>(`${_rootActions}selectTab`),
    openPopupActivites: actionCreator<boolean | { campagne_id: number }>(`${_rootActions}openPopupActivites`),
}

export type IEState = {
    tab_index: IEViewAdherentTabValue
    adherentSelected: number
    popupActivitesOpened: boolean
    popupCampagne_id?: number
}

export const InitialState: IEState = {
    tab_index: "infos",
    adherentSelected: -1,
    popupActivitesOpened: false
}

const __privates = {
}

export const reducer = (state: IEState = InitialState, action: IAction<any>): IEState => {

    if(isType(action, Actions.selectAdherent)){
        return {
            ...state,
            adherentSelected: action.payload
        };
    }

    if(isType(action, Actions.selectTab)){
        return {
            ...state,
            tab_index: action.payload
        };
    }

    if(isType(action, Actions.openPopupActivites)){
        let _obj = (typeof(action.payload) == "boolean") ? undefined : action.payload;
        return {
            ...state,
            popupActivitesOpened: (_obj) ? true : false,
            popupCampagne_id: (_obj) ? _obj.campagne_id : undefined
        }
    }
    
    return state;
}