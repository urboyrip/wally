import { useEffect, useState } from 'react';
import { router } from 'expo-router';
import { useAuth } from '@/context/authContext';

export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { authToken } = useAuth();
  const [isNavigating, setIsNavigating] = useState(false);

  useEffect(() => {
    if (!authToken && !isNavigating) {
      setIsNavigating(true);
      
      setTimeout(() => {
        router.replace('/Login');
      }, 0);
    }
  }, [authToken, isNavigating]);

  
  if (!authToken) {
    return null;
  }

  return <>{children}</>;
}