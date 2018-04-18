import * as React from "react";

import TestComp from "@shared/Components/TestComp"
import DocumentTitle from "@shared/Components/DocumentTitle"
import Overdrive from "@shared/Services/Overdrive"

require("./index.scss");

export default class Test extends React.PureComponent<any, any>
{
    render(){
        return (
            <DocumentTitle title="Test">
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
            </DocumentTitle>
        )
    }
}


export class Test1 extends React.PureComponent<any, any>
{
    render(){
        return (
            <DocumentTitle title="Deuxième test">
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
            </DocumentTitle>
        )
    }
}