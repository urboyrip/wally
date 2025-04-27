import { useEffect, useState } from "react";
import { router } from "expo-router";
import { useAuth } from "@/context/authContext";

export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { authToken, fetchUserData } = useAuth();
  const [isNavigating, setIsNavigating] = useState(false);

  useEffect(() => {
    const checkAuthentication = async () => {
      if (!authToken) {
        if (!isNavigating) {
          setIsNavigating(true);
          setTimeout(() => {
            router.replace("/Login");
          }, 0);
        }
        return;
      }
      try {
        await fetchUserData();
      } catch (error) {
        console.error("Error validating token via fetchUserData:", error);
        if (!isNavigating) {
          setIsNavigating(true);
          setTimeout(() => {
            router.replace("/Login");
          }, 0);
        }
      }
    };

    checkAuthentication();
  }, [authToken, isNavigating]);

  if (!authToken) {
    return null;
  }

  return <>{children}</>;
}
