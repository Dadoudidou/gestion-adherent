import * as React from "react";
import * as moment from "moment";
import { 
    withStyles, StyleRulesCallback, WithStyles,
    Typography,
    Checkbox
} from "material-ui"

import DataTable from "@shared/Components/Commons/DataTable"
import { Column } from "../../Commons/DataTable/classes";

type SectionSessionsClassKey = "root"

const styles: StyleRulesCallback<SectionSessionsClassKey> = theme => ({
    root: {}
})

export type SectionSessionsProps = {
    sessions: APIObjects.ActiviteSession[]

    selectable?: boolean
    sessions_selected?: APIObjects.ActiviteSession[]
    onSelectSession?: (session: APIObjects.ActiviteSession) => void
    
} & WithStyles<SectionSessionsClassKey>

class SectionSessions extends React.PureComponent<SectionSessionsProps, any>
{
    static defaultProps: Partial<SectionSessionsProps> = {
        sessions_selected: []
    }

    render(){
        const { sessions, classes } = this.props;

        let _columns: Column<APIObjects.ActiviteSession>[] = [];

        if(this.props.selectable){
            // -- checkbox
            _columns.push({
                id: "checkbox",
                Header: "",
                accessor: (session: APIObjects.ActiviteSession) => {
                    let _index = this.props.sessions_selected.map(x => x.id).indexOf(session.id);
                    return (
                        <Checkbox checked={_index > -1} />
                    )
                },
                bodyCellProps: { padding: "checkbox" },
                headerCellProps: { padding: "checkbox" },
                width: 1
            })
        }
        // -- séances
        _columns.push({
            id: "seances",
            Header: "Séances",
            accessor: (session: APIObjects.ActiviteSession) => {
                let _dateD = moment().day(session.jour).startOf("day").add(moment.duration(session.heure_debut));
                let _dateF = moment().day(session.jour).startOf("day").add(moment.duration(session.heure_fin));
                return (
                    <div>
                        <Typography>{_dateD.format("dddd")} de {_dateD.format("LT")} à {_dateF.format("LT")}</Typography>
                        <Typography variant="caption">{session.lieu.nom}</Typography>
                    </div>
                )
            }
        });
        // -- places restantes
        _columns.push({
            id: "places",
            Header: "Places restantes",
            isNumeric: true,
            accessor: (session: APIObjects.ActiviteSession) => ""
        })

        return (
            <div>
                <DataTable 
                    hoverable={this.props.selectable}
                    columns={_columns}
                    datas={sessions}
                    onClickRow={this.props.onSelectSession}
                />
            </div>
        )
    }
}

export default withStyles(styles)(SectionSessions);