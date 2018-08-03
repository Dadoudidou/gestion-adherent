import gql from "graphql-tag"
import { Query } from "react-apollo"
import { QueryAdhesion } from "../Fragments/Adhesion";

export const setAdhesionsTofactureQuery = gql`
mutation ($facture_id: Int!, $adhesions_ids: [Int]!) {
  comptabilite {
    setAdhesionsTofacture(facture_id: $facture_id, adhesions_ids: $adhesions_ids) {
      id
        adhesions {
            ...AdhesionBase
        }
    }
  }
}
${QueryAdhesion.fragments.base}
`;

export type setAdhesionsTofactureData = {
  comptabilite: {
    setAdhesionsTofacture: APIObjects.Facture
  }
}

export type setAdhesionsTofactureVariables = {
  facture_id: number
  adhesions_ids: number[]
}


