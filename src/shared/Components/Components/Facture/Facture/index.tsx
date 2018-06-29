import * as React from "react";
import {
    ListSubheader, Paper,
    StyleRulesCallback, withStyles, WithStyles
} from "material-ui"
import FactureDetails from "./../FactureDetails"

type classkey = "root"
const styles: StyleRulesCallback<classkey> = theme => ({
    root: {}
})

type FactureProps = {
    facture: APIObjects.Facture
}

class Facture extends React.PureComponent<FactureProps & WithStyles<classkey>, any>
{
    render(){
        return (
            <div>
                <ListSubheader>Eléments facturés</ListSubheader>
                <Paper>
                    <FactureDetails 
                        canEdit
                        items={this.props.facture.details}
                    />
                </Paper>
            </div>
        )
    }
}

export default withStyles(styles)(Facture)