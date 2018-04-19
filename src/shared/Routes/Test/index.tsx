import * as React from "react";

import TestComp from "@shared/Components/TestComp"
import DocumentTitle from "@shared/Components/DocumentTitle"
import Overdrive from "@shared/Services/Overdrive"

import Authenticated from "@shared/Services/Auth/Authenticated"

import { Button } from "material-ui"

require("./index.scss");

export default class Test extends React.PureComponent<any, any>
{
    render(){
        return (
            <Authenticated>
                <DocumentTitle title="Test">
                    <div>
                        <Button>Menu 1</Button>
                        <Button>Menu 2</Button>
                        <Button>Menu 3</Button>
                        <Button>Menu 4</Button>
                    </div>
                </DocumentTitle>
            </Authenticated>
        )
    }
}


export class Test1 extends React.PureComponent<any, any>
{
    render(){
        return (
            <Authenticated>
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
            </Authenticated>
        )
    }
}