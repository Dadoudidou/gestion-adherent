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
        if(this.props.children){
            return React.Children.only(this.props.children);
        } else {
            return null;
        }
    }
}