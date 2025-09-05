"use client"

import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { auth } from "@/lib/firebase";
import {
  onAuthStateChanged,
  signInWithPopup,
  GoogleAuthProvider,
  signOut as firebaseSignOut
} from "firebase/auth";
import { UserProfile } from "@/types";
import { useRouter } from "next/navigation";

interface AuthContextType {
  user: UserProfile | null;
  loading: boolean;
  login: () => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  login: async () => { },
  logout: async () => { },
});

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      (async () => {
        if (firebaseUser) {
          const { uid, email, displayName, photoURL, metadata } = firebaseUser;
          const token = await firebaseUser.getIdToken();
          const createdAt = metadata?.creationTime ?? new Date().toISOString();
          const lastLogin = metadata?.lastSignInTime ?? undefined;
          setUser({
            uid,
            email: email ?? "",
            displayName: displayName ?? "",
            photoURL: photoURL ?? undefined,
            createdAt,
            lastLogin,
            token,
          });
        } else {
          setUser(null);
        }
        setLoading(false);
      })();
    });

    return () => unsubscribe();
  }, []);

  const login = async () => {
    const provider = new GoogleAuthProvider();
    const result = await signInWithPopup(auth, provider);
    const user = result.user;

    const idToken = await user.getIdToken();

    const res = await fetch("/api/auth/google", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ idToken, expiresIn: 60 * 60 * 24 * 7 }),
    });

    if (!res.ok) {
      throw new Error("Failed to create session");
    }

    router.push("/");
  };

  const logout = async () => {
    await firebaseSignOut(auth);
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/");
  };

  const value = {
    user,
    loading,
    login,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}