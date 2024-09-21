import {
  ApolloClient,
  ApolloLink,
  HttpLink,
  InMemoryCache,
  NormalizedCacheObject,
  split,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { getMainDefinition } from "@apollo/client/utilities";

// Create auth link to attach the token to headers
const createAuthLink = (token?: string) =>
  setContext((_, { headers }) => {
    return {
      headers: {
        ...headers,
        authorization: token ? `Bearer ${token}` : "", // Attach token if available
      },
    };
  });

// HttpLink for the default API endpoint
const defaultHttpLink = new HttpLink({
  uri: "https://api.bettermode.com", // Default API endpoint
  credentials: "same-origin",
});

// HttpLink for the second API endpoint
const globalHttpLink = new HttpLink({
  uri: "https://api.bettermode.com/global", // Global API endpoint
  credentials: "same-origin",
});

const globalOperations = [
  "AuthFormValidateEmailMutation",
  "AuthFormRequestGlobalTokenCodeMutation",
];

// Function to create the Apollo Client
const createApolloClient: (token?: string) => ApolloClient<NormalizedCacheObject> = (token?: string) => {
  const authLink = createAuthLink(token);

  // Split link based on operation name or custom logic
  const splitLink = split(
    ({ query }) => {
      const definition = getMainDefinition(query);
      return (
        definition.kind === "OperationDefinition" &&
        definition.operation === "query" &&
        globalOperations.indexOf(definition.name?.value ?? "") > -1
      );
    },
    globalHttpLink, // Route to global API
    defaultHttpLink // Route to default API
  );

  return new ApolloClient({
    ssrMode: typeof window === "undefined", // Enable SSR mode on the server
    link: ApolloLink.from([authLink, splitLink]), // Combine auth link and split link
    cache: new InMemoryCache(),
  });
};

export default createApolloClient;
