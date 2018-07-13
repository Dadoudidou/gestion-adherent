import * as React from "react"
import * as moment from "moment"
import {
    Typography, TextField, Grid,
    StyleRulesCallback, withStyles, WithStyles
} from "material-ui"
import { GridProps } from "material-ui/Grid";

import AutoCompleteAdherents from "@shared/Components/Connected/Adherent/SearchAdherentsAutoComplete"


type classkey = "section" | "headSection"

const styles: StyleRulesCallback<classkey> = theme => ({
    section: {
        marginBottom: theme.spacing.unit * 6,
        marginTop: theme.spacing.unit * 2
    },
    headSection: {
        marginBottom: theme.spacing.unit * 2,
    }
})

export type EditAdherentInfoProps = {
    adherent: APIObjects.Adherent,
    onUpdateAdherent: (adherent: APIObjects.Adherent) => void
}

export class EditAdherentInfo extends React.PureComponent<EditAdherentInfoProps & WithStyles<classkey>, any>
{
    render(){
        let _commonItem = { 
            xl: 6, lg: 6, md: 6, sm: 6, xs: 12,
        } as GridProps
        let _commonContainer = { 
            spacing: 16
        } as GridProps
        const { adherent, onUpdateAdherent } = this.props;
        return (
            <div>
                <section className={this.props.classes.section}>
                    <Typography variant="headline" className={this.props.classes.headSection}><i className="fa fa-user" /> Profil</Typography>
                    <Grid container {..._commonContainer}>
                        <Grid item {..._commonItem}>
                            <AutoCompleteAdherents 
                                textFieldProps={{
                                    label: "Nom",
                                    autoFocus: adherent.nom == undefined || adherent.nom == ""
                                }}
                                inputValue={adherent.nom || ""}
                                onInputValueChange={value => onUpdateAdherent({...adherent, nom: value})}
                                onSelect={item => { onUpdateAdherent({ ...adherent, ...item }) }}
                            />
                            {/*<TextField 
                                fullWidth
                                autoFocus={adherent.nom == undefined || adherent.nom == ""}
                                label="Nom"
                                value={adherent.nom || ""}
                                onChange={(event) => onUpdateAdherent({...adherent, nom: event.target.value}) }
                            />*/}
                        </Grid>
                        <Grid item {..._commonItem}>
                            <TextField 
                                fullWidth
                                autoFocus={(adherent.prenom == undefined || adherent.prenom == "") && !(adherent.nom == undefined || adherent.nom == "")}
                                label="Prénom"
                                value={adherent.prenom || ""}
                                onChange={(event) => onUpdateAdherent({...adherent, prenom: event.target.value}) }
                            />
                        </Grid>
                        <Grid item {..._commonItem}>
                            <TextField 
                                fullWidth
                                type="Date"
                                label="Date de naissance"
                                value={adherent.datenaissance ? moment(adherent.datenaissance).format("YYYY-MM-DD") : ""}
                                onChange={(event) => {
                                    //console.log("update date", event.target.value);
                                    onUpdateAdherent({...adherent, datenaissance: moment(event.target.value).toDate()}) 
                                }}
                                InputLabelProps={{ shrink: true }}
                            />
                        </Grid>
                    </Grid>
                </section>
                <section className={this.props.classes.section}>
                    <Typography variant="headline" className={this.props.classes.headSection}><i className="fa fa-map-marker" /> Contact</Typography>
                    <Grid container {..._commonContainer}>
                        <Grid item xs={12}>
                            <TextField 
                                fullWidth
                                label="Adresse"
                                value={adherent.adresse || ""}
                                onChange={(event) => onUpdateAdherent({...adherent, adresse: event.target.value}) }
                            />
                        </Grid>
                        <Grid item {..._commonItem}>
                            <TextField 
                                fullWidth
                                label="Code postal"
                                value={adherent.codepostal || ""}
                                onChange={(event) => onUpdateAdherent({...adherent, codepostal: event.target.value}) }
                            />
                        </Grid>
                        <Grid item {..._commonItem}>
                            <TextField 
                                fullWidth
                                label="Ville"
                                value={adherent.ville || ""}
                                onChange={(event) => 
                                    onUpdateAdherent({...adherent, ville: event.target.value}) 
                                }
                            />
                        </Grid>
                        <Grid item {..._commonItem}>
                            <TextField 
                                fullWidth
                                label="Téléphone domicile"
                                value={adherent.telephone_fixe || ""}
                                onChange={(event) => 
                                    onUpdateAdherent({...adherent, telephone_fixe: event.target.value}) 
                                }
                            />
                        </Grid>
                        <Grid item {..._commonItem}>
                            <TextField 
                                fullWidth
                                label="Téléphone mobile"
                                value={adherent.telephone_mobile || ""}
                                onChange={(event) => 
                                    onUpdateAdherent({...adherent, telephone_mobile: event.target.value}) 
                                }
                            />
                        </Grid>
                        <Grid item {..._commonItem}>
                            <TextField 
                                fullWidth
                                label="Courriel"
                                value={adherent.email || ""}
                                onChange={(event) => 
                                    onUpdateAdherent({...adherent, email: event.target.value}) 
                                }
                            />
                        </Grid>
                    </Grid>
                </section>
            </div>
        )
    }
}

export default withStyles(styles)(EditAdherentInfo);