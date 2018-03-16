import { injectReducer, default as store } from "./../Store/redux";
import { Actions, SessionReducer } from "./reducer";

injectReducer(SessionReducer);

export const set = (key: string, value: any) => {
    store.dispatch(Actions.set({
        key: key,
        value: value
    }));
}

export const get = (key: string, defaultValue?: any): any => {
    let _value = store.getState()["SessionReducer"][key];
    if(_value == undefined) return defaultValue;
    return _value;
}