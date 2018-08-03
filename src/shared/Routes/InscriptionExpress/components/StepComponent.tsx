import * as React from "react"

import {connect} from "react-redux"
import { IEReducer } from "./../routes"

type StepComponentPublicProps = {
    step: number
    children: React.ReactNode
}

type StepComponentProps = {
    value: number
} & StepComponentPublicProps

class StepComponent extends React.PureComponent<StepComponentProps, any>
{
    render(){
        if(this.props.step != this.props.value) return <div></div>
        return this.props.children;
    }
}
export default connect(
    (state: IEReducer, props: StepComponentPublicProps): Partial<StepComponentProps> => ({
        value: state.InscriptionExpress.step
    })
)(StepComponent);