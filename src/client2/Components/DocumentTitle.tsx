import * as React from "react";

type DocumentTitleProps = {
    title: string
}

export default class DocumentTitle extends React.PureComponent<DocumentTitleProps, any>
{
    componentWillMount(){
        document.title = this.props.title;
    }
    render(){
        return this.props.children;
    }
}