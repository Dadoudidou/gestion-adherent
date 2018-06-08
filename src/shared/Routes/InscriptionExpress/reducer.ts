import { IAction, actionCreator, isType } from "@shared/Modules/redux-actions"
import { IEViewAdherentTabValue } from "./components/StepAdherent/comps/ViewAdherent";


const _rootActions = "IEActions/"
export const Actions = {
    removeAllAdherents: actionCreator(`${_rootActions}removeAllAdherents`),
    addAdherent: actionCreator<APIObjects.Adherent>(`${_rootActions}addAdherent`),
    addAdherents: actionCreator<APIObjects.Adherent[]>(`${_rootActions}addAdherents`),
    removeAdherent: actionCreator<APIObjects.Adherent>(`${_rootActions}removeAdherent`),
    updateAdherent: actionCreator<APIObjects.Adherent>(`${_rootActions}updateAdherent`),
    gotoStep: actionCreator<number>(`${_rootActions}gotoStep`),
    nextStep: actionCreator(`${_rootActions}nextStep`),
    previousStep: actionCreator(`${_rootActions}previousStep`),
}

export type IEState = {
    adherents: APIObjects.Adherent[]
    step: number
}

export const InitialState: IEState = {
    adherents: [],
    step: 0,
}

const __privates = {
    newAdherent: (payload: APIObjects.Adherent): APIObjects.Adherent => {
        return {
            ...payload,
            __id: (payload.id) ? payload.id : Date.now()
        }
    }
}

export const reducer = (state: IEState = InitialState, action: IAction<any>): IEState => {

    

    if(isType(action, Actions.addAdherent)){
        return {
            ...state,
            adherents: [
                ...state.adherents,
                __privates.newAdherent(action.payload)
            ]
        };
    }

    if(isType(action, Actions.addAdherents)){
        return {
            ...state,
            adherents: [
                ...state.adherents,
                ...action.payload.map(x => __privates.newAdherent(x))
            ]
        }
    }

    if(isType(action, Actions.removeAdherent)){
        let _index = state.adherents.map(x => x.__id).indexOf(action.payload.__id);
        if(_index > -1){
            return {
                ...state,
                adherents: [
                    ...state.adherents.splice(0, _index),
                    ...state.adherents.splice(_index + 1)
                ]
            }
        }
    }

    if(isType(action, Actions.removeAllAdherents)){
        return {
            ...state,
            adherents: []
        };
    }

    if(isType(action, Actions.updateAdherent)){
        console.log("Update adherent", state, action.payload)
        let _index = state.adherents.map(x => x.__id).indexOf(action.payload.__id);
        if(_index > -1){
            return {
                ...state,
                adherents: state.adherents.map((adherent, index) => {
                    if(index != _index) return adherent;
                    return action.payload;
                })
            }
        }
    }

    if(isType(action, Actions.gotoStep)){
        return {
            ...state,
            step: action.payload
        }
    }

    if(isType(action, Actions.nextStep)){
        return {
            ...state,
            step: state.step + 1
        }
    }

    if(isType(action, Actions.previousStep)){
        return {
            ...state,
            step: state.step - 1
        }
    }

    return state;
}