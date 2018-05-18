import * as React from "react";
import { 
    withStyles, StyleRulesCallback, WithStyles,
    List, ListItem, ListItemText 
} from "material-ui"

type ActivitiesListClassKey = "secondaryElement"

const styles: StyleRulesCallback<ActivitiesListClassKey> = theme => ({
    secondaryElement: { textAlign: "right"  }
})

export type ActivitiesListProps = {
    sections: APIObjects.ActiviteSection[]
} & WithStyles<ActivitiesListClassKey>

class ActivitiesList extends React.PureComponent<ActivitiesListProps, any>
{
    private nbPlacesRestantes = (section: APIObjects.ActiviteSection) => {
        if(!section.sessions) return undefined;
        let _places = 0;
        section.sessions.forEach(session => {
            if(!session.place) return;
            _places += session.place;
        })
        return _places;
    }

    render(){
        const { sections, classes } = this.props;
        return (
            <List dense>
                {sections.map(section => {
                    let _nbplaces = this.nbPlacesRestantes(section);
                    return (
                    <ListItem key={section.id} button>
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
                    </ListItem>
                )})}
            </List>
        )
    }
}

export default withStyles(styles)(ActivitiesList);