"use client";

import { ApolloProvider } from "@apollo/client";
import client from "@/utils/lib/apollo-client";

export default function AppLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <ApolloProvider client={client}>{children}</ApolloProvider>;
}
