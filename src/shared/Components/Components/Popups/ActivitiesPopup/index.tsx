import * as React from "react"
import moment from "moment"
import { 
    withStyles, StyleRulesCallback, WithStyles,
    Drawer, Paper, Typography,
    Dialog, DialogTitle, Button, IconButton,
    Toolbar,
} from "material-ui"
import { DialogProps } from "material-ui/Dialog";

import { ActivitiesListProps, default as ActivitiesList } from "@shared/Components/Components/Lists/ActivitiesList"
import TableSectionSessions from "@shared/Components/Components/Tables/Sessions";
import TableSectionTarifs from "@shared/Components/Components/Tables/Tarifs";

type ActivitiesPopupClassKey = "Drawer" | "DrawerPaper" | "PopUpFrame" | "main" | "DialogTitle" | "AnalyseMessage"

const styles: StyleRulesCallback<ActivitiesPopupClassKey> = theme => ({
    Drawer: {
        overflow: "auto"
    },
    DrawerPaper: { 
        width: 320,
        position: "relative",
        height: "auto",
    },
    PopUpFrame: {
        display: "flex",
        flexGrow: 1,
        zIndex: 1,
        position: "relative",
        width: "100%"
    },
    main: {
        padding: theme.spacing.unit * 2,
        flexGrow: 1,
        background: theme.palette.grey["100"]
    },
    DialogTitle: {
        borderBottom: `1px solid ${theme.palette.divider}`
    },
    AnalyseMessage: {
        padding: theme.spacing.unit * 2
    }
})

type ActivitiesPopupProps = {
    sections: APIObjects.ActiviteSection[]
    open: boolean
    adhesion?: APIObjects.Adherent_Adhesion
    onSave?: (adhesion: APIObjects.Adherent_Adhesion) => void
    onClose?: () => void
} & WithStyles<ActivitiesPopupClassKey>

type ActivitiesPopupState = {
    section: APIObjects.ActiviteSection
    sessionsSelected: APIObjects.ActiviteSession[]
    tarifSelected: APIObjects.Tarif[]
    analyseMessage: string
}

class ActivitiesPopup extends React.PureComponent<ActivitiesPopupProps, ActivitiesPopupState>
{

    static defaultProps: Partial<ActivitiesPopupProps> = {
        onClose: () => {},
        onSave: () => {}
    }

    constructor(props){
        super(props);
        this.state = {
            section: null,
            sessionsSelected: [],
            tarifSelected: [],
            analyseMessage: "",
        };
    }

    componentWillMount(){
        if(this.props.sections && this.props.sections.length > 0){
            this.handle_onSelectSection(this.props.sections[0])
        }
    }

    componentWillReceiveProps(nextProps: ActivitiesPopupProps){

    }

    handle_onSelectSection = (section: APIObjects.ActiviteSection) => {
        this.setState({
            ...this.state,
            section,
            sessionsSelected: [],
            tarifSelected: [],
            analyseMessage: ""
        });
    }

    handle_onSelectSession = (session: APIObjects.ActiviteSession) => {
        let _state = this.state;
        let _index = this.state.sessionsSelected.map(x => x.id).indexOf(session.id);
        if(_index > -1){
            _state = {
                ..._state,
                sessionsSelected: [
                    ...this.state.sessionsSelected.splice(0, _index),
                    ...this.state.sessionsSelected.splice(_index + 1)
                ]
            };
        } else {
            _state = {
                ..._state,
                sessionsSelected: [
                    ...this.state.sessionsSelected,
                    session
                ]
            };
        }

        this.setState(_state, () => {
            this.handle_analyse();
        })
        
    }

    handle_onSelectTarif = (tarif: APIObjects.Tarif) => {
        let _state = this.state;
        let _index = this.state.tarifSelected.map(x => x.id).indexOf(tarif.id);
        if(_index > -1){
            _state = {
                ..._state,
                tarifSelected: []
            };
        } else {
            _state = {
                ..._state,
                tarifSelected: [tarif]
            };
        }

        this.setState(_state, this.handle_analyse);
    }

    handle_filterTarif = (section: APIObjects.ActiviteSection): APIObjects.Tarif[] => {
        if(!this.state.section) return [];
        if(this.state.section.id != section.id) return [];
        let _tarifs = section.tarifs;

        // -- filtre par la date actuelle
        _tarifs = _tarifs.filter(x => {
            if(!x.restriction_date_debut || !x.restriction_date_fin) return true;
            if(moment(x.restriction_date_fin).isBefore(moment())) return false;
            return true;
        });

        // -- filtre par nombre de session sélectionnés
        if(this.state.sessionsSelected.length == 0) return _tarifs;        
        _tarifs = _tarifs.filter(x => {
            if(!x.nbsessionmin || !x.nbsessionmax) return true;
            if(x.nbsessionmin <= this.state.sessionsSelected.length && 
                x.nbsessionmax >= this.state.sessionsSelected.length)
                return true;
            return false;
        });

        return _tarifs;
    }

    handle_save = () => {
        this.props.onSave({
            ...this.props.adhesion,
            section: this.state.section,
            tarif: this.state.tarifSelected[0],
            sessions: this.state.sessionsSelected
        });
    }

    handle_analyse = () => {
        let _state = this.state;
        _state = {..._state, analyseMessage: null};

        // -- désélection du tarif sélectionné si il ne fait plus parti des filtrés
        if(_state.tarifSelected.length > 0){
            let _tarifs = this.handle_filterTarif(_state.section);
            let _index = _tarifs.map(x => x.id).indexOf(_state.tarifSelected[0].id);
            if(_index == -1){
                _state = {..._state, tarifSelected: [] };
            }
        }
        

        // -- vérification de la solution
        if(_state.tarifSelected.length > 0){
            let _tarif = _state.tarifSelected[0];

            // ---- sélection du bon nombre de sessions
            if(_tarif.nbsessionmin && _tarif.nbsessionmax){
                if(_state.sessionsSelected.length < _tarif.nbsessionmin ||
                    _state.sessionsSelected.length > _tarif.nbsessionmax)
                    _state = {..._state, analyseMessage: "Sélectionner les séances auxquelles l'adhérent viendra"};
            }
            
        } else {
            _state = {..._state, analyseMessage: ""}
        }


        if(this.state != _state) this.setState(_state);
    }

    renderDrawer = () => {
        return (
            <Drawer 
                variant="permanent" 
                anchor="left"
                open={true}
                ModalProps={{ keepMounted: true }}
                classes={{ 
                    paper: this.props.classes.DrawerPaper,
                    docked: this.props.classes.Drawer
                }}>
                <ActivitiesList 
                    sections={this.props.sections}
                    sectionSelected={this.state.section}
                    onSelectSection={this.handle_onSelectSection}
                />
            </Drawer>
        )
    }

    renderMain = () => {
        let _tarifs = this.handle_filterTarif(this.state.section);
        
        return (
            <div>
                <Typography variant="subheading" gutterBottom>Séances</Typography>
                <Paper>
                    <TableSectionSessions 
                        sessions={this.state.section.sessions}
                        selectable={true}
                        onSelectSession={this.handle_onSelectSession}
                        sessions_selected={this.state.sessionsSelected}
                    />
                </Paper>
                <br />
                <Typography variant="subheading" gutterBottom>Tarifs</Typography>
                <Paper>
                    <TableSectionTarifs 
                        tarifs={_tarifs}
                        selectable
                        tarif_selected={this.state.tarifSelected}
                        onSelectTarif={this.handle_onSelectTarif}
                    />
                </Paper>
                <br /><br /><br />
                <div style={{textAlign: "center"}}>
                    <Typography className={this.props.classes.AnalyseMessage}>
                        {this.state.analyseMessage}
                    </Typography>
                    <Button 
                        variant="raised" color="primary" 
                        onClick={this.handle_save}
                        disabled={this.state.analyseMessage!=null}>
                        Ajouter l'activité
                    </Button>
                </div>
            </div>
        )
    }

    render(){
        const { open } = this.props;

        return (
            <Dialog open={this.props.open} maxWidth={false} fullWidth>
                <Toolbar classes={{ root: this.props.classes.DialogTitle }}>
                    <DialogTitle style={{ flex: 1 }}>Quelle activité ?</DialogTitle>
                    <IconButton onClick={this.props.onClose} ><i className="fa fa-times" /></IconButton>
                </Toolbar>

                <div className={this.props.classes.PopUpFrame}>
                    {this.renderDrawer()}
                    <main className={this.props.classes.main}>
                        {this.state.section && this.renderMain()}
                    </main>
                </div>
            </Dialog>
        )
    }
}

export default withStyles(styles)(ActivitiesPopup);