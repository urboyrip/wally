// TopUpCreditScreen.tsx
import React, { useState } from "react";
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
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";

const TopUpCreditScreen = () => {
  const { amount } = useLocalSearchParams<{ amount: string }>();
  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvv, setCvv] = useState("");

  const handleNext = () => {
    if (!cardNumber.trim() || cardNumber.length < 16) {
      Alert.alert("Peringatan", "Nomor kartu tidak valid.");
      return;
    }
    if (!expiry.trim() || expiry.length !== 5 || !expiry.includes("/")) {
      Alert.alert("Peringatan", "Format tanggal kedaluwarsa tidak valid (MM/YY).");
      return;
    }
    if (!cvv.trim() || cvv.length < 3) {
      Alert.alert("Peringatan", "CVV tidak valid.");
      return;
    }

    router.push({
      pathname: "/TopUpCreditConfirm",
      params: { amount: amount, cardNumber: cardNumber, expiry: expiry, cvv: cvv },
    });
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      style={{ flex: 1 }}
    >
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()}>
            <Ionicons name="arrow-back" size={24} color="#000" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Credit Card</Text> {/* Ubah judul header */}
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
          <Text style={styles.selectedMethodText}>Credit Card</Text> {/* Ubah teks metode terpilih */}
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
          value={cardNumber}
          onChangeText={setCardNumber}
          placeholder="XXXX-XXXX-XXXX-XXXX"
          keyboardType="number-pad"
        />

        <Text style={styles.inputLabel}>Expiration (MM/YY)</Text>
        <TextInput
          style={styles.input}
          value={expiry}
          onChangeText={setExpiry}
          placeholder="MM/YY"
          keyboardType="default"
        />

        <Text style={styles.inputLabel}>CVV</Text>
        <TextInput
          style={styles.input}
          value={cvv}
          onChangeText={setCvv}
          placeholder="XXX"
          keyboardType="number-pad"
          secureTextEntry
        />

        <TouchableOpacity style={styles.button} onPress={handleNext}>
          <Text style={styles.buttonText}>Next</Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default TopUpCreditScreen;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
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
  button: {
    backgroundColor: "#A020F0",
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 24,
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
});