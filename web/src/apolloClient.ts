// apolloClient.ts
import { ApolloClient, InMemoryCache, createHttpLink } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { auth } from "./firebase"; // import config firebase của bạn

// HTTP link đến backend GraphQL
const httpLink = createHttpLink({
  uri: "http://localhost:3000/graphql",
});

// Thêm token vào headers
const authLink = setContext(async (_, { headers }) => {
  const user = auth.currentUser;
  const token = user ? await user.getIdToken() : null;

  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

export const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});
