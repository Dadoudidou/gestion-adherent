import * as React from "react";
import {
    ListItem, ListItemText, ListItemSecondaryAction, IconButton,
    TextField, Paper, InputAdornment,
    StyleRulesCallback, withStyles, WithStyles
} from "@material-ui/core"
import NumberField from "@shared/Components/Commons/NumberField"

type classkey = "root" | "flex" | "amount"
const styles: StyleRulesCallback<classkey> = theme => ({
    root: {},
    flex: { flex: 1 },
    amount: { textAlign: "right" }
})

type FactureDetailFormProps = {
    item: APIObjects.FactureDetail
    onEdit?: (item: APIObjects.FactureDetail) => void
}

class FactureDetailForm extends React.PureComponent<FactureDetailFormProps & WithStyles<classkey>, any>
{
    static defaultProps: Partial<FactureDetailFormProps> = {
        onEdit: () => {}
    }

    render(){
        const { classes, item, onEdit } = this.props;
        let _description = undefined;
        if(item.description){
            _description = (
                <span dangerouslySetInnerHTML={{
                    __html: item.description.replace(/\n/g, "<br />")
                }} />
            )
        }
        return (
            <Paper elevation={8}>
                <ListItem style={{ alignItems: "flex-start" }}>
                    <ListItemText 
                        disableTypography
                        className={`${classes.flex}`}
                        primary={(
                            <TextField 
                                label="Produit"
                                autoFocus
                                fullWidth
                                value={item.libelle || ""}
                                onChange={(e) => onEdit({ ...item, libelle: e.target.value })}
                            />
                        )}
                        secondary={(
                            <TextField 
                                multiline
                                label="Description (Optionnel)"
                                fullWidth
                                value={item.description || ""}
                                onChange={(e) => onEdit({ ...item, description: e.target.value })}
                            />
                        )}
                    />
                    <ListItemText 
                        disableTypography
                        className={`${classes.flex} ${classes.amount}`}
                        primary={(
                            <NumberField 
                                label="Montant"
                                fullWidth
                                InputProps={{
                                    endAdornment: <InputAdornment position="end">€</InputAdornment>,
                                }}
                                value={item.montant!=null ? item.montant :""}
                                onChange={(e) => {
                                    // -- valeur
                                    let _value = undefined;
                                    if( e.target.value && 
                                        e.target.value.trim() != "" && 
                                        !isNaN(parseFloat(e.target.value))){
                                            _value = e.target.value;
                                    }
                                    onEdit({ ...item, montant: _value })
                                }}
                            />
                        )}
                    />
                </ListItem>
            </Paper>
        )
    }
}

export default withStyles(styles)(FactureDetailForm)