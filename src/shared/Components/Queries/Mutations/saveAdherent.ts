import gql from "graphql-tag"
import { Query } from "react-apollo"

export const saveAdherentMutation = gql`
mutation ($member: AdherentInput!) {
    member {
      saveMember(member: $member) {
        id
        nom
        prenom
        datenaissance
        male
        adresse
        codepostal
        ville
        numero_licence
        telephone_fixe
        telephone_mobile
        email
      }
    }
}  
`;

export type saveAdherentMutationData = {
    member: {
        saveMember: APIObjects.Adherent
    }
}

export type saveAdherentMutationVariables = {
    member?: APIObjects.Adherent
}

export class GraphQLSaveAdherent extends Query<saveAdherentMutationData, saveAdherentMutationVariables>{ }
