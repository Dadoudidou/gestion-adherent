import * as React from "react"

import * as Queries from "@shared/Components/Connected/Queries";
import AutoComplete from "@shared/Components/Commons/AutoComplete";

import { MenuItem } from "@material-ui/core"
import { TextFieldProps } from "@material-ui/core/TextField";
import { PaperProps } from "@material-ui/core/Paper";


type ComponentProps = {
    textFieldProps?: TextFieldProps
    paperProps?: PaperProps
    inputValue?: string
    onInputValueChange?: (inputValue: string) => void
    onSelect?: (selectedItem: any) => void
    onChange?: (selectedItem: any) => void
}


export default class AutoCompleteAdherents extends React.PureComponent<ComponentProps , any>
{
    render(){
        return (
            <AutoComplete
                paperProps={this.props.paperProps}
                textFieldProps={this.props.textFieldProps}
                inputValue={this.props.inputValue}
                onInputValueChange={this.props.onInputValueChange}
                onSelect={this.props.onSelect}
                onChange={this.props.onChange}
            >
                {({ getItemProps, highlightedIndex, inputValue, selectedItem }) => (
                    <Queries.SearchAdherentsQuery
                        query={Queries.searchAdherents}
                        variables={{
                            member_limit: 10, member_nom: inputValue
                        }}
                        skip={ !inputValue || inputValue==""}
                    >
                        {(datas) => {
                            if(datas.loading) return <div>loading...</div>
                            if(datas.error) return <div>error...</div>
                            return (
                                datas.data.member.members.map((x, index) => (
                                    <MenuItem
                                        {...getItemProps({
                                            item: x, index
                                        })}
                                        key={x.id}
                                        selected={highlightedIndex == index}
                                        component="div"
                                    >
                                        {x.nom} {x.prenom}
                                    </MenuItem>
                                ))
                            )
                        }}
                    </Queries.SearchAdherentsQuery>
                )}
            </AutoComplete>
        )
    }
}

