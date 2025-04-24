import React, { useState, useEffect } from 'react';
import { View } from 'react-native';
import SplashScreen from './SplashScreen';
import { router, useRootNavigationState } from 'expo-router';

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const rootNavigation = useRootNavigationState();

  const handleFinish = () => {
    setIsLoading(false);
  };

  useEffect(() => {
    if (!isLoading && rootNavigation?.key) {
      router.replace('/Login');
    }
  }, [isLoading, rootNavigation?.key]);

  return (
    <View style={{ flex: 1 }}>
      {isLoading && <SplashScreen onFinish={handleFinish} />}
    </View>
  );
}
