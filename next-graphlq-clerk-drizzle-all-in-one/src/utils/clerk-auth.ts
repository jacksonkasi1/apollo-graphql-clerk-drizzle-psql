import { NextRequest } from "next/server";

// ** import clerk
import { getAuth } from "@clerk/nextjs/server";

interface UserAuth {
  userId: string;
}

// Check if the user is authenticated
export const checkAuth = async (req: NextRequest): Promise<UserAuth> => {
  try {
    const { userId } = await getAuth(req);
    if (!userId) {
      throw new Error("Unauthorized");
    }
    return { userId };
  } catch (error) {
    throw new Error("Unauthorized");
  }
};
