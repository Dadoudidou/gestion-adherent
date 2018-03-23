import * as React from "react";

import * as ES6Promise from "es6-promise";
ES6Promise.polyfill();

// -- config moment
import * as moment from "moment";
moment.locale("fr");

// -- config fontawesome
require("font-awesome/css/font-awesome.min.css");

// -- STORE
// ---- redux
// ---- apollo
import { ApolloProvider } from "react-apollo"
import apolloClient from "./Services/Store/apollo"

// -- ROUTER
import { Router } from "react-router"
import { HashRouter } from "react-router-dom";
import { getHistory, RenderRoutes } from "./Services/Router"
import { loadRoutes } from "./Routes/routes"

// -- config material-ui
import { create as createJss } from "jss";
import { JssProvider } from "react-jss";
import * as jss_preset_default from "jss-preset-default";
const jss = createJss();
jss.setup(jss_preset_default);

import { MuiThemeProvider, createMuiTheme, colors } from "material-ui";
const theme = createMuiTheme({
    palette: {
        primary: colors.blueGrey
    }
})

export default class Application extends React.PureComponent<any, any>
{
    render(){
        return (
            <HashRouter>
                <ApolloProvider client={apolloClient}>
                    <div>
                        <JssProvider Jss={jss}>
                            <MuiThemeProvider theme={theme}>
                                <RenderRoutes routes={loadRoutes()} />
                            </MuiThemeProvider>
                        </JssProvider>
                    </div>
                </ApolloProvider>
            </HashRouter>
        )
    }
}
