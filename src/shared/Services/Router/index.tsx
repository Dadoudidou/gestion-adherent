import * as React from "react";
import { Switch, Route } from "react-router";

// -- HISTORY
import { createHashHistory, History } from "history"
let _history = undefined;
export const getHistory = (): History => {
    if(_history == undefined) _history = createHashHistory();
    return _history;
}

// -- ROUTERROUTES
import { RouteProps } from "react-router"
export type RouterRoute = {
    rules?: string[]
} & RouteProps


// -- RENDERROUTES
type RenderRoutesProps = {
    routes: RouterRoute[]
}
export class RenderRoutes extends React.PureComponent<RenderRoutesProps, any>
{
    render(){
        return (
            <Switch>
                {this.props.routes.map((route, index) => {
                    return (
                        <Route key={index} {...route} />
                    )
                })}
            </Switch>
        )
    }
}