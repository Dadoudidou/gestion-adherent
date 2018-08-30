import * as React from "react"
import { getToken, checkToken } from "./index"
import { getHistory } from "@client/System/Router"

import ForbiddenPage from "@client/Components/ErrorsPages/ForbiddenPage"

type AuthenticatedProps = {
    authenticateAction?: () => Promise<any>
    AuthenticatingComponent?: React.ReactNode
    ForbiddenComponent?: React.ReactNode
    redirectionTimeout?: number
    onFailed?: (() => void) | string
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
        ForbiddenComponent: <ForbiddenPage />,
        onFailed: "/login",
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

            if(typeof(this.props.onFailed) == "string"){
                let _returnUrl = getHistory().createHref(getHistory().location);
                _returnUrl = _returnUrl.replace("#", "");
                setTimeout(() => {
                    getHistory().push({
                        pathname: this.props.onFailed as string,
                        search: `returnurl=${_returnUrl}`
                    });
                }, this.props.redirectionTimeout);
            } else {
                this.props.onFailed();
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