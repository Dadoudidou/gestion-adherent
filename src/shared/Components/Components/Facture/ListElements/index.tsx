import * as React from "react";
import {
    StyleRulesCallback, withStyles, WithStyles,
    Typography, ListSubheader, List, ListItem, ListItemText, ListItemSecondaryAction, Grid, Paper,
    Button
} from "@material-ui/core"

export type ElementFacture = {
    primary: React.ReactNode
    montant: number

    secondary?: React.ReactNode
    montant_description?: React.ReactNode
    after?: React.ReactNode
    before?: React.ReactNode
}

type classkey = "root" | "montant" | "ListItem" | "flex" | "addElementZone";
const styles: StyleRulesCallback<classkey> = theme => ({
    root: {},
    flex: { flex: 1},
    montant: {
        textAlign: "right"
    },
    ListItem: {
        padding: `${theme.spacing.unit}px ${theme.spacing.unit * 2}px`
    },
    addElementZone: {
        padding: `${theme.spacing.unit}px ${theme.spacing.unit * 2}px`
    }
})

type ListElementsProps = {
    elements?: ElementFacture[]
    enable_addElement?: boolean
    onAddElementClicked?: () => void
    onAddElementAdded?: (element: ElementFacture) => void
}

type ListElementsState = {
    ElementAddedShow?: boolean
}

class ListElements extends React.PureComponent<ListElementsProps & WithStyles<classkey>, ListElementsState>
{
    static defaultProps: Partial<ListElementsProps> = {
        elements: []
    }

    constructor(props){
        super(props);
        this.state = { }
    }

    render(){

        return (
            <List
                subheader={<ListSubheader component="div">Eléments à facturer</ListSubheader>}
            >
                <Paper>
                {this.props.elements.map((element, index) => {
                    return (
                        <Grid key={index} container direction="row" className={this.props.classes.ListItem}>
                            <Grid item className={this.props.classes.flex}>
                                {element.before && <Typography variant="caption">{element.before}</Typography>}
                                <Typography>{element.primary}</Typography>
                                {element.secondary && <Typography variant="caption">{element.secondary}</Typography>}
                                {element.after && <Typography variant="body2">{element.after}</Typography>}
                            </Grid>
                            <Grid item className={`${this.props.classes.flex} ${this.props.classes.montant}`}>
                                <Typography>{element.montant} €</Typography>
                                {element.montant_description && <Typography variant="caption">{element.montant_description}</Typography>}
                            </Grid>
                        </Grid>
                    )
                })}
                {this.props.enable_addElement && !this.state.ElementAddedShow &&
                <div className={this.props.classes.addElementZone}>
                    <Button color="primary" fullWidth>Ajouter un produit / service / remise</Button>
                </div>}
                </Paper>
            </List>
        )
    }
}

export default withStyles(styles)(ListElements);