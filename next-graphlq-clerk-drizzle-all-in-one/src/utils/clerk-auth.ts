// Check if the user is authenticated
export const checkAuth = (auth: { userId: string } | null) => {
  if (!auth) {
    throw new Error("Unauthorized");
  }
};
