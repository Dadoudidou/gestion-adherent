import * as React from "react";
import * as moment from "moment"
import {
    StyleRulesCallback, withStyles, WithStyles, ListSubheader,
    Grid, Paper, Typography, Button, DialogTitle, Dialog, DialogActions, DialogContent
} from "@material-ui/core"

import {connect} from "react-redux"
import { IEReducer } from "./../../routes"
import { Actions } from "./../../reducer"
import { GetFacture, getFactureQuery } from "@shared/Components/Queries/Queries/GetFacture"
import FactureReglementsForm from "@shared/Components/Components/Facture/FactureReglementsForm"
import { ApolloConsumer, Query } from "react-apollo";

import ApolloStore from "@shared/Services/Store/apollo"
import gql from "graphql-tag"

import ReduxStore from "@shared/Services/Store/redux"
import { saveAdherentMutation, saveAdherentMutationVariables, saveAdherentMutationData } from "@shared/Components/Queries/Mutations/saveAdherent"
import { saveAdhesionMutation, saveAdhesionMutationVariables, saveAdhesionMutationData } from "@shared/Components/Queries/Mutations/saveAdhesion"
import { saveTiers, saveTiersData, saveTiersVariables } from "@shared/Components/Queries/Mutations/saveTiers"
import { saveFacture, saveFactureData, saveFactureVariables } from "@shared/Components/Queries/Mutations/saveFacture"

type classKey = "root" | "flex" | "buttonActions"

const styles: StyleRulesCallback<classKey> = theme => ({
    root: { },
    flex: { flex: 1 },
    buttonActions: { textAlign: "right", margin: `${theme.spacing.unit*2}px 0` }
})

type StepReglementsProps = {
    facture?: APIObjects.Facture
    onUpdateFacture?: (facture: APIObjects.Facture) => void
    onNextStep?: (facture: APIObjects.Facture) => void
}

type StepReglementsState = {
    facture: APIObjects.Facture
}

class StepReglements extends React.PureComponent<StepReglementsProps & WithStyles<classKey>, StepReglementsState>
{
    constructor(props){
        super(props);
        this.state = {
            facture: undefined
        }
    }

    handle_checkSave = (): boolean => {
        if(!this.props.facture.tiers) return false;

        // -- restant du
        let _sum = 0;
        this.props.facture.details.forEach(x => _sum += (x.montant ? x.montant : 0));
        let _restantDu = _sum;
        this.props.facture.paiements.forEach(x => _restantDu -= (x.montant ? x.montant : 0));
        if(_restantDu != 0) return false;

        // -- champs obligatoires
        let _return = true;
        let i=0;
        while(_return && i<this.props.facture.paiements.length){
            let _p = this.props.facture.paiements[i];

            // -- montant
            if(!_p.montant || isNaN(_p.montant)) _return = false;
            // -- type
            if(!_p.type || _p.type == "") _return = false;

            if(_p.type == "cheque vacance"){
                if(!_p.reference || _p.reference == "") _return = false;
            }

            if(_p.type == "cheque"){
                if(!_p.reference || _p.reference == "") _return = false;
                if(!_p.banque || _p.banque == "") _return = false;
            }

            i++;
        }
        return _return;
    }

    render(){
        if(!this.props.facture) return <div></div>
        return (
            <GetFacture 
                query={getFactureQuery} 
                variables={{ facture_id: this.props.facture.id }}>
                {({ data, error, loading, client }) => {
                    if(loading) return <div>Chargement...</div>
                    if(error) return <div>Erreur : {error.message}</div>


                    let _facture = this.props.facture.tiers ? this.props.facture : data.comptabilite.Facture;

                    let _sum = 0;
                    _facture.details.forEach(x => _sum += (x.montant ? parseFloat(x.montant as any) : 0));

                    let _restantDu = _sum;
                    _facture.paiements.forEach(x => _restantDu -= (x.montant ? parseFloat(x.montant as any) : 0));
                    if(isNaN(_restantDu)) _restantDu = _sum;

                    console.log(_restantDu, _sum);

                    let _canSave = this.handle_checkSave();

                    return (
                        <Grid container justify="center" spacing={24}>
                            <Grid item xl={6} lg={6} md={6}>
                                <Grid container>
                                    <Grid item className={this.props.classes.flex} style={{ textAlign: "left" }}>
                                        <ListSubheader style={{paddingLeft: 0}}>Montant à régler</ListSubheader>
                                        <Typography variant="display2">{_sum} €</Typography>
                                    </Grid>
                                    <Grid item className={this.props.classes.flex} style={{ textAlign: "right" }}>
                                        <ListSubheader style={{paddingRight: 0}}>Restant dû</ListSubheader>
                                        <Typography variant="display2">{_restantDu.toFixed(2)} €</Typography>
                                    </Grid>
                                </Grid>
                                <Paper style={{marginTop:"1em", padding: "1em" }}>

                                        <FactureReglementsForm 
                                            facture={_facture}
                                            onUpdateFacture={(facture) => {
                                                this.props.onUpdateFacture(facture);
                                            }}
                                        />

                                </Paper>
                                <div className={this.props.classes.buttonActions}>
                                    <Button 
                                        variant="raised" 
                                        color="primary"
                                        disabled={!_canSave}
                                        onClick={() => { 
                                            if(_canSave) this.props.onNextStep(this.props.facture);
                                        }}
                                    >
                                        Enregistrer
                                    </Button>
                                </div>
                            </Grid>
                        </Grid>
                    )
                }}
            </GetFacture>
        )
    }
}

export default connect<StepReglementsProps,Partial<StepReglementsProps>, any, IEReducer>(
    (state) => ({
        facture: state && state.InscriptionExpress && state.InscriptionExpress.facture
    }),
    (dispatch) => ({
        onUpdateFacture: (facture) => {
            dispatch(Actions.setFacture(facture));
        },
        onNextStep: async (facture) => {
            // -- enregistrement de la facture
            let _fres = await ApolloStore.mutate<saveFactureData>({
                mutation: saveFacture,
                variables: {facture: {
                    id: facture.id,
                    tiers: { id: facture.tiers.id },
                    details: facture.details.map(x => ({
                        id: x.id,
                        description: x.description,
                        libelle: x.libelle,
                        montant: x.montant,
                        ordre: x.ordre
                    } as APIObjects.FactureDetail)),
                    paiements: facture.paiements.map(x => ({
                        id: x.id,
                        banque: x.banque,
                        date_banque: moment(x.date_banque).toDate(),
                        montant: x.montant,
                        reference: x.reference,
                        type: x.type,
                        valide: x.valide
                    } as APIObjects.FacturePaiement))
                }} as saveFactureVariables,
                fetchPolicy: 'no-cache'
            });
            dispatch(Actions.nextStep());
        }
    })
) (
    withStyles(styles)(StepReglements)
)