import * as React from "react"
import { 
    Button, List, MenuItem, ListItemIcon, ListItemText,
    withStyles, WithStyles, StyleRulesCallback
} from "material-ui"
import { connect } from "react-redux"
import { IEReducer } from "../../../routes";
import ReduxStore from "@shared/Services/Store/redux"
import * as IE from "@shared/Routes/InscriptionExpress/reducer"
import * as IEStepAdherents from "./../reducer";

type ListAdherentsProps = {
    adherents?: APIObjects.Adherent[]
    adherentSelected?: APIObjects.Adherent
    onSelectAdherent?: (adherent: APIObjects.Adherent) => void
    onAddAdherent?: (adherent?: APIObjects.Adherent) => void
}

type classKey = "ListItemSelected"

const styles: StyleRulesCallback<classKey> = theme => ({
    ListItemSelected: {
        
    }
})

class ListAdherents extends React.PureComponent<ListAdherentsProps & WithStyles<classKey>, any>
{
    static defaultProps: ListAdherentsProps = {
        adherents: [],
        onSelectAdherent: () => {},
        onAddAdherent: () => {}
    }

    handle_onAddAdherent = () => {
        let _adherent: APIObjects.Adherent = undefined;
        if(this.props.adherents.length > 0){
            _adherent = {
                adresse: this.props.adherents[0].adresse,
                ville: this.props.adherents[0].ville,
                codepostal: this.props.adherents[0].codepostal,
                telephone_fixe: this.props.adherents[0].telephone_fixe,
                nom: this.props.adherents[0].nom
            }
        }
        this.props.onAddAdherent(_adherent);
    }

    render(){
        return (
            <div>
                <List>
                    {this.props.adherents.map(adherent => {
                        let _primaryText = "Nouvel adhérent";
                        if( (adherent.nom && adherent.nom.trim() != "") || 
                            (adherent.prenom && adherent.prenom.trim() != "")){
                            _primaryText = `${adherent.nom || ""} ${adherent.prenom || ""}`
                        }
                        return (
                            <MenuItem 
                                key={adherent.__id}
                                selected={this.props.adherentSelected && this.props.adherentSelected.__id == adherent.__id}
                                onClick={() => {
                                    this.props.onSelectAdherent(adherent);
                                }}
                            >
                                <ListItemText primary={_primaryText} />
                            </MenuItem>
                        )
                    })}
                </List>
                <Button fullWidth variant="flat" color="primary" onClick={this.handle_onAddAdherent}>
                    Ajouter un adhérent
                </Button>
            </div>
        )
    }
}


export default connect<ListAdherentsProps, ListAdherentsProps, any, IEReducer>(
    (state, props) => ({
        adherents: state.InscriptionExpress.adherents,
        adherentSelected: state.InscriptionExpress.adherents[state.InscriptionExpressStepAdherents.adherentSelected]
    }),
    (dispatch) => ({
        onAddAdherent: (adherent) => {
            let __id = Date.now();
            dispatch(IE.Actions.addAdherent({ __id, ...adherent }));
            setTimeout(() => {
                let _state: IEReducer = ReduxStore.getState() as any;
                let _index = _state.InscriptionExpress.adherents.map(x => x.__id).indexOf(__id);
                dispatch(IEStepAdherents.Actions.selectAdherent(_index));
            }, 200);
            
        },
        onSelectAdherent: (adherent) => {
            let _state: IEReducer = ReduxStore.getState() as any;
            let _index = _state.InscriptionExpress.adherents.map(x => x.__id).indexOf(adherent.__id);
            dispatch(IEStepAdherents.Actions.selectAdherent(_index));
        }
    })
)(withStyles(styles)(ListAdherents));