import * as React from "react"
import {
    Grid, Button, List, ListItem, Tab, Tabs, Paper,
    withStyles, StyleRulesCallback, StyledComponentProps
} from "material-ui"

type classKey = "paper"

const styles: StyleRulesCallback<classKey> = theme => ({
    paper: {
        padding: theme.spacing.unit * 2
    }
})

export default withStyles(styles)((props) => (
    <Grid container justify="center" spacing={24}>
        <Grid item xl={3} lg={3} md={4}>
            <Paper className={props.classes.paper}>
                blabla
            </Paper>
        </Grid>
        <Grid item  xl={9} lg={9} md={8}>
            <Paper className={props.classes.paper}>
                blabla
            </Paper>
        </Grid>
    </Grid>
))