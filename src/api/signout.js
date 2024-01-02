import { auth } from "../config/firebase";
import { signOut } from "firebase/auth";

export const signout = async () => {
    await signOut(auth);
}