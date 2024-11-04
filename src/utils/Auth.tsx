import React, { createContext, PropsWithChildren, useEffect, useState } from "react";
import { signInAnonymously, User } from "firebase/auth";
import { auth } from "../../firebaseConfig";
import { AuthContextType } from "../types/auth";

const AuthContext = createContext<AuthContextType>({ currentUser: undefined });

const AuthProvider = (props: PropsWithChildren) => {
  const [currentUser, setCurrentUser] = useState<User | null | undefined>(undefined);

  useEffect(() => {
    (async () => {
      // 匿名ログイン
      await signInAnonymously(auth);
      // ログイン状態が変化したら更新
      auth.onAuthStateChanged((user) => setCurrentUser(user));
    })();
  }, []);

  return (
    <AuthContext.Provider value={{ currentUser }}>
      {props.children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
