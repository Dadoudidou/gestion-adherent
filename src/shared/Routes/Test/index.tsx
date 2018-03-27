import * as React from "react";

import TestComp from "@shared/Components/TestComp"
import Overdrive from "@shared/Services/Overdrive"

require("./index.scss");

export default class Test extends React.PureComponent<any, any>
{
    render(){
        return (
            <div>
                <Overdrive id="test">
                    <div className="bg block">
                        Page Test
                    </div>
                </Overdrive>
                <p>
                    Simple test
                </p>
            </div>
        )
    }
}


export class Test1 extends React.PureComponent<any, any>
{
    render(){
        return (
            <div>
                <Overdrive id="test">
                    <div className="bg">
                        Page Test 2
                    </div>
                </Overdrive>
                <p>
                    Simple test 2
                </p>
            </div>
        )
    }
}