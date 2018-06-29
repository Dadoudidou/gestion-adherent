import * as React from "react"
import moment from "moment"
import {
    Typography, TextField, Grid,
    List, ListItem, ListItemText, ListSubheader, Toolbar, Tooltip,
    StyleRulesCallback, withStyles, WithStyles, Button, IconButton
} from "material-ui"
import { GridProps } from "material-ui/Grid";
import { descriptionTarif, dureeTarif } from "../../Utils/Tarifs";



type classkey = "section" | "headSection" | "flex"

const styles: StyleRulesCallback<classkey> = theme => ({
    flex: {
        flex: 1
    },
    section: {
        marginBottom: theme.spacing.unit * 6,
        marginTop: theme.spacing.unit * 2
    },
    headSection: {
        marginBottom: theme.spacing.unit * 2,
    }
})

export type ListAdherentActivitesProps = {
    campagnes?: APIObjects.Campagne[]
    adherent?: APIObjects.Adherent,
    onClickAddActivite?: (campagne: APIObjects.Campagne) => void
    onSelectActivite?: (adhesion?: APIObjects.Adherent_Adhesion) => void
}

export class ListAdherentActivites extends React.PureComponent<ListAdherentActivitesProps & WithStyles<classkey>, any>
{
    static defaultProps: ListAdherentActivitesProps = {
        adherent: undefined,
        campagnes: [],
        onClickAddActivite: () => {},
        onSelectActivite: () => {}
    }

    render(){
        const { adherent } = this.props;
        if(!adherent) return null;

        let _campagnesActives = this.props.campagnes.filter(x => moment(x.fin).isAfter(moment()));
        let _campagnes: APIObjects.Campagne[] = [];
        _campagnes = [ ..._campagnes, ..._campagnesActives ];
        _campagnes.sort((a,b) => {
            if(moment(a.debut).isBefore(moment(b.debut))) return -1;
            if(moment(a.debut).isAfter(moment(b.debut))) return -1;
            return 0;
        });

        return (
            <div>
                {_campagnes.map(campagne => {
                    let _adhesions = adherent.adhesions || []
                    _adhesions = _adhesions.filter(x => x.section.activite.categorie.campagne.id == campagne.id);
                    return (
                        <div key={campagne.id}>
                            <section>
                                <Toolbar>
                                    <Typography variant="title" className={this.props.classes.flex}>{campagne.nom}</Typography>
                                    <Tooltip title={`Ajouter une activité`}>
                                        <IconButton 
                                            onClick={() => { this.props.onClickAddActivite(campagne) }}
                                        ><i className="fa fa-plus" /></IconButton>
                                    </Tooltip>
                                </Toolbar>
                            
                                <List>
                                    {_adhesions.map(adhesion => {
                                        return (
                                            <ListItem 
                                                key={adhesion.__id} 
                                                button
                                                onClick={() => { this.props.onSelectActivite(adhesion); }}
                                            >
                                                <ListItemText 
                                                    disableTypography
                                                    
                                                    primary={(<Typography>{adhesion.section.nom}</Typography>)}
                                                    secondary={(
                                                        <div>
                                                            <Typography variant="caption">
                                                                {adhesion.section.activite.categorie.nom} / {adhesion.section.activite.nom}
                                                            </Typography>
                                                            {!adhesion.tarif.nbsessionmin && !adhesion.tarif.nbsessionmax &&
                                                                <div key="">
                                                                    {adhesion.section.sessions.map(session => {
                                                                        let _dateD = moment().day(session.jour).startOf("day").add(moment.duration(session.heure_debut));
                                                                        let _dateF = moment().day(session.jour).startOf("day").add(moment.duration(session.heure_fin));
                                                                        return (
                                                                            <Typography key={session.id}>
                                                                                {_dateD.format("dddd")} de {_dateD.format("LT")} à {_dateF.format("LT")} ({session.lieu.nom})
                                                                            </Typography>
                                                                        )
                                                                    })}
                                                                </div>
                                                            }
                                                            {(adhesion.tarif.nbsessionmin || adhesion.tarif.nbsessionmax) &&
                                                                <div>
                                                                    {adhesion.sessions.map(session => {
                                                                        let _dateD = moment().day(session.jour).startOf("day").add(moment.duration(session.heure_debut));
                                                                        let _dateF = moment().day(session.jour).startOf("day").add(moment.duration(session.heure_fin));
                                                                        return (
                                                                            <Typography key={session.id}>
                                                                                {_dateD.format("dddd")} de {_dateD.format("LT")} à {_dateF.format("LT")} ({session.lieu.nom})
                                                                            </Typography>
                                                                        )
                                                                    })}
                                                                </div>
                                                            }
                                                        </div>
                                                    )}
                                                />
                                                <ListItemText 
                                                    disableTypography
                                                    style={{ textAlign: "right" }}
                                                    primary={(<Typography>{`${adhesion.tarif.montant} €`}</Typography>)}
                                                    secondary={(
                                                        <div>
                                                            <Typography variant="caption">{dureeTarif(adhesion.tarif)}</Typography>
                                                            <Typography variant="caption">{descriptionTarif(adhesion.tarif)}</Typography>
                                                        </div>
                                                    )}
                                                />
                                            </ListItem>
                                        )
                                    })}
                                </List>
                            </section>
                        </div>
                    )
                })}
            </div>
        )
    }
}



export default withStyles(styles)(ListAdherentActivites);