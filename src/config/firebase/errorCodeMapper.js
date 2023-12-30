export const errorCodeMapper = (errorCode) => {
  switch (errorCode) {
    case "auth/invalid-email":
      return "Invalid email address";

    case "auth/weak-password":
      return "Password should be at least 6 characters";

    default:
      return errorCode;
  }
};
