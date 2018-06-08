import gql from "graphql-tag"
import { Query } from "react-apollo"

export const getCampagnes = gql`
  query{
    admin {
      campagnes {
          id
        debut
        fin
        nom
      }
    }
  }
`

type Data = {
  admin: {
    campagnes: APIObjects.Campagne[]
  }
}

export class GetCampagnes extends Query<Data, any>{}