import * as React from "react"
import { testPermissions } from "@shared/Services/Auth/permissions";
import { getClientAuth } from "@shared/Services/Auth";



type authorizedProps = {
    permissions: number[]
    children: React.ReactNode
}

type authorizedState = {
    testingPermissions: boolean
    authorize: boolean
}

class Authorized extends React.PureComponent<authorizedProps, authorizedState>
{
    constructor(props){
        super(props);
        this.state = {
            testingPermissions: true,
            authorize: false
        }
    }

    componentWillMount(){
        let _user = getClientAuth();
        let _state = this.state;

        if(testPermissions(this.props.permissions, _user)){
            _state = {..._state, testingPermissions: false, authorize: true }
        } else {
            _state = {..._state, testingPermissions: false, authorize: false }
        }

        if(this.state != _state) this.setState(_state);
    }

    render(){
        if(!this.state.authorize){
            return <span></span>;
        }
        return React.Children.only(this.props.children);
    }
}

export default Authorized;