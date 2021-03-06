import * as React from "react";
import {
    ListItem, ListItemText, ListItemSecondaryAction, IconButton,
    StyleRulesCallback, withStyles, WithStyles
} from "@material-ui/core"

type classkey = "root" | "flex" | "amount"
const styles: StyleRulesCallback<classkey> = theme => ({
    root: {},
    flex: { flex: 1 },
    amount: { textAlign: "right" }
})

type FactureDetailProps = {
    item: APIObjects.FactureDetail
    canDelete?: boolean
    canEdit?: boolean
    onEdit?: (item: APIObjects.FactureDetail) => void
    onDelete?: (item: APIObjects.FactureDetail) => void
}

class FactureDetail extends React.PureComponent<FactureDetailProps & WithStyles<classkey>, any>
{
    static defaultProps: Partial<FactureDetailProps> = {
        onDelete: () => {},
        onEdit: () => {}
    }

    render(){
        const { classes, item } = this.props;
        let _description = undefined;
        if(item.description){
            _description = (
                <span dangerouslySetInnerHTML={{
                    __html: item.description.replace(/\n/g, "<br />")
                }} />
            )
        }
        return (
            <ListItem button={this.props.canEdit} onClick={() => this.props.canEdit && this.props.onEdit(this.props.item)}>
                <ListItemText 
                    className={`${classes.flex}`}
                    primary={item.libelle}
                    secondary={_description}
                />
                <ListItemText 
                    className={`${classes.flex} ${classes.amount}`}
                    primary={`${item.montant} €`}
                />
                {this.props.canDelete && 
                <ListItemSecondaryAction>
                    <IconButton onClick={() => this.props.onDelete(this.props.item)}>
                        <i className="fa fa-trash" />
                    </IconButton>
                </ListItemSecondaryAction>
                }
            </ListItem>
        )
    }
}

export default withStyles(styles)(FactureDetail)