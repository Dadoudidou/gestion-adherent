import * as React from "react"
import {
    Grid, Button, List, ListItem, Tab, Tabs, Paper,
    withStyles, StyleRulesCallback, WithStyles
} from "@material-ui/core"

import ListAdherents from "./comps/ListAdherents";
import ViewAdherent from "./comps/ViewAdherent";

import { connect } from "react-redux"
import { IEReducer } from "./../../routes"
import { Actions } from "./../../reducer"
import * as StepAdherentReducer from "./reducer"


type classKey = "paper" | "callToAction"

const styles: StyleRulesCallback<classKey> = theme => ({
    paper: {
        //padding: theme.spacing.unit * 2
        paddingTop: theme.spacing.unit * 2,
        paddingBottom: theme.spacing.unit * 2
    },
    callToAction: {
        textAlign: "right",
        margin: `${theme.spacing.unit * 2}px 0px`
    }
})

type StepAdherentProps = {
    step?: number
    adherents?: APIObjects.Adherent[]
    addAdherent?: (adherent: APIObjects.Adherent) => void
    onClickNextStep?: () => void
} 

class StepAdherent extends React.PureComponent<StepAdherentProps & WithStyles<classKey>, any>
{
    componentWillMount(){
        if(!this.props.adherents || this.props.adherents.length == 0){
            setTimeout(() => {
                this.props.addAdherent({});
            }, 500);
        }
    }


    render(){
        let _canNextStep = false;
        
        // check champs obligatoires
        if(this.props.adherents && this.props.adherents.length > 0){
            let _i=0;
            _canNextStep = true;
            while(_canNextStep == true && _i < this.props.adherents.length){
                let _adh = this.props.adherents[_i];
                // -- champs obligatoires
                if(!_adh.nom || _adh.nom.trim() == "") _canNextStep = false;
                if(!_adh.prenom || _adh.prenom.trim() == "") _canNextStep = false;
                if(!_adh.datenaissance) _canNextStep = false;
                // -- au moins 1 activité non enregistrée

                _i++;
            }
        }

        return (
            <Grid container justify="center" spacing={24}>
                <Grid item xl={3} lg={3} md={4}>
                    <Paper className={this.props.classes.paper}>
                        <ListAdherents />
                    </Paper>
                </Grid>
                <Grid item  xl={9} lg={9} md={8}>
                    <Paper className={this.props.classes.paper}>
                        <ViewAdherent />
                    </Paper>
                    <div className={this.props.classes.callToAction}>
                        <Button
                            variant="raised"
                            color="primary"
                            disabled={!_canNextStep}
                            onClick={this.props.onClickNextStep}
                        >
                            Etablir une facture
                        </Button>
                    </div>
                </Grid>
            </Grid>
        )
    }
}


export default connect<StepAdherentProps, StepAdherentProps, any, IEReducer>(
    (state: IEReducer) => ({
        adherents: state.InscriptionExpress.adherents
    }),
    (dispatch) => ({
        onClickNextStep: () => {
            dispatch(Actions.nextStep());
        },
        addAdherent: (adherent) => {
            let __id = Date.now();
            dispatch(Actions.addAdherent({ __id, ...adherent }));
            dispatch(StepAdherentReducer.Actions.selectAdherent(0));  
            
        }
    })
)(
    withStyles(styles)(StepAdherent)
)

