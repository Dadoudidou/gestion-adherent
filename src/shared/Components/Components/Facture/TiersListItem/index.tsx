import * as React from "react";
import {
    ListSubheader, Paper, Grid, Typography, ListItem, ListItemText, ListItemSecondaryAction,
    IconButton,
    StyleRulesCallback, withStyles, WithStyles
} from "material-ui"

type classkey = "root" | "flex"
const styles: StyleRulesCallback<classkey> = theme => ({
    root: {
    },
    flex: { flex: 1 }
})

type TiersListItemProps = {
    tiers: APIObjects.Tiers
    selectable?: boolean
    editable?: boolean
    onClick?: () => void
    onEditClick?: () => void
}

class TiersListItem extends React.PureComponent<TiersListItemProps & WithStyles<classkey>, any>
{
    render(){
        return (
            <ListItem className={this.props.classes.root} button={this.props.selectable} onClick={this.props.onClick}>
                <ListItemText 
                    primary={`${this.props.tiers.nom} ${this.props.tiers.prenom}`}
                    secondary={(
                        <span>
                            {this.props.tiers.adresse}<br />
                            {this.props.tiers.codepostal} {this.props.tiers.ville}
                        </span>
                    )}
                />
                {this.props.editable && <ListItemSecondaryAction>
                    <IconButton onClick={this.props.onEditClick}>
                        <i className="fa fa-pencil" />
                    </IconButton>
                </ListItemSecondaryAction>
                }
            </ListItem>
        )
    }
}

export default withStyles(styles)(TiersListItem)