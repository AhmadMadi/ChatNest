import { auth, db } from "../config/firebase";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { collection, addDoc } from "firebase/firestore";

export const signup = async ({ displayName, email, password }) => {
  const { user } = await createUserWithEmailAndPassword(auth, email, password);

  await updateProfile(user, {
    displayName,
  });

  await addDoc(collection(db, "messages"), {
    userId: user.uid,
    displayName: user.displayName,
    createdAt: new Date().getTime(),
  });

  return user;
};
