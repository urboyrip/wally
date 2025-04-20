import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  Platform,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
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
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    if (stage === 'reenter' && confirmPin.length === pinLength) {
      if (pin === confirmPin) {
        // PIN cocok, simpan atau lanjutkan
        console.log('PIN berhasil dibuat:', pin);
        if (Platform.OS !== 'web') {
          Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
        }
        Alert.alert('Sukses', 'PIN berhasil dibuat!');
        // Di sini kamu bisa navigasi ke halaman berikutnya atau menyimpan PIN
        // router.push('/some-next-page');
      } else {
        setErrorMessage('PIN tidak cocok. Silakan coba lagi.');
        setConfirmPin(''); // Hanya mengosongkan confirmPin
        if (Platform.OS !== 'web') {
          Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
        }
      }
    }
  }, [stage, pin, confirmPin]);

  useEffect(() => {
    if (stage === 'create' && pin.length === pinLength) {
      setStage('reenter');
      setErrorMessage('Re-enter your PIN');
      if (Platform.OS !== 'web') {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
      }
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
      setPin(''); // Optional: Clear the initially entered PIN as well
    } else {
      router.back(); // Default behavior: go to the previous screen
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

        {errorMessage && <Text style={styles.errorMessage}>{errorMessage}</Text>}

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
});

export default CreatePinScreen;