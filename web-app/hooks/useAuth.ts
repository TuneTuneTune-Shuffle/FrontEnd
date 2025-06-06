// hooks/useAuth.ts
"use client";

import { useEffect, useState } from "react";
import jwtDecode from "jwt-decode";

interface AuthResult {
  userEmail: string | null;
  isReady: boolean;
  logout: () => void;
}

export function useAuth(): AuthResult {
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [isReady, setIsReady] = useState(false); // 👈 new flag

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        console.log("Token info:", { token, userEmail });

        const decoded: any = jwtDecode(token);
        const exp = decoded.exp * 1000;
        if (Date.now() < exp) {
          setUserEmail(decoded.sub);
        } else {
          localStorage.removeItem("token");
        }
      } catch {
        localStorage.removeItem("token");
      }
    }
    setIsReady(true); // ✅ only set ready after auth check
  }, []);

  const logout = () => {
    localStorage.removeItem("token");
    setUserEmail(null);
    window.location.reload(); // reload UI completely
  };

  return { userEmail, logout, isReady };
}
