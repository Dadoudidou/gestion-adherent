import * as React from "react"
import { 
    Button, List, MenuItem, ListItemIcon, ListItemText,
    Tab, Tabs,
    withStyles, WithStyles, StyleRulesCallback
} from "material-ui"

import EditAdherentInfo from "@shared/Components/Components/Adherent/EditAdherentInfo"
import ListAdherentActivites from "@shared/Components/Connected/Adherent/ListAdherentActivites"
import ActivitiesPopup from "@shared/Components/Connected/Popups/ActivitiesPopup"

import { connect } from "react-redux"
import { IEReducer } from "../../../routes";
import * as IE from "@shared/Routes/InscriptionExpress/reducer"
import * as IEStepAdherents from "./../reducer";

export type IEViewAdherentTabValue = "infos" | "activites"

type ViewAdherentProps = {
    adherentSelected?: APIObjects.Adherent
    onUpdateAdherent?: (adherent: APIObjects.Adherent) => void

    selectedTab?: IEViewAdherentTabValue
    onSelectTab?: (tab: IEViewAdherentTabValue) => void
    
    popupActivitesOpened?: boolean
    popupCampagne_id?: number
    popupAdhesion?: APIObjects.Adherent_Adhesion
    OpenPopupActivites?: (open: boolean | { campagne_id: number, adhesion?: APIObjects.Adherent_Adhesion }) => void
}

type classKey = "tabContainer"

const styles: StyleRulesCallback<classKey> = theme => ({
    tabContainer: {
        padding: theme.spacing.unit * 2
    }
})

class ViewAdherent extends React.PureComponent<ViewAdherentProps & WithStyles<classKey>, any>
{
    static defaultProps: ViewAdherentProps = {
        adherentSelected: undefined,
        onUpdateAdherent: () => {},
        selectedTab: "infos",
        OpenPopupActivites: () => {},
        popupActivitesOpened: false
    }

    handle_onUpdateAdherent = (adherent: APIObjects.Adherent) => {
        this.props.onUpdateAdherent(adherent);
    }

    handle_onClickAddActivite = (campagne: APIObjects.Campagne) => {
        this.props.OpenPopupActivites({
            campagne_id: campagne.id
        });
    }

    handle_onSaveAddActivite = (adhesion: APIObjects.Adherent_Adhesion) => {
        let _adherent = this.props.adherentSelected;
        let _insert = true;
        if(adhesion.__id){
            let _index = (_adherent.adhesions || []).map(x => x.__id).indexOf(adhesion.__id);
            if(_index > -1){
                _insert = false;
                _adherent = {
                    ..._adherent,
                    adhesions: _adherent.adhesions.map((x, index) => {
                        if(index != _index) return x;
                        return adhesion;
                    })
                }
            }
        }
        if(_insert){
            _adherent = { 
                ..._adherent, 
                adhesions: [
                    ...(_adherent.adhesions || []), 
                    { ...adhesion, __id: Date.now() }
                ] 
            }
        }
        this.props.onUpdateAdherent(_adherent);
        this.props.OpenPopupActivites(false);
    }

    handle_onSelectActivite = (adhesion: APIObjects.Adherent_Adhesion) => {
        this.props.OpenPopupActivites({
            campagne_id: adhesion.section.activite.categorie.campagne.id,
            adhesion: adhesion
        });
    }

    render(){
        if(!this.props.adherentSelected) return <div></div>
        return (
            <div>
                <Tabs value={this.props.selectedTab} onChange={(event, value) => this.props.onSelectTab(value)}>
                    <Tab value="infos" label="Informations" />
                    <Tab value="activites" label="Activités" />
                </Tabs>
                <div className={this.props.classes.tabContainer}>
                    {this.props.selectedTab == "infos" && 
                        <EditAdherentInfo 
                            adherent={this.props.adherentSelected}
                            onUpdateAdherent={this.handle_onUpdateAdherent}
                        />
                    }
                    {this.props.selectedTab == "activites" &&
                        <ListAdherentActivites 
                            adherent={this.props.adherentSelected}
                            onClickAddActivite={this.handle_onClickAddActivite}
                            onSelectActivite={this.handle_onSelectActivite}
                        />
                    }
                </div>
                <ActivitiesPopup
                    campagne_id={this.props.popupCampagne_id}
                    adhesion={this.props.popupAdhesion}
                    open={this.props.popupActivitesOpened}
                    onClose={() => { this.props.OpenPopupActivites(false) }}
                    onSave={this.handle_onSaveAddActivite}
                />
            </div>
        )
    }
}


export default connect<ViewAdherentProps, ViewAdherentProps, any, IEReducer>(
    (state, props) => ({
        adherentSelected: state.InscriptionExpress.adherents[state.InscriptionExpressStepAdherents.adherentSelected],
        selectedTab: state.InscriptionExpressStepAdherents.tab_index,
        popupActivitesOpened: state.InscriptionExpressStepAdherents.popupActivitesOpened,
        popupCampagne_id: state.InscriptionExpressStepAdherents.popupCampagne_id,
        popupAdhesion: state.InscriptionExpressStepAdherents.popupAdhesion_Selected
    }),
    (dispatch) => ({
        onUpdateAdherent: (adherent) => { dispatch(IE.Actions.updateAdherent(adherent)) },
        onSelectTab: (tab) => dispatch(IEStepAdherents.Actions.selectTab(tab)),
        OpenPopupActivites: (open) => dispatch(IEStepAdherents.Actions.openPopupActivites(open)),
    })
)(withStyles(styles)(ViewAdherent));