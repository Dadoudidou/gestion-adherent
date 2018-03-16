import * as React from "react";

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
            <ApolloProvider client={apolloClient}>
                <Router history={getHistory()}>
                    <div>
                        <JssProvider Jss={jss}>
                            <MuiThemeProvider theme={theme}>
                                <RenderRoutes routes={loadRoutes()} />
                            </MuiThemeProvider>
                        </JssProvider>
                    </div>
                </Router>
            </ApolloProvider>
        )
    }
}