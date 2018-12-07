import * as React from 'react'
import gql from 'graphql-tag';
import { Mutation } from 'react-apollo';
import Authenticated from '@client/System/Auth/Authenticated';

const upload_file = gql`
    mutation import_file($file: Upload!){
        adm_import_adherents_file(file: $file)
    }
`;

type ImportAdherentRouteProps = {}

class ImportAdherentRoute extends React.PureComponent<ImportAdherentRouteProps, any>{
    render(){
        return (
            <div>
                {/*<Authenticated>*/}
                    <Mutation mutation={upload_file}>
                        {uploadFile => (
                            <input 
                                type="file" 
                                required
                                onChange={(ev) => {
                                    uploadFile({
                                        variables: { file: ev.target.files[0] }
                                    })
                                }}
                            />
                        )}
                    </Mutation>
                {/*</Authenticated>*/}
            </div>
        )
    }
}
export default ImportAdherentRoute