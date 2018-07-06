import * as React from "react";
import moment from "moment"
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
        // -- création d'un objet Facture
        let _facture: APIObjects.Facture = { 
            details: [],
            paiements: []
        }
        let _ordre = 1;
        this.props.adherents.forEach(adherent => {
            adherent.adhesions.forEach(adhesion => {
                if(adhesion.id) return;
                let _description = ''
                _description += `${adhesion.section.activite.categorie.nom} / ${adhesion.section.activite.nom} \n`
                _description += `${descriptionTarif(adhesion.tarif)} - ${dureeTarif(adhesion.tarif)}\n`
                if(adhesion.sessions){
                    adhesion.sessions.concat().sort((a,b) => {
                        if(a.jour < b.jour) return -1;
                        if(a.jour > b.jour) return 1;
                        return 0;
                    }).forEach(session => {
                        let _dateD = moment().day(session.jour).startOf("day").add(moment.duration(session.heure_debut));
                        let _dateF = moment().day(session.jour).startOf("day").add(moment.duration(session.heure_fin));
                        _description += `${_dateD.format("dddd")} de ${_dateD.format("LT")} à ${_dateF.format("LT")} (${session.lieu.nom})\n`;
                    })
                }
                _facture.details.push({
                    ordre: _ordre,
                    libelle: `${adherent.prenom} - ${adhesion.section.nom}`,
                    description: _description,
                    montant: adhesion.tarif.montant,
                    __id: _ordre,
                    __canDeleted: false
                })
                _ordre++;
            })
        })
        this.props.onUpdateFacture(_facture);
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