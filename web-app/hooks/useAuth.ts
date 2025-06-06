// hooks/useAuth.ts
"use client";

import { useEffect, useState } from "react";
import jwtDecode from "jwt-decode";

interface AuthResult {
  userEmail: string | null;
  logout: () => void;
}

export function useAuth(): AuthResult {
  const [userEmail, setUserEmail] = useState<string | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;

    try {
      const decoded: any = jwtDecode(token);
      const exp = decoded.exp * 1000;
      if (Date.now() < exp) {
        setUserEmail(decoded.sub); // sub = email
      } else {
        localStorage.removeItem("token");
      }
    } catch {
      localStorage.removeItem("token");
    }
  }, []);

  const logout = () => {
    localStorage.removeItem("token");
    setUserEmail(null);
    window.location.reload(); // ensures UI resets across components
  };

  return { userEmail, logout };
}
