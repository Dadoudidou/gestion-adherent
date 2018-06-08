import gql from "graphql-tag"
import { Query } from "react-apollo"

export const getActiviteSections = gql`
    query($campagne_id: Int) {
        admin {
            sections(campagne_id:$campagne_id) {
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
                        }
                    }
                }
                sessions {
                    id
                    jour
                    heure_debut
                    heure_fin
                    place
                    lieu {
                        id
                        nom
                    }
                }
                tarifs {
                    id
                    montant
                    nbsessionmin
                    nbsessionmax
                    carte
                    carte_nbsession
                    restriction_date_debut
                    restriction_date_fin
                }
            }
        }
    }
`

type Data = {
    admin: {
        sections: APIObjects.ActiviteSection[]
    }
}

type Variables = {
    campagne_id?: number
}

export class GetActiviteSections extends Query<Data, Variables>{ }
