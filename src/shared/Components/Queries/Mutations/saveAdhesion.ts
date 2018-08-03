import gql from "graphql-tag"
import { Query } from "react-apollo"

export const saveAdhesionMutation = gql`
mutation ($adhesion: AdhesionInput!) {
    member {
      saveAdhesion(adhesion: $adhesion){
        id
        valide
        adherent {
          id
        }
        section {
          id
        }
        tarif {
          id
        }
        sessions {
          id
        }
      }
    }
}
`;

export type saveAdhesionMutationData = {
    member: {
        saveAdhesion: APIObjects.Adherent_Adhesion
    }
}

export type saveAdhesionMutationVariables = {
    adhesion?: APIObjects.Adherent_Adhesion
}

export class GraphQLSaveAdherent extends Query<saveAdhesionMutationData, saveAdhesionMutationVariables>{ }
