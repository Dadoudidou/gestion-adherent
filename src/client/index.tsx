import * as React from "react";
import * as ReactDOM from "react-dom";

import App from "./../shared";

class Main extends React.PureComponent<any, any>
{
    render(){
        return (
            <div>
                <App {...this.props} />
            </div>
        )
    }
}

ReactDOM.render(<Main />, document.getElementById("root"));