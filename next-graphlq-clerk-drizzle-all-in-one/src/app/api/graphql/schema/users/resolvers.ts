import { NodePgDatabase } from "drizzle-orm/node-postgres";

// ** import custom scalar
import { GraphQLDate } from "@/graphql/scalar";

// ** import service
import { userService } from "./service";

// ** import utils
import { checkAuth } from "@/utils/clerk-auth";

// ** import types
import { Context } from "@/type/common";


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
    users: async (
      _: unknown,
      { offset = 0, limit = 10, search = "" }: { offset: number; limit: number; search?: string },
      { db }: { db: NodePgDatabase }
    ) => userService.getUsers(db, offset, limit, search),
    
    user: async (_: unknown, { id }: UserByIdArgs, { db, auth }: Context) => {
      checkAuth(auth); // Check if the user is authenticated
      return userService.getUserById(db, id);
    },
  },
  Mutation: {
    addUser: async (_: unknown, { input }: AddUserArgs, { db, auth }: Context) => {
      checkAuth(auth); // Check if the user is authenticated
      return userService.addUser(db, input);
    },

    updateUser: async (_: unknown, { id, input }: UpdateUserArgs, { db, auth }: Context) => {
      checkAuth(auth); // Check if the user is authenticated
      return userService.updateUser(db, id, input);
    },

    deleteUser: async (_: unknown, { id }: DeleteUserArgs, { db, auth }: Context) => {
      checkAuth(auth); // Check if the user is authenticated
      return userService.deleteUser(db, id);
    },
  },
};
