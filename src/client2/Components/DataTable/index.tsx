import * as React from "react";
import { 
    withStyles, StyleRulesCallback, WithStyles,
    Table, TableBody, TableCell, TableFooter, TableHead, TablePagination, TableRow, TableSortLabel
} from "@material-ui/core"

import { Column } from "./classes"

type DataTableClassKey = "root"

const styles: StyleRulesCallback<DataTableClassKey> = theme => ({
    root: {}
})

export type DataTableProps = {
    
    datas: any[]
    columns: Column<any>[]

    filterable?: boolean
    hoverable?: boolean

    onClickRow?: (data: any) => void
    onClickCell?: (data: any, col: Column<any>) => void

} & WithStyles<DataTableClassKey>

class DataTable extends React.PureComponent<DataTableProps, any>
{
    static defaultProps: Partial<DataTableProps> = {
        onClickCell: () => {},
        onClickRow: () => {}
    }

    renderHeader = (columns: Column<any>[], datas: any[]) => {
        return (
            <TableHead>
                <TableRow >
                    {columns.map((col, index) => {
                        let _style: React.CSSProperties = {};
                        if(col.width) {
                            _style.width = col.width;
                        }
                        return (
                            <TableCell 
                                key={col.id}
                                {...col.headerCellProps}
                                style={_style}
                                numeric={col.isNumeric}>
                                {col.Header}
                            </TableCell>
                        )
                    })}
                </TableRow>
            </TableHead>
        );
    }

    renderFooter = (columns: Column<any>[], datas: any[]) => {
        return undefined;
    }

    renderBody = (columns: Column<any>[], datas: any[]) => {
        return (
            <TableBody>
                {datas.map(data => {
                    return (
                        <TableRow 
                            key={data.id}
                            hover={this.props.hoverable}
                            onClick={(ev) => { this.props.onClickRow(data); }}
                            >
                        {columns.map((col, index) => {
                            let _style: React.CSSProperties = {};
                            if(col.width) {
                                _style.width = col.width;
                                _style.paddingLeft = 0;
                                _style.paddingRight = 0;
                            }
                            return (
                                <TableCell 
                                    key={col.id}
                                    {...col.bodyCellProps}
                                    numeric={col.isNumeric}
                                    onClick={(ev) => { this.props.onClickCell(data, col); }}>
                                    {
                                        (typeof(col.accessor) == "function") ? 
                                            col.accessor(data) : 
                                            (col.accessor) ? data[col.accessor] :
                                            undefined
                                    }
                                </TableCell>
                            )
                        })}
                        </TableRow>
                    )
                })}
            </TableBody>
        );
    }

    render(){
        const { classes } = this.props;

        let _cols = this.props.columns
            .filter(col => (col.visible == undefined) ? true : col.visible)
            .sort((a,b) => {
                let _a = a.order || 0;
                let _b = b.order || 0;
                if(_a < _b) return -1;
                if(_a > _b) return 1;
                return 0;
            });

        let _datas = this.props.datas;

        return (
            <Table style={{ width: "100%" }}>
                {this.renderHeader(_cols, _datas)}
                {this.renderBody(_cols, _datas)}
                {this.renderFooter(_cols, _datas)}
            </Table>
        )
    }
}

export default withStyles(styles)(DataTable);