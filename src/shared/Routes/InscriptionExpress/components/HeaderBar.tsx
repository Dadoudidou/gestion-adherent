import * as React from "react"
import { Button, AppBar, IconButton, Typography, Toolbar } from "material-ui"

export default () => (
    <AppBar  position="static">
        <Toolbar>
            <IconButton color="inherit">
                <i className="fa fa-arrow-left" />
            </IconButton>
            <Typography variant="title" color="inherit" style={{flex: 1}}>
                Inscription Express
            </Typography>
        </Toolbar>
    </AppBar>
)