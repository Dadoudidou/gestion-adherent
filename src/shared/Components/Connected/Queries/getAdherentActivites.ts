import gql from "graphql-tag"
import { Query } from "react-apollo"

export const getAdherentActivites = gql`
    query($member_id: Int!){
        member {
        member(id:$member_id) {
            id
            adhesions {
            id
            valide
            section {
                id
                nom
                activite {
                id
                nom
                categorie {
                    id
                    nom
                    campagne {
                    id
                    nom
                    }
                }
                }
            }
            tarif {
                id
                montant
            }
            sessions {
                id
                jour
            }
            }
        }
        }
    }
`

type Data = {
    member: {
        member: APIObjects.Adherent
    }
}

type Variables = {
    member_id: number
}

export class GetAdherentActivitesQuery extends Query<Data, Variables>{}
