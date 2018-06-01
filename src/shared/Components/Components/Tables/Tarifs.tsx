import * as React from "react";
import moment from "moment";
import { 
    withStyles, StyleRulesCallback, WithStyles,
    Typography,
    Checkbox
} from "material-ui"

import DataTable from "@shared/Components/Commons/DataTable"
import { Column } from "../../Commons/DataTable/classes";

type SectionTarifsClassKey = "root"

const styles: StyleRulesCallback<SectionTarifsClassKey> = theme => ({
    root: {}
})

export type SectionTarifsProps = {
    tarifs: APIObjects.Tarif[]
    selectable?: boolean
    tarif_selected?: APIObjects.Tarif[]
    onSelectTarif?: (tarif: APIObjects.Tarif) => void
} & WithStyles<SectionTarifsClassKey>

class SectionTarifs extends React.PureComponent<SectionTarifsProps, any>
{
    static descriptionTarif = (tarif: APIObjects.Tarif): string => {
        let _desc = "";
        if(tarif.carte){
            _desc = `Carte de ${tarif.carte_nbsession} séance${tarif.carte_nbsession > 1 ? 's' : ''}`
        } else {
            if(tarif.nbsessionmin && tarif.nbsessionmax){
                if(tarif.nbsessionmin == tarif.nbsessionmax){
                    _desc = `${tarif.nbsessionmin} séance${tarif.nbsessionmin > 1 ? 's' : ''}`;
                } else {
                    _desc = `de ${tarif.nbsessionmin} à ${tarif.nbsessionmax} séances`
                }
                _desc += ` / semaine`;
            } else {
                _desc = `Toutes séances`
            }
        }
        return _desc;
    }

    static dureeTarif = (tarif: APIObjects.Tarif): string => {
        let _desc = "";
        if(tarif.restriction_date_debut && tarif.restriction_date_fin){
            _desc = `du ${moment(tarif.restriction_date_debut).utc().format("ll")} au ${moment(tarif.restriction_date_fin).utc().format("ll")}`;
        } else {
            _desc = "Tarif annuel"
        }
        return _desc;
    }

    static defaultProps: Partial<SectionTarifsProps> = {
    }

    render(){
        const { tarifs, classes } = this.props;

        let _columns: Column<APIObjects.Tarif>[] = [];

        if(this.props.selectable){
            // -- checkbox
            _columns.push({
                id: "checkbox",
                Header: "",
                accessor: (tarif) => {
                    let _index = this.props.tarif_selected.map(x => x.id).indexOf(tarif.id);
                    return (
                        <Checkbox checked={_index > -1} />
                    )
                },
                bodyCellProps: { padding: "checkbox" },
                headerCellProps: { padding: "checkbox" },
                width: 1
            })
        }
        // -- description
        _columns.push({
            id: "description",
            Header: "Description",
            accessor: (tarif: APIObjects.Tarif) => {

                return (
                    <div>
                        <Typography>{SectionTarifs.descriptionTarif(tarif)}</Typography>
                        <Typography variant="caption">{SectionTarifs.dureeTarif(tarif)}</Typography>
                    </div>
                )
            }
        });
        // -- montant
        _columns.push({
            id: "tarif",
            Header: "Tarif",
            isNumeric: true,
            accessor: (tarif: APIObjects.Tarif) => (
                <Typography>{tarif.montant} €</Typography>
            )
        })

        return (
            <div>
                <DataTable 
                    columns={_columns}
                    datas={tarifs}
                    hoverable={this.props.selectable}
                    onClickRow={this.props.onSelectTarif}
                />
            </div>
        )
    }
}

export default withStyles(styles)(SectionTarifs);