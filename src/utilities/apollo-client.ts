import { ApolloClient, HttpLink, InMemoryCache } from '@apollo/client';

const apolloClient = new ApolloClient({
  ssrMode: true,
  link: new HttpLink({
    uri: import.meta.env.BASE_URL,
    credentials: 'same-origin',
  }),
  cache: new InMemoryCache(),
});

export default apolloClient;
