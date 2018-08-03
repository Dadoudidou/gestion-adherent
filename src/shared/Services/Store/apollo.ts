import ApolloClient, { gql } from "apollo-boost";
import { HttpLink } from "apollo-link-http";
import { createHttpLink } from "apollo-link-http"
import { setContext } from "apollo-link-context"
import { InMemoryCache } from "apollo-cache-inmemory"
import { getToken } from "../Auth/index";

const httplink = createHttpLink({
    uri: "/api/graphql"
});

const authLink = setContext((_, { headers }) => {
    // get the authentication token from local storage if it exists
    const token = localStorage.getItem('token');
    // return the headers to the context so httpLink can read them
    return {
        headers: {
            ...headers,
            authorization: 'JWT ' + getToken()
        }
    }
});

let _cache = new InMemoryCache();

/*
const authMiddleware = new ApolloLink((operation, forward) => {
  operation.setContext(({ headers = {} }) => ({
      headers: {
          ...headers,
          authorization: 'JWT ' + getToken()
      }
  }))
  return forward(operation);
})*/

const client = new ApolloClient({
    uri: "/api/graphql",
    request: async operation => {
        const token = getToken();
        operation.setContext({
            headers: {
                authorization: 'JWT ' + token
            }
        })
    },
    clientState: {
        defaults: {
            Facture: undefined
        },
        resolvers: {
            Mutation: {
                updateFacture:(_, { Facture }, {cache}) => {

                    let query = gql`query { comptabilite { Facture(id:${Facture.id}) { id, paiements { _id, montant } } } }`;
                    console.log(cache);
                    let res = cache.readQuery({ query, variables: { fature_id: Facture.id } });
                    console.log("readQuery", res);

                    for(let i=0; i<Facture.paiements.length; i++){
                        res.comptabilite.Facture.paiements.push(Facture.paiements[i])
                    }

                    //res.comptabilite.Facture.paiements.concat(Facture.paiements);

                    /*res.comptabilite.Facture.paiements.push({
                        id:20,
                        __typename: "FacturePaiement",
                        montant: 20
                    })*/

                    let rep = cache.writeQuery({
                        query,
                        data: res
                    });

                    console.log(rep);

                    res = cache.readQuery({ query, variables: { fature_id: Facture.id } });
                    console.log("readQuery", res);


                    /*let _res = cache.writeQuery({
                        query: gql`query { Facture(id: 4){ id, paiments { id, montant } } }`,
                        data: {
                            paiements: Facture.paiements
                        }
                    })
                    console.log(cache);*/
                },
            }
        }
    },
    //link: authLink.concat(httplink) as any,
    cache: _cache as any,
} as any)

/*const client = new ApolloClient({
    link: authLink,
    cache: new InMemoryCache()
});*/

export default client;