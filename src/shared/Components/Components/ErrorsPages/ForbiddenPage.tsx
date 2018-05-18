import * as React from "react";

import DocumentTitle from "@shared/Components/Commons/DocumentTitle";

class ForbiddenPage extends React.PureComponent<any, any>
{
    render(){
        return (
            <DocumentTitle title="Accès non autorisé">
                <div>
                Accès non autorisé
                </div>
            </DocumentTitle>
        )
    }
}

export default ForbiddenPage;