import gql from "graphql-tag"
import { Query } from "react-apollo"

export const saveTiers = gql`
mutation ($tiers: TiersInput!) {
  comptabilite {
    saveTiers(tiers: $tiers) {
      id
      nom
      prenom
      adresse
      codepostal
      ville
      telephone_fixe
      telephone_mobile
      email
    }
  }
}
`;

export type saveTiersData = {
  comptabilite: {
    saveTiers: APIObjects.Tiers
  }
}

export type saveTiersVariables = {
  tiers?: APIObjects.Tiers
}

export class GraphQLSaveAdherent extends Query<saveTiersData, saveTiersVariables>{ }
