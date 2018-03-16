import { ApolloClient } from "apollo-client";
import { HttpLink } from "apollo-link-http";
import { ApolloLink, from } from "apollo-link"
import { InMemoryCache } from "apollo-cache-inmemory"

const httplink = new HttpLink({
    uri: "/api/graphql"
});

const authMiddleware = new ApolloLink((operation, forward) => {
    operation.setContext(({ headers = {} }) => ({
        headers: {
            ...headers,
            authorization: localStorage.getItem('token') || null
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