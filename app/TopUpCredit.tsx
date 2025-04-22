import React from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Alert,
  Keyboard
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useTopup } from "@/context/topupContext";
import { useState, useEffect } from "react";

const TopUpCreditScreen = () => {
  const { amount, setCardDetails } = useTopup();
  const [localCardNumber, setLocalCardNumber] = useState("");
  const [localExpiry, setLocalExpiry] = useState("");
  const [localCvv, setLocalCvv] = useState("");
  const [keyboardVisible, setKeyboardVisible] = useState(false);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      "keyboardDidShow",
      () => {
        setKeyboardVisible(true);
      }
    );
    const keyboardDidHideListener = Keyboard.addListener(
      "keyboardDidHide",
      () => {
        setKeyboardVisible(false);
      }
    );

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

  const handleNext = () => {
    if (!localCardNumber.trim() || localCardNumber.length < 16) {
      Alert.alert("Peringatan", "Nomor kartu tidak valid.");
      return;
    }
    if (!localExpiry.trim() || localExpiry.length !== 5 || !localExpiry.includes("/")) {
      Alert.alert("Peringatan", "Format tanggal kedaluwarsa tidak valid (MM/YY).");
      return;
    }
    if (!localCvv.trim() || localCvv.length < 3) {
      Alert.alert("Peringatan", "CVV tidak valid.");
      return;
    }

    setCardDetails({ cardNumber: localCardNumber, expiry: localExpiry, cvv: localCvv });
    router.push("/TopUpCreditConfirm");
  };

  return (
    <KeyboardAvoidingView 
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 64 : 0}
      
    >
      <ScrollView 
        contentContainerStyle={styles.scrollContent} 
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.content}>
          <View style={styles.header}>
            <TouchableOpacity onPress={() => router.back()}>
              <Ionicons name="arrow-back" size={24} color="#000" />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>Credit Card</Text>
          </View>

          <View style={styles.balanceCard}>
            <Ionicons name="wallet" size={24} color="#A020F0" />
            <View style={{ marginLeft: 12 }}>
              <Text style={styles.balanceLabel}>Wally Balance</Text>
              <Text style={styles.balanceAmount}>Rp1.000.000</Text>
            </View>
          </View>
          <Text style={styles.maxBalance}>Maximum Balance Rp20.000.000</Text>

          <Text style={styles.label}>Choose Top Up Method</Text>
          <View style={styles.selectedMethodContainer}>
            <Text style={styles.selectedMethodText}>Credit Card</Text>
          </View>

          <View style={styles.amountBox}>
            <Text style={styles.labeltopup}>Top Up Amount</Text>
            <Text style={styles.amountText}>Rp{parseInt(amount).toLocaleString("id-ID")}</Text>
            <Text style={styles.minNote}>Minimum Rp10.000</Text>
          </View>

          <Text style={styles.label}>Card Information</Text>
          <Text style={styles.inputLabel}>Card Number</Text>
          <TextInput
            style={styles.input}
            value={localCardNumber}
            onChangeText={setLocalCardNumber}
            placeholder="XXXX-XXXX-XXXX-XXXX"
            keyboardType="number-pad"
          />

          <Text style={styles.inputLabel}>Expiration (MM/YY)</Text>
          <TextInput
            style={styles.input}
            value={localExpiry}
            onChangeText={setLocalExpiry}
            placeholder="MM/YY"
            keyboardType="numbers-and-punctuation"
          />

          <Text style={styles.inputLabel}>CVV</Text>
          <TextInput
            style={styles.input}
            value={localCvv}
            onChangeText={setLocalCvv}
            placeholder="XXX"
            keyboardType="number-pad"
          />
          
          <View style={styles.bottomPadding} />
        </View>
      </ScrollView>
      
      <View style={styles.buttonContainer}>
        {!keyboardVisible && (
          <TouchableOpacity style={styles.button} onPress={handleNext}>
            <Text style={styles.buttonText}>Next</Text>
          </TouchableOpacity>
        )}
      </View>
    </KeyboardAvoidingView>
  );
};

export default TopUpCreditScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  scrollContent: {
    flexGrow: 1,
  },
  content: {
    padding: 24,
    backgroundColor: "#fff",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 24,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginLeft: 12,
  },
  balanceCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f9f9f9",
    padding: 16,
    borderRadius: 8,
    marginBottom: 16,
  },
  balanceLabel: {
    fontSize: 14,
    color: "#555",
  },
  balanceAmount: {
    fontSize: 18,
    fontWeight: "bold",
  },
  maxBalance: {
    fontSize: 12,
    color: "#888",
    textAlign: "left",
    marginTop: 4,
  },
  label: {
    fontSize: 14,
    color: "#555",
    marginBottom: 8,
    marginTop: 16,
  },
  labeltopup: {
    fontSize: 14,
    color: "#555",
    marginBottom: 8,
  },
  amountBox: {
    borderRadius: 8,
    backgroundColor: "#f3eaff",
    padding: 16,
    marginBottom: 16,
    marginTop: 16,
  },
  amountText: {
    fontSize: 20,
    fontWeight: "bold",
  },
  minNote: {
    fontSize: 12,
    color: "#888",
    marginTop: 4,
  },
  inputLabel: {
    fontSize: 14,
    color: "#555",
    marginBottom: 4,
  },
  input: {
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    paddingVertical: 8,
    fontSize: 16,
    marginBottom: 16,
  },
  row: {
    flexDirection: "row",
    gap: 20,
    marginBottom: 16,
  },
  buttonContainer: {
    paddingHorizontal: 24,
    paddingBottom: 24,
    backgroundColor: "#fff",
  },
  button: {
    backgroundColor: "#A020F0",
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
  selectedMethodContainer: {
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    paddingVertical: 12,
    marginBottom: 16,
  },
  selectedMethodText: {
    fontSize: 16,
    color: "#333",
  },
  bottomPadding: {
    height: 80,
  },
});