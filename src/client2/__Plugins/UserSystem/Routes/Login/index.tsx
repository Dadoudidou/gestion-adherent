import * as React from 'react'
import {
    withStyles, WithStyles, StyleRulesCallback,
    Grid, Paper,Typography, TextField, Button
} from '@material-ui/core'
import DocumentTitle from '@client/Components/DocumentTitle';
import { getHistory } from '@client/System/Router';
import { Login as LoginFn, setToken } from "@client/System/Auth"
import apolloStore from "@client/System/Store/apolloStore"
import { authQuery, authQueryData, authQueryVariables } from './../../Queries/auth';
//import QueueAnim from "rc-queue-anim"

type classKey = 'root' | "paper" | "container" | "paperitem"
const styles: StyleRulesCallback<classKey> = theme => ({
    root: {},
    paper: {
        padding: theme.spacing.unit * 2
    },
    container: {
        height: "75%",
        width: "100%",
        position: "absolute",
        top:0, left: 0
    },
    paperitem: {
        margin: theme.spacing.unit + "px 0"
    }
})

type LoginRouteProps = {}

type LoginRouteState = {
    user: string
    pwd: string
    err?: {
        user?: string
        pwd?: string
        global?: string
    }
}

class LoginRoute extends React.PureComponent<LoginRouteProps & WithStyles<classKey>, LoginRouteState>{
    constructor(props){
        super(props);
        this.state = {
            user: "",
            pwd: ""
        }
    }
    
    onLogin = (event: React.MouseEvent<HTMLElement>) => {
        
        event.stopPropagation();
        event.preventDefault();
        
        let _state = this.state;

        _state = { ..._state, err: { ..._state.err, global: undefined } }

        if(!this.state.user || this.state.user.trim() == ""){
            _state = {
                ..._state,
                err: {
                    ..._state.err,
                    user: "Le champ login doit être complété."
                }
            }
        }
         
        if(!this.state.pwd || this.state.pwd.trim() == ""){
            _state = {
                ..._state,
                err: {
                    ..._state.err,
                    pwd: "Le champ mot de passe doit être complété."
                }
            }
        }

        if(!_state.err || ( !_state.err.user && !_state.err.pwd )){

            //LoginFn(_state.user, _state.pwd)
            apolloStore.query<authQueryData, authQueryVariables>({
                query: authQuery,
                variables: { username:_state.user, password:_state.pwd }
            })
            .then(rep => {
                setToken(rep.data.auth);
                getHistory().push("/test");
            })
            .catch(err => {
                let _message = "Une erreur est survenue";
                if(err.message) _message = err.message;

                if(err.graphQLErrors){
                    if(err.graphQLErrors[0].extensions.exception.output.statusCode == 401){
                        _message = "Votre login ou mot de passe est invalide"
                    }
                }

                this.setState({
                    ...this.state,
                    err: { ...this.state.err, global: _message }
                })
            })

        }
        
        if(_state != this.state){
            this.setState(_state);
        }
        
    }

    render(){
        return (
            <DocumentTitle title="Connexion">
                <Grid container className={this.props.classes.container} direction="row" justify="center" alignItems="center">
                    <Grid item xs={12} sm={6} md={5} lg={4} xl={3}>
                        {/*<QueueAnim type="top">*/}
                            <Paper key="1" classes={{ root: this.props.classes.paper }}>
                                <form autoComplete="off" noValidate>

                                    <Grid container direction="column">
                                    
                                        {this.state.err && this.state.err.global && 
                                        <Grid item className={this.props.classes.paperitem}>
                                            <Typography color="error">
                                                {this.state.err.global}
                                            </Typography>
                                        </Grid>}

                                        <Grid item className={this.props.classes.paperitem}>
                                            <TextField 
                                                fullWidth
                                                label="Login"
                                                autoComplete="username"
                                                autoFocus
                                                value={this.state.user || ""}
                                                onChange={event => this.setState({ 
                                                    ...this.state, 
                                                    user: event.target.value,
                                                    err: { ...this.state.err, user: undefined }
                                                })}
                                                error={(this.state.err && this.state.err.user) ? true : false}
                                                helperText={this.state.err && this.state.err.user}
                                            />
                                        </Grid>

                                        <Grid item className={this.props.classes.paperitem}>
                                            <TextField 
                                                fullWidth
                                                label="Mot de passe"
                                                type="password"
                                                autoComplete="current-password"
                                                value={this.state.pwd || ""}
                                                onChange={event => this.setState({ 
                                                    ...this.state, 
                                                    pwd: event.target.value,
                                                    err: { ...this.state.err, pwd: undefined }
                                                })}
                                                error={(this.state.err && this.state.err.pwd) ? true : false}
                                                helperText={this.state.err && this.state.err.pwd}
                                            />
                                        </Grid>

                                        <Grid item className={this.props.classes.paperitem} style={{ alignSelf: "flex-end" }} >
                                            <Button type="submit" color="primary" onClick={this.onLogin}>Se connecter</Button>
                                        </Grid>

                                    </Grid>

                                </form>

                            </Paper>
                        {/*</QueueAnim>*/}
                    </Grid>
                </Grid>
            </DocumentTitle>
        )
    }
    
}
export default withStyles(styles)(LoginRoute)