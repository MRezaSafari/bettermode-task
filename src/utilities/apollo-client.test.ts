import { ApolloClient, HttpLink, InMemoryCache, split } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { getMainDefinition } from "@apollo/client/utilities";
import createApolloClient from "./apollo-client";

jest.mock("@apollo/client", () => ({
  ApolloClient: jest.fn().mockImplementation(() => ({})), // Mock only ApolloClient
  HttpLink: jest.fn().mockImplementation(() => ({})), // Mock only HttpLink
  InMemoryCache: jest.fn().mockImplementation(() => ({})), // Mock only InMemoryCache
  ApolloLink: {
    from: jest.fn(), // Mock only ApolloLink.from
  },
  split: jest.fn(), // Mock only split function
}));

jest.mock("@apollo/client/link/context", () => ({
  setContext: jest.fn(),
}));

jest.mock("@apollo/client/utilities", () => ({
  getMainDefinition: jest.fn(),
}));

describe("createApolloClient", () => {
  const defaultUri = "https://api.bettermode.com";
  const mockToken = "mock-token";

  beforeAll(() => {
    process.env = {
      ...process.env,
      VITE_API_URL: defaultUri,
      VITE_SECONDARY_API_URL: "https://api.bettermode.com/global",
    };
  });

  it("should create an Apollo Client with default configurations", () => {
    (HttpLink as unknown as jest.Mock).mockImplementation(({ uri }) => ({
      uri,
    }));
    (InMemoryCache as jest.Mock).mockImplementation(() => ({}));
    (ApolloClient as jest.Mock).mockImplementation(() => ({}));

    createApolloClient();

    expect(HttpLink).toHaveBeenCalledWith({
      uri: defaultUri,
      credentials: "same-origin",
    });
  });

  it("should attach a token to the headers if provided", () => {
    const setContextMock = setContext as jest.Mock;
    setContextMock.mockImplementation(() => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      return (_: any, { headers }: any) => ({
        headers: {
          ...headers,
          authorization: mockToken ? `Bearer ${mockToken}` : "",
        },
      });
    });

    createApolloClient(mockToken);

    expect(setContext).toHaveBeenCalledWith(expect.any(Function));
    const contextFunction = setContextMock.mock.calls[0][0];
    const headersResult = contextFunction({}, { headers: {} });

    expect(headersResult).toEqual({
      headers: {
        authorization: ``,
      },
    });
  });

  it("should correctly split based on operation name for global operations", () => {
    const splitMock = split as jest.Mock;

    createApolloClient();


    const splitFunction = splitMock.mock.calls[0][0];
    const mockQuery = {
      kind: "OperationDefinition",
      operation: "query",
      name: { value: "AuthFormValidateEmailMutation" },
    };

    (getMainDefinition as jest.Mock).mockReturnValue(mockQuery);

    const splitResult = splitFunction({ query: mockQuery });

    expect(getMainDefinition).toHaveBeenCalledWith(mockQuery);
    expect(splitResult).toBe(true);
  });

  it("should default to the primary API for unknown operations", () => {
    const splitMock = split as jest.Mock;

    createApolloClient();

    const splitFunction = splitMock.mock.calls[0][0];
    const mockQuery = {
      kind: "OperationDefinition",
      operation: "query",
      name: { value: "UnknownQuery" },
    };

    (getMainDefinition as jest.Mock).mockReturnValue(mockQuery);

    const splitResult = splitFunction({ query: mockQuery });

    expect(getMainDefinition).toHaveBeenCalledWith(mockQuery);
    expect(splitResult).toBe(false);
  });
});
