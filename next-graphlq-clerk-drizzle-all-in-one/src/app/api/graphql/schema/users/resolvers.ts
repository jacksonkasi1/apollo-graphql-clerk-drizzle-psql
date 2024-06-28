import { NodePgDatabase } from "drizzle-orm/node-postgres";

// ** import custom scalar
import { GraphQLDate } from "@/graphql/scalar";

// ** import service
import { userService } from "./service";

interface Context {
  db: NodePgDatabase;
}

interface UserArgs {
  offset?: number;
  limit?: number;
}

interface UserByIdArgs {
  id: number;
}

interface AddUserArgs {
  input: any;
}

interface UpdateUserArgs {
  id: number;
  input: any;
}

interface DeleteUserArgs {
  id: number;
}

export const userResolvers = {
  Date: GraphQLDate,
  Query: {
    users: (
      _: unknown,
      { offset = 0, limit = 10 }: UserArgs,
      { db }: Context
    ) => userService.getUsers(db, offset, limit),

    user: (_: unknown, { id }: UserByIdArgs, { db }: Context) =>
      userService.getUserById(db, id),
  },
  Mutation: {
    addUser: (_: unknown, { input }: AddUserArgs, { db }: Context) =>
      userService.addUser(db, input),

    updateUser: (_: unknown, { id, input }: UpdateUserArgs, { db }: Context) =>
      userService.updateUser(db, id, input),

    deleteUser: (_: unknown, { id }: DeleteUserArgs, { db }: Context) =>
      userService.deleteUser(db, id),
  },
};
