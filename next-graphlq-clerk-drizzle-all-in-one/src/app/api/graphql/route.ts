import { NextRequest } from "next/server";

// ** import clerk
import { getAuth } from "@clerk/nextjs/server";

// ** import ApolloServer from the Apollo Server package
import { ApolloServer } from "@apollo/server";
import { startServerAndCreateNextHandler } from "@as-integrations/next";

// ** import the resolvers and typeDefs
import { resolvers } from "@/graphql/resolvers";
import { typeDefs } from "@/graphql/types";

// ** import db
import { db } from "@/db";

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

// Define the context interface
interface Context {
  req: NextRequest;
  db: typeof db;
  auth: { userId: string } | null;
}

// req has the type NextRequest
const handler = startServerAndCreateNextHandler<NextRequest, Context>(
  server as any,
  {
    context: async (req) => {
      const { userId } = await getAuth(req);
      // Ensure the db is included in the context
      return { req, db, auth: userId ? { userId } : null };
    },
  }
);

export { handler as GET, handler as POST };
