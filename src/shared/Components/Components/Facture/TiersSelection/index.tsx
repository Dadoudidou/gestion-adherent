import * as React from "react";
import {
    ListItem, ListItemText, Menu, MenuItem,
    Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle,
    Button,
    StyleRulesCallback, withStyles, WithStyles
} from "material-ui"

import TiersListItem from "./../TiersListItem";
import TiersForm from "./../TiersForm";

type classkey = "root" | "flex"
const styles: StyleRulesCallback<classkey> = theme => ({
    root: {
        border: `1px dashed ${theme.palette.grey[500]}`
    },
    flex: { flex: 1 }
})

type TiersSelectionProps = {
    tiers: APIObjects.Tiers[]
    tiersSelected?: APIObjects.Tiers
    onSelect?: (tiers: APIObjects.Tiers) => void
    onAddTiers?: (tiers: APIObjects.Tiers) => void
}

type TiersSelectionState = {
    popup?: boolean
    popupNew?: boolean
    popupNewTiers?: APIObjects.Tiers
}

class TiersSelection extends React.PureComponent<TiersSelectionProps & WithStyles<classkey>, TiersSelectionState>
{
    static defaultProps: Partial<TiersSelectionProps> = {
        onSelect: () => {},
        onAddTiers: () => {},
        tiers: [],
        tiersSelected: undefined
    }

    constructor(props){
        super(props);
        this.state = { popup: false, popupNew: false, popupNewTiers: undefined };
    }
    anchorElement = undefined

    renderNone = () => {
        return (
            <ListItem button>
                <ListItemText 
                    primary={(<span><i className="fa fa-plus" /> Utiliser un autre tiers</span>)}
                    onClick={() => { 
                        this.setState({ 
                            ...this.state,
                            popup: false,
                            popupNew: true,
                            popupNewTiers: {} 
                        }) 
                    }}
                />
            </ListItem>
        )
    }

    renderSelected = (tiers: APIObjects.Tiers) => {
        return (
            <div ref={(element) => this.anchorElement = element} style={{position:"relative"}}>
                <TiersListItem 
                    selectable
                    tiers={tiers}
                    onClick={() => { this.setState({ popup: true }) }}
                />
                <div style={{position:"absolute", top:0, right:0, bottom: 0, padding: "1em", display: "flex", alignItems: "center"}}>
                    <i className="fa fa-caret-down" />
                </div>
            </div>
        )
    }

    render(){
        let _tiers = this.props.tiersSelected;
        if(this.props.tiers.length > 0 && !_tiers){
            _tiers = this.props.tiers[0];
        }
        return (
            <div className={this.props.classes.root}>
                {
                    this.props.tiers && this.props.tiers.length > 0 ?
                    this.renderSelected(_tiers)
                    :
                    this.renderNone()
                }

                <Menu
                    open={this.state.popup}
                    anchorEl={this.anchorElement}
                    //anchorOrigin={{ horizontal:"center", vertical:"center" }}
                    //transformOrigin={{horizontal:"center", vertical:"center"}}
                    onClose={ () => this.setState({ popup: false }) }
                >
                    {this.props.tiers.map(x => (
                        <TiersListItem 
                            key={x.id}
                            tiers={x}
                            selectable
                            editable
                            onClick={() => { 
                                this.setState({ popup: false }, () => {
                                    this.props.onSelect(x);
                                })
                            }}
                            onEditClick={() => {
                                this.setState({
                                    ...this.state,
                                    popup: false,
                                    popupNew: true,
                                    popupNewTiers: x
                                })
                            }}
                        />
                    ))}
                    {this.renderNone()}
                </Menu>

                <Dialog
                    open={this.state.popupNew}
                    onClose={() => this.setState({...this.state, popupNew: false, popupNewTiers: undefined})}
                >
                    <DialogTitle>
                        {this.state.popupNewTiers && this.state.popupNewTiers.id ? "Modifier le tiers" : "Utiliser un autre tiers"}
                    </DialogTitle>
                    <DialogContent>
                        <TiersForm 
                            tiers={this.state.popupNewTiers}
                            onUpdate={(tiers) => this.setState({ ...this.state, popupNewTiers: tiers })}
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => this.setState({...this.state, popupNew: false, popupNewTiers: undefined})}>Fermer</Button>
                        <Button 
                            color="primary" variant="raised"
                            onClick={() => {
                                let _tiers = this.state.popupNewTiers;
                                this.setState({...this.state, popupNew: false, popupNewTiers: undefined}, () => {
                                    this.props.onSelect(_tiers);
                                    this.props.onAddTiers(_tiers);
                                })
                            }}>
                            Sélectionner ce tiers
                        </Button>
                    </DialogActions>
                </Dialog>

            </div>
        )
    }
}

export default withStyles(styles)(TiersSelection)