import * as React from "react";
import { 
    withStyles, StyleRulesCallback, WithStyles,
    List, ListItem, ListItemText ,
    Menu, MenuItem, MenuList
} from "@material-ui/core"

type ActivitiesListClassKey = "secondaryElement" | "selectedItem" | "item"

const styles: StyleRulesCallback<ActivitiesListClassKey> = theme => ({
    secondaryElement: { textAlign: "right"  },
    selectedItem: {
        background: theme.palette.secondary.dark,
        color: theme.palette.secondary.light
    },
    item: {
        paddingTop: theme.spacing.unit * 2,
        paddingBottom: theme.spacing.unit * 2
    }
})

export type ActivitiesListProps = {
    sections: APIObjects.ActiviteSection[]
    sectionSelected?: APIObjects.ActiviteSection
    onSelectSection?: (section: APIObjects.ActiviteSection) => void
} & WithStyles<ActivitiesListClassKey>

class ActivitiesList extends React.PureComponent<ActivitiesListProps, any>
{
    static defaultProps: Partial<ActivitiesListProps> = {
        onSelectSection: () => {}
    }

    private nbPlacesRestantes = (section: APIObjects.ActiviteSection) => {
        if(!section.sessions) return undefined;
        let _places = 0;
        section.sessions.forEach(session => {
            if(!session.place) return;
            _places += session.place;
        })
        return _places;
    }

    onSelect = (section: APIObjects.ActiviteSection) => {
        if(this.props.onSelectSection){
            this.props.onSelectSection(section);
        }
    }

    render(){
        const { sections, classes, sectionSelected } = this.props;
        return (
            <MenuList dense disablePadding={false}>
                {sections.map(section => {
                    let _nbplaces = this.nbPlacesRestantes(section);
                    return (
                    <MenuItem 
                        key={section.id} button classes={{ root: classes.item }}
                        selected={sectionSelected ? sectionSelected.id == section.id : false}
                        onClick={() => { this.onSelect(section) }}>
                        <ListItemText 
                            primary={section.nom}
                            secondary={`${section.activite.categorie.nom} / ${section.activite.nom}`}
                        />
                        <ListItemText 
                            classes={{ root: classes.secondaryElement }}
                            primary={
                                _nbplaces ? `${_nbplaces} places` : undefined
                            }
                        />
                    </MenuItem>
                )})}
            </MenuList>
        )
    }
}

export default withStyles(styles)(ActivitiesList);