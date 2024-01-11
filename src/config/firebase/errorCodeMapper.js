export const errorCodeMapper = (errorCode) => {
  switch (errorCode) {
    case "auth/invalid-email":
      return "Invalid email address";

    case "auth/weak-password":
      return "Password should be at least 6 characters";

    case "permission-denied":
      return "You do not have permission to perform this action";

    default:
      return errorCode;
  }
};
