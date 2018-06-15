import * as React from "react"
import * as ReactDownShift from "downshift";
import Downshift from "downshift";
import { 
    MenuItem, TextField, Paper ,
    WithStyles, withStyles, StyleRulesCallback
} from "material-ui"
import { TextFieldProps } from "material-ui/TextField";
import { PaperProps } from "material-ui/Paper";
import { MenuItemProps } from "material-ui/Menu";

type classkey = "container" | "paper" | "inputRoot"

const styles: StyleRulesCallback<classkey> = theme => ({
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

type AutoCompleteChildrenOptions = {
    inputValue: string,
    getItemProps: (options: ReactDownShift.GetItemPropsOptions) => any,
    selectedItem: any,
    highlightedIndex: number
}

type AutoCompleteProps = {
    textFieldProps?: TextFieldProps
    paperProps?: PaperProps
    menuItemProps?: MenuItemProps

    inputValue?: string
    onInputValueChange?: (inputValue: string) => void
    onSelect?: (selectedItem: any) => void
    onChange?: (selectedItem: any) => void

    children: (options: AutoCompleteChildrenOptions) => React.ReactNode
}


class AutoComplete extends React.PureComponent<AutoCompleteProps & WithStyles<classkey>, any>
{

    render(){
        const { classes } = this.props;
        return (
            <Downshift
                onInputValueChange={this.props.onInputValueChange}
                onSelect={this.props.onSelect}
                onChange={this.props.onChange}
                inputValue={this.props.inputValue}
                selectedItem={this.props.inputValue}
            >
                {({ getInputProps, getItemProps, isOpen, inputValue, selectedItem, highlightedIndex }) => (
                    <div className={classes.container}>

                        <TextField
                            fullWidth
                            InputProps={{
                                ...getInputProps(),
                                classes: { root: classes.inputRoot }
                            }}
                            {...this.props.textFieldProps}
                        />

                        {isOpen ? (
                            <Paper classes={{ root: classes.paper }} square {...this.props.paperProps}>

                                {this.props.children({
                                    inputValue,
                                    getItemProps,
                                    selectedItem,
                                    highlightedIndex
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