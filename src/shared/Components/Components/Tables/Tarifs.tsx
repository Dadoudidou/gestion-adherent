import * as React from "react";
import * as moment from "moment";
import { 
    withStyles, StyleRulesCallback, WithStyles,
    Typography,
    Checkbox
} from "@material-ui/core"

import DataTable from "@shared/Components/Commons/DataTable"
import { Column } from "../../Commons/DataTable/classes";
import { descriptionTarif, dureeTarif } from "../../Utils/Tarifs";

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
                        <Typography>{descriptionTarif(tarif)}</Typography>
                        <Typography variant="caption">{dureeTarif(tarif)}</Typography>
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