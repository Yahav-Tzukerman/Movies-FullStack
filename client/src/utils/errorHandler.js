export const createErrorResponse = (message) => {
  return { error: message || "An unexpected error occurred" };
};
