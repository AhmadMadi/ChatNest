import { auth } from "../config/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";

export const signin = async ({ email, password }) => {
  const { user } = await signInWithEmailAndPassword(auth, email, password);

  return user;
};
