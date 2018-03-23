import * as React from "react";

import TestComp from "@shared/Components/TestComp"

export default class Test extends React.PureComponent<any, any>
{
    render(){
        return (
            <div>
                <i className="fa fa-gear fa-spin" /> Test Page 2
                <TestComp />
            </div>
        )
    }
}