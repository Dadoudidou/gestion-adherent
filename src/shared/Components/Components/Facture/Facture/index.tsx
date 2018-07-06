import * as React from "react";
import {
    ListSubheader, Paper, Grid, Typography,
    StyleRulesCallback, withStyles, WithStyles
} from "material-ui"
import FactureDetails from "./../FactureDetails"
import TiersSelection from "./../TiersSelection"


type classkey = "root" | "flex"
const styles: StyleRulesCallback<classkey> = theme => ({
    root: {},
    flex: { flex: 1 }
})

type FactureProps = {
    facture: APIObjects.Facture
    onUpdateFacture?: (facture: APIObjects.Facture) => void

    tiersList?: APIObjects.Tiers[]
    onUpdateTiersList?: (tiersList?: APIObjects.Tiers[]) => void
}


class Facture extends React.PureComponent<FactureProps & WithStyles<classkey>, any>
{
    static defaultProps: Partial<FactureProps> = {
        onUpdateFacture: () => {},
        onUpdateTiersList: () => {}
    }

    handle_onTiersChanged = (tiers: APIObjects.Tiers) => {
        this.props.onUpdateFacture({
            ...this.props.facture,
            tiers: tiers
        })
    }

    handle_onEditItem = (item: APIObjects.FactureDetail) => {
        let _index = this.props.facture.details.map(x => x.__id).indexOf(item.__id);
        let _facture = this.props.facture;
        if(_index == -1){
            _facture = {
                ..._facture,
                details: [..._facture.details, item]
            }
        } else {
            _facture = {
                ..._facture,
                details: _facture.details.map((x,i) => {
                    if(_index != i) return x;
                    return item;
                })
            }
        }
        this.props.onUpdateFacture(_facture);
    }

    handle_onDeleteItem = (item: APIObjects.FactureDetail) => {
        let _index = this.props.facture.details.map(x => x.__id).indexOf(item.__id);
        let _facture = this.props.facture;
        if(_index > -1){
            _facture = {
                ..._facture,
                details: [
                    ..._facture.details.splice(0, _index),
                    ..._facture.details.splice(_index + 1)
                ]
            }
            this.props.onUpdateFacture(_facture);
        }
    }

    render(){

        let _sum = 0;
        this.props.facture.details.forEach(x => { 
            let _val = x.montant ? parseFloat(String(x.montant)) : 0;
            if(!isNaN(_val)){
                _sum += _val
            }
        });

        return (
            <div>
                <Grid container>
                    <Grid item className={this.props.classes.flex}>
                        <ListSubheader>Tiers Payeur</ListSubheader>
                        <Paper>
                            <TiersSelection 
                                tiers={this.props.tiersList}
                                tiersSelected={this.props.facture.tiers}
                                onSelect={this.handle_onTiersChanged}
                                onAddTiers={(tiers) => {
                                    let _tiers = this.props.tiersList;
                                    if(tiers.id){
                                        let _index = _tiers.map(x => x.id).indexOf(tiers.id);
                                        if(_index > -1){
                                            this.props.onUpdateTiersList(_tiers.map((x, i) => {
                                                if(i != _index) return x;
                                                return tiers;
                                            }));
                                        }
                                    } else {
                                        this.props.onUpdateTiersList([
                                            ...this.props.tiersList,
                                            tiers
                                        ]);
                                    }
                                }}
                            />
                        </Paper>
                    </Grid>
                    <Grid item className={this.props.classes.flex} style={{ textAlign: "right" }}>
                        <ListSubheader>Montant à régler</ListSubheader>
                        <Typography variant="display2">{_sum} €</Typography>
                    </Grid>
                </Grid>
                <ListSubheader>Eléments facturés</ListSubheader>
                <Paper>
                    <FactureDetails 
                        canEdit
                        items={this.props.facture.details}
                        onAddItem={this.handle_onEditItem}
                        onEditItem={this.handle_onEditItem}
                        onDeleteItem={this.handle_onDeleteItem}
                    />
                </Paper>
            </div>
        )
    }
}

export default withStyles(styles)(Facture)