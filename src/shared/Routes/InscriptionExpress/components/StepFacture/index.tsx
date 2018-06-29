import * as React from "react";
import moment from "moment"
import {
    StyleRulesCallback, withStyles, WithStyles,
    Grid, Paper, Typography
} from "material-ui"

import {connect} from "react-redux"
import { IEReducer } from "./../../routes"

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
}

class StepFacture extends React.PureComponent<StepFactureProps & WithStyles<classKey>, any>
{
    render(){
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
                    montant: adhesion.tarif.montant
                })
                _ordre++;
            })
        })


        return (
            <div>
                <Grid container justify="center" spacing={24}>
                    <Grid item xl={6} lg={6} md={6}>
                        <Facture 
                            facture={_facture}
                        />
                    </Grid>
                </Grid>
                {/*
                <Grid container justify="center" spacing={24}>
                    <Grid item xl={6} lg={6} md={6}>
                            <Grid container direction="row">
                                <Grid item className={this.props.classes.flex}>
                                    <Typography>Tiers Payeur</Typography>
                                </Grid>
                                <Grid item className={this.props.classes.flex}>
                                    <Typography>Montant à régler</Typography>
                                </Grid>
                            </Grid>

                            <Grid container>
                                <Grid item className={this.props.classes.flex}>
                                    <ElementsAFacturer />
                                </Grid>
                            </Grid>
                    </Grid>
                </Grid>
                */}
            </div>
        )
    }
}

export default connect<StepFactureProps,Partial<StepFactureProps>, any, IEReducer>(
    (state) => ({
        adherents: state.InscriptionExpress.adherents
    }),
    (dispatch) => ({})
) (
    withStyles(styles)(StepFacture)
)