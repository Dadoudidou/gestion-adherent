import * as React from "react"

import { 
    withStyles, StyleRulesCallback, WithStyles,
    Dialog, DialogTitle
} from "material-ui"
import { DialogProps } from "material-ui/Dialog";

import { ActivitiesListProps, default as ActivitiesList } from "@shared/Components/Components/Lists/ActivitiesList"

type ActivitiesPopupProps = {
} & DialogProps & ActivitiesListProps

class ActivitiesPopup extends React.PureComponent<ActivitiesPopupProps, any>
{
    render(){
        const { ...other } = this.props;
        return (
            <Dialog {...other}>
                <DialogTitle>Quelle activité ?</DialogTitle>
                <div>
                    hello
                </div>
            </Dialog>
        )
    }
}

export default ActivitiesPopup;