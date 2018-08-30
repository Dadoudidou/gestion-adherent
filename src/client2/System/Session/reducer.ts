import { actionCreator, IAction, isType } from "@modules/redux-actions";

const actionType = "services/session/";
type SetType = { key: string, value: any };
export const Actions = {
    set: actionCreator<SetType>(`${actionType}set`),
    clear: actionCreator(`${actionType}clear`)
};

type sessionState = { [key: string]: any }
const initialState = { }

export const SessionReducer = (state: sessionState = initialState, action: IAction<any>): sessionState => {

    if(isType(action, Actions.set)){
        return {
            ...state,
            [action.payload.key]: action.payload.value
        }
    }

    if(isType(action, Actions.clear)){
        return initialState;
    }

    return state;
}