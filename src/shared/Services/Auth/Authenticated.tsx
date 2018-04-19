import * as React from "react"
import { getToken, checkToken } from "./index"
import { getHistory } from "@shared/Services/Router"

type AuthenticatedProps = {
    authenticateAction?: () => Promise<any>
    AuthenticatingComponent?: React.ReactNode
    ForbiddenComponent?: React.ReactNode
    redirectionPath?: string
    redirectionTimeout?: number
    children: React.ReactNode

}

type AuthenticatedState = {
    loading?: boolean
    authenticated?: boolean
}

class Authenticated extends React.PureComponent<AuthenticatedProps, AuthenticatedState>
{
    static defaultProps: Partial<AuthenticatedProps> = {
        authenticateAction: () => checkToken(getToken()),
        AuthenticatingComponent: <div>Authentification...</div>,
        ForbiddenComponent: <div>Vous n'êtes pas autorisé à aller sur cette page. Vous allez être redirigé.</div>,
        redirectionPath: "/login",
        redirectionTimeout: 2000
    }

    constructor(props){
        super(props);
        this.state = { 
            loading: false
        }
    }

    componentWillMount(){
        this.props.authenticateAction()
        .then(rep => {
            this.setState({ ...this.state, loading: false, authenticated: true });
        })
        .catch(err => {
            this.setState({ ...this.state, loading: false, authenticated: false });
            if(this.props.redirectionPath && this.props.redirectionTimeout){
                setTimeout(() => {
                    getHistory().push(this.props.redirectionPath);
                }, this.props.redirectionTimeout)
            }
        })
        this.setState({ ...this.state, loading: true });
    }

    render(){
        if(this.state.loading){
            return this.props.AuthenticatingComponent;
        }
        if(this.state.authenticated == false){
            return this.props.ForbiddenComponent;
        }
        return React.Children.only(this.props.children);
    }
}

export default Authenticated;