import * as React from "react";
import {
    List, Button,
    StyleRulesCallback, withStyles, WithStyles
} from "material-ui"
import FactureDetail from "./../FactureDetail"

type classkey = "root" | "addZone"
const styles: StyleRulesCallback<classkey> = theme => ({
    root: {},
    addZone: {
        padding: `${theme.spacing.unit}px ${theme.spacing.unit * 2}px`
    }
})

type FactureDetailsProps = {
    items: APIObjects.FactureDetail[]
    canEdit?: boolean
    onDeleteItem?: (item: APIObjects.FactureDetail) => void
}

type FactureDetailsState = {
    
}

class FactureDetails extends React.PureComponent<FactureDetailsProps & WithStyles<classkey>, FactureDetailsState>
{
    static defaultProps: Partial<FactureDetailsProps> = {
        onDeleteItem: () => {}
    }
    render(){
        const { items, canEdit, classes } = this.props;
        return (
            <List>
                {items.map((item, index) => (
                    <FactureDetail 
                        key={item.__id || item.ordre || index}
                        item={item}
                        canDelete={canEdit}
                        canEdit={canEdit}
                        onDelete={this.props.onDeleteItem}
                    />
                ))}

                { canEdit &&
                    <div className={classes.addZone}>
                        <Button color="primary" fullWidth>
                            Ajouter un produit / service / remise
                        </Button>
                    </div>
                }
            </List>
        )
    }
}

export default withStyles(styles)(FactureDetails)