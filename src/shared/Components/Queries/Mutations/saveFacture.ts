import gql from "graphql-tag"
import { Query } from "react-apollo"

export const saveFacture = gql`
mutation ($facture: FactureInput!) {
    comptabilite {
      saveFacture(facture: $facture) {
        id
        date_creation
        tiers {
          id
        }
        details {
          id
          libelle
          description
          montant
          ordre
        }
        paiements {
          id
          type
          montant
          date_banque
          reference
          banque
          valide
        }
      }
    }
}
`;

export type saveFactureData = {
  comptabilite: {
    saveFacture: APIObjects.Facture
  }
}

export type saveFactureVariables = {
    facture?: APIObjects.Facture
}

export class GraphQLSaveAdherent extends Query<saveFactureData, saveFactureVariables>{ }
