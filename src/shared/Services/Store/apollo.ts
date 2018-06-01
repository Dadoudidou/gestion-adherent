import { ApolloClient } from "apollo-client";
import { HttpLink } from "apollo-link-http";
import { ApolloLink, from } from "apollo-link"
import { InMemoryCache } from "apollo-cache-inmemory"
import { getToken } from "../Auth/index";

const httplink = new HttpLink({
    uri: "/api/graphql"
});

const authMiddleware = new ApolloLink((operation, forward) => {
    operation.setContext(({ headers = {} }) => ({
        headers: {
            ...headers,
            authorization: 'JWT ' + getToken()
        }
    }))
    return forward(operation);
})

const client = new ApolloClient({
    link: from([
        authMiddleware,
        httplink
    ]),
    cache: new InMemoryCache()
});

export default client;