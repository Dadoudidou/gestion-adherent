import * as React from "react";
import { TableCellProps } from "material-ui/Table/TableCell"

export class Column<T> {
    id?: string
    Header: React.ReactNode | ((props: T) => React.ReactNode)
    accessor: string | ((props: T) => React.ReactNode)
    Cell?: React.ReactNode | ((props: T) => React.ReactNode)
    order?: number
    width?: number
    visible?: boolean
    isNumeric?: boolean
    sortable?: boolean
    sortMethod?: (data: any, filter: any, rows: any) => boolean
    headerCellProps?: TableCellProps
    bodyCellProps?: TableCellProps
    footerCellProps?: TableCellProps
}