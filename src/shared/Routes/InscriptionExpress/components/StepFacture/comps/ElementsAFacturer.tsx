import * as React from "react";
import { connect } from "react-redux"
import { IEReducer } from "./../../../routes"
import * as moment from "moment"

import {
    StyleRulesCallback, withStyles, WithStyles,
    Typography, ListSubheader, List, ListItem, ListItemText, Paper
} from "@material-ui/core"

import {default as ElementList, ElementFacture} from "@shared/Components/Components/Facture/ListElements"
import { descriptionTarif, dureeTarif } from "../../../../../Components/Utils/Tarifs";

type classkey = "root";
const styles: StyleRulesCallback<classkey> = theme => ({
    root: {}
})

type ElementsAFacturerProps = {
    adherents?: APIObjects.Adherent[]
}

class ElementsAFacturer extends React.PureComponent<ElementsAFacturerProps & WithStyles<classkey>, any>
{
    render(){

        let _elements: ElementFacture[] = [];

        this.props.adherents.forEach(adherent => {
            adherent.adhesions.forEach(adhesion => {
                if(adhesion.id) return;
                let _descr = (
                    <div>
                        {adhesion.sessions && adhesion.sessions.map((session, index) => {
                            let _dateD = moment().day(session.jour).startOf("day").add(moment.duration(session.heure_debut));
                            let _dateF = moment().day(session.jour).startOf("day").add(moment.duration(session.heure_fin));
                            return (
                                <Typography key={session.id}>
                                    {_dateD.format("dddd")} de {_dateD.format("LT")} à {_dateF.format("LT")} ({session.lieu.nom})
                                </Typography>
                            )
                        })}
                    </div>
                );
                _elements.push({
                    primary: adhesion.section.nom,
                    secondary: `${adhesion.section.activite.categorie.nom} / ${adhesion.section.activite.nom}`,
                    montant: adhesion.tarif.montant,
                    before: `${adherent.nom} ${adherent.prenom}`,
                    montant_description: (
                        <span>
                            {descriptionTarif(adhesion.tarif)}
                            <br />
                            {dureeTarif(adhesion.tarif)}
                        </span>
                    ),
                    after: _descr
                })
            });
        });


        return (
            <div>
                <ElementList 
                    elements={_elements}
                    enable_addElement
                />
            </div>
        )
    }
}

export default connect<ElementsAFacturerProps, Partial<ElementsAFacturerProps>, any, IEReducer>(
    (state) => ({
        adherents: state.InscriptionExpress.adherents
    }),
    (dispatch) => ({})
)(
    withStyles(styles)(ElementsAFacturer)
)