import * as React from "react"
import { Paper, TextField, Grid, withStyles, WithStyles, StyleRulesCallback } from "material-ui"
import * as moment from "moment";
import NumberField from "../../../Commons/NumberField/index";

type classkey = "textfield" | "root" | "montant"


const styles : StyleRulesCallback<classkey> = theme => ({
    textfield: {
        //margin: `${theme.spacing.unit}px ${theme.spacing.unit}px`
    },
    root : {
        //display: "flex",
        padding: theme.spacing.unit,
        margin: `${theme.spacing.unit * 2}px 0`
    },
    montant: {
        width: "70px"
    }
})

type FactureReglementFormProps = {
    paiement?: APIObjects.FacturePaiement
    onUpdatePaiement?: (paiement?: APIObjects.FacturePaiement) => void
}

class FactureReglementForm extends React.PureComponent<FactureReglementFormProps & WithStyles<classkey>, any>
{
    render(){
        const { classes } = this.props
        if(!this.props.paiement) return <div></div>
        return (
            <Paper className={classes.root}>
                <Grid container spacing={16}>
                    <Grid item md={4} xs={12}>
                        <NumberField 
                            fullWidth
                            label="Montant"
                            classes={{ root: `${classes.textfield}` }}
                            type="number"
                            value={this.props.paiement.montant}
                            onChange={event => {
                                this.props.onUpdatePaiement({
                                    ...this.props.paiement,
                                    montant: parseFloat(event.target.value)
                                });
                            }}
                            InputLabelProps={{ shrink: true }}
                        />
                    </Grid>
                    <Grid item md={4} xs={12}>
                        <TextField 
                            fullWidth
                            label="Type"
                            classes={{ root: classes.textfield }}
                            select
                            value={this.props.paiement.type}
                            onChange={event => {
                                console.log(event.target.value);
                                this.props.onUpdatePaiement({
                                    ...this.props.paiement,
                                    type: event.target.value
                                });
                            }}
                            SelectProps={{ native: true }}
                        >
                            <option value="cheque">Chèque</option>
                            <option value="cheque vacance">Chèque vacance</option>
                            <option value="liquide">Liquide</option>
                        </TextField>
                    </Grid>
                
                    <Grid item md={4} xs={12}>
                        <TextField 
                            fullWidth
                            label="Echéance"
                            classes={{ root: classes.textfield }}
                            value={moment(this.props.paiement.date_banque).format("YYYY-MM-DD")}
                            type="date"
                            onChange={event => {
                                this.props.onUpdatePaiement({
                                    ...this.props.paiement,
                                    date_banque: moment(event.target.value).toISOString()
                                });
                            }}
                        />
                    </Grid>
                    {(this.props.paiement.type=="cheque" ||
                    this.props.paiement.type=="cheque vacance") &&
                        <Grid item md={6} xs={12}>
                            <TextField 
                                fullWidth
                                label="Référence"
                                classes={{ root: classes.textfield }}
                                value={this.props.paiement.reference || ""}
                                onChange={event => {
                                    this.props.onUpdatePaiement({
                                        ...this.props.paiement,
                                        reference: event.target.value
                                    })
                                }}
                            />
                        </Grid>
                    }
                    {(this.props.paiement.type=="cheque") &&
                        <Grid item md={6} xs={12}>
                            <TextField 
                                fullWidth
                                label="Banque"
                                classes={{ root: classes.textfield }}
                                value={this.props.paiement.banque || ""}
                                onChange={event => {
                                    this.props.onUpdatePaiement({
                                        ...this.props.paiement,
                                        banque: event.target.value
                                    })
                                }}
                            />
                        </Grid>
                    }
                </Grid>
            </Paper>
        )
    }
}

export default withStyles(styles)(FactureReglementForm);