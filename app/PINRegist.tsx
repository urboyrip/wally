import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  Platform,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { router, useLocalSearchParams } from 'expo-router';
import * as Haptics from 'expo-haptics';

interface PinCircleProps {
  filled: boolean;
}

const PinCircle: React.FC<PinCircleProps> = ({ filled }) => (
  <View style={[styles.pinCircle, filled && styles.pinCircleFilled]} />
);

const CreatePinScreen = () => {
  const [pin, setPin] = useState('');
    const [confirmPin, setConfirmPin] = useState('');
    const [stage, setStage] = useState<'create' | 'reenter'>('create');
    const pinLength = 6;
    const [pinCreatedMessage, setPinCreatedMessage] = useState<string | null>(null);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [pinRegistrationMessage, setPinRegistrationMessage] = useState<string | null>(null);
    const [navigationTimerActive, setNavigationTimerActive] = useState(false);
    const { accountnum } = useLocalSearchParams();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [hasSubmitted, setHasSubmitted] = useState(false);


    const handlePinRegistration = async (pinToRegister: string) => {
      setPinRegistrationMessage(null);

      if (!accountnum) {
          console.error("Account number not found.");
          setPinRegistrationMessage("Account number is missing.");
          return;
      }

      console.log("Sending data to /api/pin:", {
        accountnum: accountnum,
        pin: pinToRegister,
      });

      try {
          const response = await fetch("http://localhost:8080/api/pin", {
              method: "POST",
              headers: {
                  "Content-Type": "application/json",
              },
              body: JSON.stringify({
                
                accountnum: accountnum,
                  pin: pinToRegister,
              }),
          });

          const data = await response.json();

          if (data?.message === "PIN registered successfully.") {
              console.log("PIN registered successfully:", data.message);
              setPinRegistrationMessage(data.message);
              setTimeout(() => {
                  router.push('/Login');
              }, 2000);
          } else {
              console.error("PIN registration failed:", data?.message || "Something went wrong.");
              setPinRegistrationMessage(data?.message || "Failed to register PIN.");
          }
      } catch (error) {
          console.error("Error during PIN registration:", error);
          setPinRegistrationMessage("Failed to connect to the server to register PIN.");
      }
  };

  useEffect(() => {
    if (
      stage === 'reenter' &&
      confirmPin.length === pinLength &&
      pin === confirmPin &&
      !isSubmitting &&
      !hasSubmitted
    ) {
      setIsSubmitting(true);
      setHasSubmitted(true);
  
      console.log('PIN berhasil dibuat:', confirmPin);
      setPinCreatedMessage('PIN berhasil dibuat!');
      setNavigationTimerActive(true);
  
      if (Platform.OS !== 'web') {
        Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
      }
  
      handlePinRegistration(confirmPin).finally(() => {
        setIsSubmitting(false);
      });
    } else if (
      stage === 'reenter' &&
      confirmPin.length === pinLength &&
      pin !== confirmPin
    ) {
      setErrorMessage('PIN tidak cocok. Silakan coba lagi.');
      setConfirmPin('');
      setPinCreatedMessage(null);
      setPinRegistrationMessage(null);
      setHasSubmitted(false);
      if (Platform.OS !== 'web') {
        Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
      }
    }
  }, [stage, pin, confirmPin, isSubmitting, hasSubmitted]);
  

  useEffect(() => {
    if (stage === 'create' && pin.length === pinLength) {
      setStage('reenter');
      setErrorMessage('Re-enter your PIN');
      setPinCreatedMessage(null); 
      if (Platform.OS !== 'web') {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
      }
    } else if (stage === 'create') {
      setPinCreatedMessage(null); 
    }
  }, [stage, pin]);

  const handleNumberInput = (number: string) => {
    if (stage === 'create' && pin.length < pinLength) {
      setPin(pin + number);
      if (Platform.OS !== 'web') {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
      }
    } else if (stage === 'reenter' && confirmPin.length < pinLength) {
      setConfirmPin(confirmPin + number);
      if (Platform.OS !== 'web') {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
      }
    }
  };

  const handleBackspace = () => {
    if (stage === 'create' && pin.length > 0) {
      setPin(pin.slice(0, -1));
      if (Platform.OS !== 'web') {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
      }
    } else if (stage === 'reenter' && confirmPin.length > 0) {
      setConfirmPin(confirmPin.slice(0, -1));
      if (Platform.OS !== 'web') {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
      }
    }
  };

  const getTitle = () => {
    return stage === 'create' ? 'Create your PIN' : 'Re-enter your PIN';
  };

  const getCurrentPin = () => {
    return stage === 'create' ? pin : confirmPin;
  };

  const handleBackButton = () => {
    if (stage === 'reenter') {
      setStage('create');
      setErrorMessage('Create your PIN');
      setConfirmPin('');
      setPin('');
      setPinCreatedMessage(null); 
    } else {
      router.back();
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <TouchableOpacity style={styles.backButton} onPress={handleBackButton}>
          <Ionicons name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>

        <Text style={styles.title}>Create PIN</Text>
        <Text style={styles.instructionText}>{getTitle()}</Text>

        <View style={styles.pinInputContainer}>
          {Array(pinLength)
            .fill(null)
            .map((_, index) => (
              <PinCircle key={index} filled={index < getCurrentPin().length} />
            ))}
        </View>

        {pinRegistrationMessage && (
    <Text style={pinRegistrationMessage.includes('berhasil') ? styles.successMessage : styles.errorMessage}>
        {pinRegistrationMessage}
    </Text>
)}

        <View style={styles.keyboard}>
          <View style={styles.row}>
            {[1, 2, 3].map((num) => (
              <TouchableOpacity
                key={num}
                style={styles.numberButton}
                onPress={() => handleNumberInput(String(num))}
              >
                <Text style={styles.numberText}>{num}</Text>
              </TouchableOpacity>
            ))}
          </View>
          <View style={styles.row}>
            {[4, 5, 6].map((num) => (
              <TouchableOpacity
                key={num}
                style={styles.numberButton}
                onPress={() => handleNumberInput(String(num))}
              >
                <Text style={styles.numberText}>{num}</Text>
              </TouchableOpacity>
            ))}
          </View>
          <View style={styles.row}>
            {[7, 8, 9].map((num) => (
              <TouchableOpacity
                key={num}
                style={styles.numberButton}
                onPress={() => handleNumberInput(String(num))}
              >
                <Text style={styles.numberText}>{num}</Text>
              </TouchableOpacity>
            ))}
          </View>
          <View style={styles.row}>
            <View style={styles.emptyButton} />
            <TouchableOpacity
              style={styles.numberButton}
              onPress={() => handleNumberInput('0')}
            >
              <Text style={styles.numberText}>0</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.backspaceButton} onPress={handleBackspace}>
              <Ionicons name="arrow-back-outline" size={24} color="#fff" />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#4A148C',
  },
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  backButton: {
    position: 'absolute',
    top: Platform.OS === 'ios' ? 50 : 20,
    left: 20,
    zIndex: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginTop: 80,
    marginBottom: 20,
  },
  instructionText: {
    fontSize: 18,
    color: '#ddd',
    marginBottom: 40,
  },
  pinInputContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    width: '60%',
    marginBottom: 30,
  },
  pinCircle: {
    width: 16,
    height: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#fff',
  },
  pinCircleFilled: {
    backgroundColor: '#fff',
  },
  errorMessage: {
    color: '#FFD700',
    marginVertical: 20,
    fontSize: 16,
  },
  keyboard: {
    marginTop: 20,
    gap: 10,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    gap: 20,
  },
  numberButton: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#6A1B9A',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 5,
  },
  numberText: {
    fontSize: 24,
    color: '#fff',
  },
  backspaceButton: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 5,
  },
  emptyButton: {
    width: 80,
    height: 80,
    margin: 5,
  },
  successMessage: {
    color: 'green',
    marginVertical: 20,
    fontSize: 16,
    textAlign: 'center',
},
});

export default CreatePinScreen;