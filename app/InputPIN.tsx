import React, { useState, useEffect, useRef  } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  Platform,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import * as Haptics from "expo-haptics";
import { Animated } from "react-native";
import { useTransfer } from "@/context/transferContext";
import { useAuth } from "@/context/authContext";

interface PinCircleProps {
  filled: boolean;
}

const PinCircle: React.FC<PinCircleProps> = ({ filled }) => (
  <View style={[styles.pinCircle, filled && styles.pinCircleFilled]} />
);

const PinScreen = () => {
  const [pin, setPin] = useState("");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const pinLength = 6;
  const [fadeAnim] = useState(new Animated.Value(0));

  const {
    accountNumber,
    amount,
    note,
    recipientAccount,
    recipientName,
    senderName,
  } = useTransfer();
  const { authToken } = useAuth();
  

  useEffect(() => {
    const handleTransfer = async () => {
      try {
        const response = await fetch("http://localhost:8080/api/transfer", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: 'Bearer ' + authToken
          },
          body: JSON.stringify({
            fromAccountnum: accountNumber,
            toAccountnum: recipientAccount,
            amount,
            description: note,
            pin: pin,
          }),
        });
  
        const data = await response.json();
  
        if (response.ok) {
          if (Platform.OS !== "web") {
            Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
          }
  
          router.push({ pathname: "/TransSucces" });
        } else {
          setErrorMessage(data.message || "Transfer gagal.");
          setPin(""); 
          Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 300,
            useNativeDriver: true,
          }).start();
        }
      } catch (error) {
        setErrorMessage("Terjadi kesalahan saat menghubungi server.");
        setPin(""); 
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }).start();
      }
    };
  
    if (pin.length === pinLength) {
      handleTransfer();
    }
  }, [pin]);
  
  

  const handleNumberInput = (number: string) => {
    if (pin.length < pinLength) {
      setPin(pin + number);
      if (Platform.OS !== "web") {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
      }
    }
  };

  const handleBackspace = () => {
    if (pin.length > 0) {
      setPin(pin.slice(0, -1));
      if (Platform.OS !== "web") {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
      }
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <Ionicons name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>

        <Text style={styles.title}>PIN</Text>
        <Text style={styles.enterPinText}>Enter PIN</Text>

        <View style={styles.pinInputContainer}>
          {Array(pinLength)
            .fill(null)
            .map((_, index) => (
              <PinCircle key={index} filled={index < pin.length} />
            ))}
        </View>

        <View style={styles.errorWrapper}>
          <Animated.Text style={[styles.errorMessage, { opacity: fadeAnim }]}>
            {errorMessage}
          </Animated.Text>
        </View>

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
              onPress={() => handleNumberInput("0")}
            >
              <Text style={styles.numberText}>0</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.backspaceButton}
              onPress={handleBackspace}
            >
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
    backgroundColor: "#4A148C",
  },
  container: {
    flex: 1,
    padding: 20,
    justifyContent: "flex-start",
    alignItems: "center",
  },
  backButton: {
    position: "absolute",
    top: Platform.OS === "ios" ? 50 : 20,
    left: 20,
    zIndex: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
    marginTop: 80,
    marginBottom: 20,
  },
  enterPinText: {
    fontSize: 18,
    color: "#ddd",
    marginBottom: 40,
  },
  pinInputContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    width: "60%",
    marginBottom: 10,
  },
  pinCircle: {
    width: 16,
    height: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#fff",
  },
  pinCircleFilled: {
    backgroundColor: "#fff",
  },
  errorMessage: {
    color: "#FFD700",
    marginVertical: 10,
  },
  
  keyboard: {
    marginTop: 20,
    gap: 10,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-around",
    gap: 20,
  },
  numberButton: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "#6A1B9A",
    justifyContent: "center",
    alignItems: "center",
    margin: 5,
  },
  numberText: {
    fontSize: 24,
    color: "#fff",
  },
  backspaceButton: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "#transparent",
    justifyContent: "center",
    alignItems: "center",
    margin: 5,
  },
  emptyButton: {
    width: 80,
    height: 80,
    margin: 5,
  },
  errorWrapper: {
    height: 30,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
  },  
});

export default PinScreen;
