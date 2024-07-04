import { ApolloClient, InMemoryCache, HttpLink, ApolloProvider } from "@apollo/client";

// ** import env
import { env } from "@/config";

const httpLink = new HttpLink({
  uri: env.NEXT_PUBLIC_GRAPHQL_API_URL, // Your GraphQL API URL
});

const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
});

export default client;
