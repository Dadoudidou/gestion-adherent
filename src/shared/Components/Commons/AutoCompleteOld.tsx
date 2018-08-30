import * as React from "react";
import * as ReactDownShift from "downshift";
import Downshift from "downshift";
import {
    TextField, MenuItem, Paper,
    WithStyles, withStyles, StyleRulesCallback
} from "@material-ui/core"
import { TextFieldProps } from "@material-ui/core/TextField";


type classkey = "root" | "container" | "paper" | "inputRoot"

const styles: StyleRulesCallback<classkey> = theme => ({
    root: {
        flexGrow: 1,
        height: 250,
    },
    container: {
        flexGrow: 1,
        position: 'relative',
    },
    paper: {
        position: 'absolute',
        zIndex: 1,
        marginTop: theme.spacing.unit,
        left: 0,
        right: 0,
    },
    inputRoot: {
        flexWrap: 'wrap',
    },
})

type renderOptionParam = {
    option: any
    index: number
    selectedItem: any
    highlightedIndex: number
}

type AutoCompleteChildProps<T = any> = {
    selectedItem: any
    highlightedIndex: number
    inputValue: string
    getItemProps: (options: ReactDownShift.GetItemPropsOptions) => any
}

type AutoCompleteProps<T = any> = {
    textfieldProps?: TextFieldProps

    value?: any
    onChange?: (value: any) => void

    options?: any[]
    children: (result: AutoCompleteChildProps<T>) => React.ReactNode;

    
    renderOption?: (option: any) => React.ReactNode
}

class AutoComplete extends React.PureComponent<AutoCompleteProps & WithStyles<classkey>, any>
{

    render_option = (params: renderOptionParam) => {
        return (
            <MenuItem>
                aa
            </MenuItem>
        )
    }

    getOptions = (inputValue) => {
        return this.props.options || [];
    }

    render() {
        const { classes } = this.props;
        let ChildComponent = this.props.children;
        return (
            <Downshift>
                {({
                    getInputProps,
                    getItemProps,
                    getLabelProps,
                    inputValue,
                    selectedItem,
                    highlightedIndex,
                    isOpen,
                }) => (
                    <div className={classes.container}>
                        <TextField
                            fullWidth
                            InputProps={{
                                classes: {
                                    root: classes.inputRoot,
                                },
                                ...getInputProps()
                            }}
                            {...this.props.textfieldProps}
                        />
                        {isOpen ? (
                            <Paper className={classes.paper} square>
                                {this.props.children({
                                    highlightedIndex: highlightedIndex,
                                    selectedItem: selectedItem,
                                    inputValue: inputValue,
                                    getItemProps: getItemProps
                                })}
                            </Paper>
                        ) : null}
                    </div>
                )}
            </Downshift>
        )
    }
}

export default withStyles(styles)(AutoComplete);