import { auth } from "../config/firebase";
import { signOut as signout } from "firebase/auth";

export const signOut = async () => {
  await signout(auth);
};
