//import ApolloClient, { gql } from "apollo-boost";
import { ApolloClient } from "apollo-client"
import { HttpLink } from "apollo-link-http";
import { createHttpLink } from "apollo-link-http"
import { setContext } from "apollo-link-context"
import { InMemoryCache } from "apollo-cache-inmemory"
import { getToken } from "../Auth/index";
import { ApolloLink, Observable } from "apollo-link"
import { createUploadLink } from "apollo-upload-client"


// -- Cache System
let _cache = new InMemoryCache();

// -- Request Auth
let _request = async (operation) => {
    const token = await getToken();
    operation.setContext({
        headers: {
            authorization: 'JWT ' + token
        }
    })
}

let _requestLink = new ApolloLink((operation, forward) => 
    new Observable(observer => {
        let _handle;
        Promise.resolve(operation)
            .then(oper => _request(oper))
            .then(() => {
                _handle = forward(operation).subscribe({
                    next: observer.next.bind(observer),
                    error: observer.error.bind(observer),
                    complete: observer.complete.bind(observer)
                });
            })
            .catch(observer.error.bind(observer));
        return () => {
            if(_handle) _handle.unsubscribe();
        }
    })
)

const client = new ApolloClient({
    cache: _cache,
    link: ApolloLink.from([
        _requestLink,
        createUploadLink({
            uri: "/api_v1/graphql",
            credentials: "include"
        })
    ])
})


/*
const client = new ApolloClient({
    uri: "/api_v1/graphql",
    request: async operation => {
        const token = getToken();
        operation.setContext({
            headers: {
                authorization: 'JWT ' + token
            }
        })
    },
    cache: _cache as any,
    link: ApolloLink.from([
        createUploadLink()
    ])
} as any)*/


export default client;