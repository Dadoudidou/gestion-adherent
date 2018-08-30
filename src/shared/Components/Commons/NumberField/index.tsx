import * as React from "react";
import { TextFieldProps } from "@material-ui/core/TextField";
import { TextField } from "@material-ui/core"

type NumberFieldProps = {

} & TextFieldProps

type NumberFieldState = {
    value: any
}

class NumberField extends React.PureComponent<NumberFieldProps, NumberFieldState>
{
    constructor(props){
        super(props);
        this.state = { value: undefined }
    }

    componentWillMount(){
        if(this.props.value && !isNaN(parseFloat(this.props.value as any))){
            this.setState({ value: this.props.value });
        }
    }

    componentWillReceiveProps(nextProps: NumberFieldProps){
        if(nextProps.value && !isNaN(parseFloat(nextProps.value as any))){
            this.setState({ value: nextProps.value });
        }
    }

    render(){
        const { ...txtProps } = this.props;
        return (
            <TextField 
                {...txtProps}
                value={ this.state.value != undefined ? this.state.value : "" }
                onChange={event => {
                    event.persist();
                    this.setState({
                        ...this.state,
                        value: event.target.value
                    }, () => {
                        if(txtProps.onChange) txtProps.onChange(event);
                    })
                }}
            />
        )
    }
}

export default NumberField;