import { ApolloClient, createHttpLink, InMemoryCache } from "@apollo/client";

const apolloClient = new ApolloClient({
  ssrMode: true,
  link: createHttpLink({
    uri: process.env.BASE_URL,
    credentials: "same-origin",
    //   headers: {
    //     cookie: req.header('Cookie'),
    //   },
  }),
  cache: new InMemoryCache(),
});

export default apolloClient;
