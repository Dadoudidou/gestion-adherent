import { createStore, applyMiddleware, combineReducers, Reducer } from "redux";
import thunkMiddleware from "redux-thunk";

const defaultReducer = (state = 0, action) => state;

const store = createStore(
    combineReducers({}),
    {},
    applyMiddleware(
        thunkMiddleware
    )
)

let _asyncReducers: {[key:string]:Reducer<any>} = {};

export const injectReducer = (reducer: Reducer<any>) => {
    _asyncReducers = { ..._asyncReducers, reducer }
    store.replaceReducer(combineReducers(_asyncReducers));
}

export default store;