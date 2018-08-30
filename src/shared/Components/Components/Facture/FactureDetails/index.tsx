import * as React from "react";
import * as ReactDOM from "react-dom"
import {
    List, Button,
    ListItem, TextField, ListItemText,
    StyleRulesCallback, withStyles, WithStyles
} from "@material-ui/core"
import FactureDetail from "./../FactureDetail"
import FactureDetailForm from "./../FactureDetailForm"

type classkey = "root" | "addZone" | "flex"
const styles: StyleRulesCallback<classkey> = theme => ({
    root: {},
    addZone: {
        padding: `${theme.spacing.unit}px ${theme.spacing.unit * 2}px`
    },
    flex: { flex: 1 }
})

type FactureDetailsProps = {
    items: APIObjects.FactureDetail[]
    canEdit?: boolean
    onDeleteItem?: (item: APIObjects.FactureDetail) => void
    onAddItem?: (item: APIObjects.FactureDetail) => void
    onEditItem?: (item: APIObjects.FactureDetail) => void
}

type FactureDetailsState = {
    editableFactureDetail?: APIObjects.FactureDetail
    newFactureDetail?: APIObjects.FactureDetail
}

class FactureDetails extends React.PureComponent<FactureDetailsProps & WithStyles<classkey>, FactureDetailsState>
{
    static defaultProps: Partial<FactureDetailsProps> = {
        onDeleteItem: () => {},
        onAddItem: () => {},
        onEditItem: () => {}
    }

    ref_form_element = undefined

    constructor(props){
        super(props);
        this.state = {
            editableFactureDetail: undefined,
            newFactureDetail: undefined
        }
    }

    handle_onEdit = () => {
        document.removeEventListener("mousedown", this.handle_checkIfUnEditRequest);
        document.addEventListener("mousedown", this.handle_checkIfUnEditRequest);
    }

    handle_checkIfUnEditRequest = (event: MouseEvent) => {
        let _target = event.target as HTMLElement;
        let _refEle = this.ref_form_element as HTMLElement;

        let _element = _target;
        let _find = false;
        while(_find == false && _element.parentElement != null){
            if(_element == _refEle) _find = true;
            _element = _element.parentElement;
        }

        if(!_find) this.handle_onUnEdit();
    }

    handle_onUnEdit = () => {
        document.removeEventListener("mousedown", this.handle_checkIfUnEditRequest);
        this.setState({
            ...this.state,
            editableFactureDetail: undefined
        })
    }

    render(){
        const { items, canEdit, classes } = this.props;
        return (
            <List>
                {items.map((item, index) => {
                    if(this.state.editableFactureDetail && this.state.editableFactureDetail.__id == item.__id){
                        return (
                            <div 
                                ref={element => this.ref_form_element = element}
                                key={item.__id || item.ordre || index}
                            >
                                <FactureDetailForm 
                                    item={item}
                                    onEdit={this.props.onEditItem}
                                />
                            </div>
                        );
                    } else {
                        return (
                            <FactureDetail 
                                key={item.__id || item.ordre || index}
                                item={item}
                                canDelete={canEdit && item.__canDeleted}
                                canEdit={canEdit && item.__canEdited}
                                onDelete={this.props.onDeleteItem}
                                onEdit={() => {
                                    this.setState({...this.state, editableFactureDetail: item}, () => {
                                        this.handle_onEdit();
                                    })
                                }}
                            />
                        );
                    }
                })}

                {canEdit && !this.state.editableFactureDetail &&
                    <div className={classes.addZone}>
                        <Button 
                            color="primary" 
                            fullWidth
                            onClick={() => {
                                let _detail: APIObjects.FactureDetail = {
                                    __id: Date.now(), 
                                    __canEdited: true, 
                                    __canDeleted: true  
                                }
                                this.setState({
                                    ...this.state,
                                    editableFactureDetail: _detail
                                }, () => {
                                    this.handle_onEdit();
                                    this.props.onAddItem(_detail)
                                })
                            }}
                        >
                            Ajouter un produit / service / remise
                        </Button>
                    </div>
                }
            </List>
        )
    }
}

export default withStyles(styles)(FactureDetails)