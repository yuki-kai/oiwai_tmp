import React, { createContext, PropsWithChildren, useState } from "react";
import { signInAnonymously, User } from "firebase/auth";
import { auth } from "../../firebaseConfig";
import { AuthContextType } from "../types/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "../../firebaseConfig";

const AuthContext = createContext<AuthContextType>({ currentUser: undefined });

const AuthProvider = (props: PropsWithChildren) => {
  const [currentUser, setCurrentUser] = useState<User | null | undefined>(undefined);

  auth.onAuthStateChanged(async (authUser) => {
    // 匿名ユーザの uid を users コレクションのドキュメントとして利用する
    if (authUser) {
      const userDoc = await getDoc(doc(db, `users/${authUser.uid}`));
      if (!userDoc.exists()) {
        // FirebaseAuth にアカウントはあるが Firestore にドキュメントがない場合は作成
        await setDoc(doc(db, `users/${authUser.uid}`), {
          // TODO: createdAt も付与したい
          updatedAt: new Date(),
        });
      }
    } else {
      // 匿名ログインで onAuthStateChanged 発火
      await signInAnonymously(auth);
    }
    setCurrentUser(authUser);
  });

  return (
    <AuthContext.Provider value={{ currentUser }}>
      {props.children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
