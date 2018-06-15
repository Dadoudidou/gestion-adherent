import gql from "graphql-tag"
import { Query } from "react-apollo"

export const searchAdherents = gql`
query($member_nom: String, $member_limit: Int){
    member {
      members(nom:$member_nom,limit:$member_limit) {
        id
        nom
        prenom
        datenaissance
        adresse
        codepostal
        ville
        telephone_fixe
        telephone_mobile
        email
      }
    }
}
`

type Data = {
    member: {
        members: APIObjects.Adherent[]
    }
}

type Variables = {
    member_nom?: string
    member_limit?: number
}

export class SearchAdherentsQuery extends Query<Data, Variables>{}
