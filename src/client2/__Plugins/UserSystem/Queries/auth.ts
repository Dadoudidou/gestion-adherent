import gql from "graphql-tag";

export const authQuery = gql`
query($username: String!, $password: String!){
    auth(username:$username, password: $password)
}
`;
export type authQueryData = {
    auth: string
}

export type authQueryVariables = {
    username: string,
    password: string
}