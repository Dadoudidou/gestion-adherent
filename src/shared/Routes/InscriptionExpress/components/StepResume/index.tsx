import * as React from "react";
import * as moment from "moment"
import {
    StyleRulesCallback, withStyles, WithStyles, ListSubheader,
    Grid, Paper, Typography, Button, DialogTitle, Dialog, DialogActions, DialogContent
} from "@material-ui/core"

import {connect} from "react-redux"
import { IEReducer } from "./../../routes"
import { Actions } from "./../../reducer"
import { GetFacture, getFactureAdhesionsQuery } from "@shared/Components/Queries/Queries/GetFacture"
import FactureReglementsForm from "@shared/Components/Components/Facture/FactureReglementsForm"
import { ApolloConsumer, Query } from "react-apollo";

import ApolloStore from "@shared/Services/Store/apollo"
import gql from "graphql-tag"
import Facture from "../../../../Components/Components/Facture/Facture/index";


type classKey = "root" | "flex"

const styles: StyleRulesCallback<classKey> = theme => ({
    root: { },
    flex: { flex: 1 },
})

type StepResumeProps = {
    facture?: APIObjects.Facture
    onNextStep?: () => void
}

type StepResumeState = {
}

class StepResume extends React.PureComponent<StepResumeProps & WithStyles<classKey>, StepResumeState>
{
    constructor(props){
        super(props);
        this.state = {
            facture: undefined
        }
    }

    
    render(){
        if(!this.props.facture) return <div></div>
        return (
            <GetFacture 
                query={getFactureAdhesionsQuery} 
                variables={{ facture_id: this.props.facture.id }}>
                {({ data, error, loading, client }) => {
                    if(loading) return <div>Chargement...</div>
                    if(error) return <div>Erreur : {error.message}</div>
                    return (
                        <Grid container spacing={24} justify="center">
                            <Grid item xl={6} lg={6} md={6} xs={12}>
                                <Facture 
                                    readOnly
                                    facture={data.comptabilite.Facture}
                                />
                                <br /><br />
                                <div style={{textAlign:"right"}}>
                                    <Button variant="raised" color="primary" onClick={() => this.props.onNextStep()}>Nouvelle Inscription</Button>
                                </div>
                            </Grid>
                            
                        </Grid>
                    )
                }}
            </GetFacture>
        )
    }
}

export default connect<StepResumeProps,Partial<StepResumeProps>, any, IEReducer>(
    (state) => ({
        facture: state && state.InscriptionExpress && state.InscriptionExpress.facture
    }),
    (dispatch) => ({
        onNextStep: () => {
            dispatch(Actions.reset());
        }
    })
) (
    withStyles(styles)(StepResume)
)