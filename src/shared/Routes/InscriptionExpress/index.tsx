import * as React from "react";


import DocumentTitle from "@shared/Components/Commons/DocumentTitle"

import Authenticated from "@shared/Services/Auth/Authenticated"
import Authorized from "@shared/Services/Auth/Authorized"

import { 
    Button, AppBar, IconButton, Typography, Toolbar,
    withStyles, WithStyles, StyleRulesCallback
 } from "@material-ui/core"

import HeaderBar from "./Components/HeaderBar"
import StepperBar from "./Components/StepperBar"
import SwipeableViews from 'react-swipeable-views';
import ViewAdherent from "./Components/StepAdherent"
import ViewFacture from "./Components/StepFacture"
import ViewRegelements from "./Components/StepReglements"
import ViewResume from "./Components/StepResume"

import QueueAnim from "rc-queue-anim"
import { PermissionsList } from "@shared/Services/Auth/permissions";


import { connect } from "react-redux"
import { IEReducer } from "./routes"
import { Actions } from "./reducer"
import StepComponent from "./components/StepComponent";



type classKey = "slide"

const styles: StyleRulesCallback<classKey> = theme => ({
    slide: {
        padding: theme.spacing.unit * 2
    }
})

type InscriptionExpressPageProps = {
    activeStep: number
    onSelectStep?: (step: number) => void
}

type InscriptionExpressState = {
    activeStep: number
    datas: InscriptionExpressFormData
}

export type InscriptionExpressFormData = {
    adherents: any[]
}

class InscriptionExpressPage extends React.PureComponent<InscriptionExpressPageProps & WithStyles<classKey>, InscriptionExpressState>
{
    constructor(props){
        super(props);
        this.state = {
            datas: {
                adherents: []
            },
            activeStep: 0
        }
    }

    handle_onselectStep = (step) => {
        if(step < 2){
            this.props.onSelectStep(step);
        }
    }

    render(){
        return (
            <Authenticated>
                <DocumentTitle title="Inscription Express">
                    <div>
                        <HeaderBar />
                        <StepperBar 
                            activeStep={this.props.activeStep} 
                            onSelectStep={this.props.onSelectStep}
                        />
                        <SwipeableViews
                            axis="x"
                            index={this.props.activeStep}
                            cellPadding={16}
                        >
                            <div className={this.props.classes.slide}><StepComponent step={0}><ViewAdherent /></StepComponent></div>
                            <div className={this.props.classes.slide}><StepComponent step={1}><ViewFacture /></StepComponent></div>
                            <div className={this.props.classes.slide}><StepComponent step={2}><ViewRegelements /></StepComponent></div>
                            <div className={this.props.classes.slide}><StepComponent step={3}><ViewResume /></StepComponent></div>
                        </SwipeableViews>
                    </div>
                </DocumentTitle>
            </Authenticated>
        )
    }
}

export default connect<InscriptionExpressPageProps, Partial<InscriptionExpressPageProps>, any, IEReducer>(
    (state: IEReducer) => ({
        activeStep: state.InscriptionExpress.step
    }),
    (dispatch) => ({
        onSelectStep: (step) => {
            
            dispatch(Actions.gotoStep(step))
        }
    })
)(
    withStyles(styles)(InscriptionExpressPage)
)

