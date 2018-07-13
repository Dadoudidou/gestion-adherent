import * as React from "react";
import * as moment from "moment"
import {
    StyleRulesCallback, withStyles, WithStyles,
    Grid, Paper, Typography, Button
} from "material-ui"

import {connect} from "react-redux"
import { IEReducer } from "./../../routes"
import Store from "@shared/Services/Store/redux"
import { Actions } from "./../../reducer"

import ElementsAFacturer from "./comps/ElementsAFacturer"

import Facture from "@shared/Components/Components/Facture/Facture"
import { dureeTarif, descriptionTarif } from "../../../../Components/Utils/Tarifs";

import ApolloStore from "@shared/Services/Store/apollo"
import gql from "graphql-tag"


type classKey = "root" | "flex"

const styles: StyleRulesCallback<classKey> = theme => ({
    root: {
    },
    flex: { flex: 1 }
})


type StepFactureProps = {
    adherents?: APIObjects.Adherent[]
    facture?: APIObjects.Facture
    onDeleteItem?: (item: APIObjects.FactureDetail) => void
    onUpdateFacture?: (facture: APIObjects.Facture) => void
}

class StepFacture extends React.PureComponent<StepFactureProps & WithStyles<classKey>, any>
{
    componentWillMount(){

        let _adhesions: APIObjects.Adherent_Adhesion[] = [];
        this.props.adherents.forEach(adherent => {
            adherent.adhesions.forEach(adhesion => {
                if(adhesion.id) return;
                _adhesions.push({
                    adherent: {
                        id: adherent.id,
                        nom: adherent.nom,
                        prenom: adherent.prenom,
                        datenaissance: adherent.datenaissance
                    },
                    tarif: {
                        id: adhesion.tarif.id
                    }
                })
            });
        });

        ApolloStore.query({
            query: gql`
                query getFacture($adhesions: [AdhesionInput]) {
                    comptabilite {
                        Facture(adhesions: $adhesions){
                            id, date_creation
                            details {
                                id, date_creation, libelle, description, montant, ordre
                            }
                            paiements {
                                id
                            }
                        }
                    }
                }
            `,
            variables: {
                adhesions: _adhesions
            },
            fetchPolicy: 'no-cache'
        }).then(result => {
            this.props.onUpdateFacture(result.data.comptabilite.Facture);
        })

    }

    render(){
        if(!this.props.facture) return <div></div>
        
        let _tiers: APIObjects.Tiers[] = []
        

        return (
            <div>
                <Grid container justify="center" spacing={24}>
                    <Grid item xl={6} lg={6} md={6}>
                        <Facture 
                            facture={this.props.facture}
                            tiersList={_tiers}
                            onUpdateFacture={this.props.onUpdateFacture}
                        />
                        <div style={{ marginTop: "1em", marginBottom: "1em", textAlign: "right" }}>
                            <Button variant="raised" color="primary">
                                Passer au règlement
                            </Button>
                        </div>
                    </Grid>
                </Grid>
            </div>
        )
    }
}

export default connect<StepFactureProps,Partial<StepFactureProps>, any, IEReducer>(
    (state) => ({
        adherents: state.InscriptionExpress.adherents,
        facture: state.InscriptionExpress.facture
    }),
    (dispatch) => ({
        onUpdateFacture: (facture) => {
            dispatch(Actions.setFacture(facture))
        }
    })
) (
    withStyles(styles)(StepFacture)
)