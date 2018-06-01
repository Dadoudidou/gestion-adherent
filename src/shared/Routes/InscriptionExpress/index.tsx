import * as React from "react";


import DocumentTitle from "@shared/Components/Commons/DocumentTitle"

import Authenticated from "@shared/Services/Auth/Authenticated"
import Authorized from "@shared/Services/Auth/Authorized"

import { 
    Button, AppBar, IconButton, Typography, Toolbar,
    withStyles, WithStyles, StyleRulesCallback
 } from "material-ui"

import HeaderBar from "./Components/HeaderBar"
import StepperBar from "./Components/StepperBar"
import SwipeableViews from 'react-swipeable-views';
import ViewAdherent from "./Components/ViewAdherent"
import ViewFacture from "./Components/ViewFacture"

import QueueAnim from "rc-queue-anim"
import { PermissionsList } from "@shared/Services/Auth/permissions";




type classKey = "slide"

const styles: StyleRulesCallback<classKey> = theme => ({
    slide: {
        padding: theme.spacing.unit * 2
    }
})

type InscriptionExpressPageProps = {

} & WithStyles<classKey>

type InscriptionExpressState = {
    activeStep: number
    datas: InscriptionExpressFormData
}

export type InscriptionExpressFormData = {
    adherents: any[]
}

class InscriptionExpressPage extends React.PureComponent<InscriptionExpressPageProps, InscriptionExpressState>
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

    render(){
        return (
            <Authenticated>
                <DocumentTitle title="Inscription Express">
                    <div>
                        <HeaderBar />
                        <StepperBar activeStep={this.state.activeStep} />
                        <SwipeableViews
                            axis="x"
                            index={this.state.activeStep}
                            cellPadding={16}
                        >
                            <div className={this.props.classes.slide}><ViewAdherent /></div>
                            <div className={this.props.classes.slide}><ViewFacture /></div>
                        </SwipeableViews>
                    </div>
                </DocumentTitle>
            </Authenticated>
        )
    }
}

export default withStyles(styles)(InscriptionExpressPage)
