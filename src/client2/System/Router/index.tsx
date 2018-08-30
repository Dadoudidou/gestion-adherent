import * as React from "react";
import { Switch, Route } from "react-router-dom";

import NotFoundPage from "@client/Components/ErrorsPages/NotFoundPage"

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
export class RenderRoutes extends React.Component<RenderRoutesProps, any>
{
    render(){
        return (
            <Switch>
                <Route exact path="/" component={NotFoundPage} />
                {this.props.routes.map((route, index) => {
                    return (
                        <Route key={index} {...route} />
                    )
                })}
                <Route component={NotFoundPage} />
            </Switch>
        )
    }
}