import { auth } from "../config/firebase";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";

export const signup = async ({ displayName, email, password }) => {
  console.log({ displayName, email, password });
  const { user } = await createUserWithEmailAndPassword(auth, email, password);

  await updateProfile(user, {
    displayName,
  });

  return user;
};
