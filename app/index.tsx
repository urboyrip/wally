import React, { useState } from 'react';
import { View } from 'react-native';
import SplashScreen from './SplashScreen';
import LoginScreen from './Login';

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);

  const handleFinish = () => {
    setIsLoading(false);
  };

  return (
    <View style={{ flex: 1 }}>
      {isLoading ? <SplashScreen onFinish={handleFinish} /> : <LoginScreen />}
    </View>
  );
}
