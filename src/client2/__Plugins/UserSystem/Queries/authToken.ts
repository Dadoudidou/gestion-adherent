import gql from "graphql-tag";

export const authTokenQuery = gql`
query($token:String!){
    authToken(token:$token){
      id
      nom
      prenom
    }
  }
`;
export type authTokenQueryData = {
    authToken: {
        id: number
        nom: string
        prenom: string
    }
}

export type authTokenQueryVariables = {
    token: string
}