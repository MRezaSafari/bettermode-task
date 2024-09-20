import { ApolloClient, HttpLink, InMemoryCache } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";

// Assume this is your token
const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6InlHNU4zWmRMRjUiLCJuZXR3b3JrSWQiOiJRWkNwbWNQQUc5IiwibmV0d29ya0RvbWFpbiI6ImJldHRlcmh1bnQtOGVkMW5vNGcuYmV0dGVybW9kZS5pbyIsInRva2VuVHlwZSI6IlVTRVIiLCJlbnRpdHlJZCI6bnVsbCwicGVybWlzc2lvbkNvbnRleHQiOm51bGwsInBlcm1pc3Npb25zIjpudWxsLCJzZXNzaW9uSWQiOiJDOGN6N0xpYlV5YUpyaDZkZkt6dUdnVlJoM1h1dUhkVkprT0dJbTVKYUxrRzI4Mkh6RSIsImlhdCI6MTcyNjc4NTM0OCwiZXhwIjoxNzI5Mzc3MzQ4fQ.vbeURGFNIc0_r9YnBPqXckBtJ3F7M2cEOHt2CXp3Aa4";

// Create an auth link to attach the token to the headers
const authLink = setContext((_, { headers }) => {
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

// HttpLink to connect to the GraphQL server
const httpLink = new HttpLink({
  uri: import.meta.env.VITE_API_URL,
  credentials: "same-origin",
});

// Combine authLink and httpLink using concat or from
const apolloClient = new ApolloClient({
  ssrMode: true,
  link: authLink.concat(httpLink), // Combine the auth link and the http link
  cache: new InMemoryCache(),
});

export default apolloClient;
