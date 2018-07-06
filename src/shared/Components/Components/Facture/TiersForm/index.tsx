import * as React from "react";
import {
    ListSubheader, Paper, Grid, Typography, ListItem, ListItemText,
    TextField,
    StyleRulesCallback, withStyles, WithStyles
} from "material-ui"

type classkey = "root" | "flex"
const styles: StyleRulesCallback<classkey> = theme => ({
    root: { },
    flex: { flex: 1 }
})

type TiersFormProps = {
    tiers: APIObjects.Tiers
    onUpdate?: (tiers: APIObjects.Tiers) => void
}

class TiersForm extends React.PureComponent<TiersFormProps & WithStyles<classkey>, any>
{
    static defaultProps: Partial<TiersFormProps> = {
        onUpdate: () => {}
    }
    render(){
        const { tiers, onUpdate } = this.props;
        if(!tiers) return <div></div>
        return (
            <div>
                <TextField 
                    fullWidth
                    autoFocus
                    label="Nom"
                    value={tiers.nom}
                    onChange={(e) => { onUpdate({...tiers, nom: e.target.value}) }}
                />
                <TextField 
                    fullWidth
                    label="Prénom"
                    value={tiers.prenom}
                    onChange={(e) => { onUpdate({...tiers, prenom: e.target.value}) }}
                />
                <TextField 
                    fullWidth
                    label="Adresse"
                    value={tiers.adresse}
                    onChange={(e) => { onUpdate({...tiers, adresse: e.target.value}) }}
                />
                <TextField 
                    fullWidth
                    label="Code Postal"
                    value={tiers.codepostal}
                    onChange={(e) => { onUpdate({...tiers, codepostal: e.target.value}) }}
                />
                <TextField 
                    fullWidth
                    label="Ville"
                    value={tiers.ville}
                    onChange={(e) => { onUpdate({...tiers, ville: e.target.value}) }}
                />
            </div>
        )
    }
}

export default withStyles(styles)(TiersForm)