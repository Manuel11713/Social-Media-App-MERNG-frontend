import { ApolloClient, InMemoryCache,  HttpLink, ApolloLink, concat} from '@apollo/client';

const httpLink = new HttpLink({ uri: process.env.REACT_APP_GRAPHQLSERVER });

const authMiddleware = new ApolloLink((operation, forward) => {
  // add the authorization to the headers
  let token = localStorage.getItem('token');
  operation.setContext({
    headers: {
      authorization: token? `Bearer ${token}` : null,
    }
  });

  return forward(operation);
})

const client = new ApolloClient({
  link: concat(authMiddleware, httpLink),
  cache: new InMemoryCache()
});


export default client;