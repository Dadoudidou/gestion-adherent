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
import { Provider as ReduxProvider } from "react-redux"
import reduxClient from "./System/Store/reduxStore"
// ---- apollo
import { ApolloProvider } from "react-apollo"
import apolloClient from "./System/Store/apolloStore"

// -- ROUTER
import { Router } from "react-router"
import { HashRouter } from "react-router-dom";
import { getHistory, RenderRoutes } from "./System/Router"
//import { loadRoutes } from "./System/routes"

// -- SESSIONS
require("./System/Session");

// -- THEME
import { create as createJss } from "jss";
import { JssProvider } from "react-jss";
import * as jss_preset_default from "jss-preset-default";
const jss = createJss();
jss.setup(jss_preset_default);

import { MuiThemeProvider, createMuiTheme, colors } from "@material-ui/core";

const theme = createMuiTheme({
    palette: {
        primary: colors.blue,
        secondary: colors.deepOrange
    },
    overrides: {
        MuiMenuItem: {
            selected: {
                backgroundColor: `${colors.deepOrange["100"]} !important`
            }
        }
    }
})
require("./index.scss");

// -- PLUGINS
import { PluginManager } from "@client/__Plugins";
import { UserSystemPlugin } from "@client/__Plugins/UserSystem";
PluginManager.GetInstance().add(UserSystemPlugin);


export default () => (
    <HashRouter>
        <ReduxProvider store={reduxClient}>
            <ApolloProvider client={apolloClient}>
                <div>
                    <JssProvider Jss={jss}>
                        <MuiThemeProvider theme={theme}>
                            <RenderRoutes routes={PluginManager.GetInstance().loadRoutes()} />
                        </MuiThemeProvider>
                    </JssProvider>
                </div>
            </ApolloProvider>
        </ReduxProvider>
    </HashRouter>
)