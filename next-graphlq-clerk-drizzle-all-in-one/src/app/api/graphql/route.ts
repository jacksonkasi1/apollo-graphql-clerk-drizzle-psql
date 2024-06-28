import { NextRequest } from "next/server";

// ** import ApolloServer from the Apollo Server package
import { ApolloServer } from "@apollo/server";
import { startServerAndCreateNextHandler } from "@as-integrations/next";

// ** import the resolvers and typeDefs
import { resolvers } from "@/graphql/resolvers";
import { typeDefs } from "@/graphql/types";

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

// req has the type NextRequest
const handler = startServerAndCreateNextHandler<NextRequest>(server as any, {
  context: async (req) => ({ req }),
});

export { handler as GET, handler as POST };
