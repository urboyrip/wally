
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
import { router } from "expo-router";

const TransferScreen = () => {
  const [accountNumber, setAccountNumber] = useState("");
  const [amount, setAmount] = useState("");
  const [note, setNote] = useState("");
  const [isEditingAmount, setIsEditingAmount] = useState(false);

  const formatRupiah = (value: string) => {
    const numericValue = value.replace(/\D/g, "");
    return (
      "Rp" +
      (numericValue ? parseInt(numericValue, 10).toLocaleString("id-ID") : "0")
    );
  };

  const handleNext = () => {
    if (!accountNumber.trim() || accountNumber === "0") {
      Alert.alert("Peringatan", "Nomor rekening harus diisi dan tidak boleh 0.");
      return;
    }

    const numericAmount = parseFloat(amount.replace(/\D/g, ""));
    if (!amount.trim() || numericAmount === 0) {
      Alert.alert("Peringatan", "Jumlah transfer harus diisi.");
      return;
    }
    if (numericAmount < 10000) {
      Alert.alert("Peringatan", "Jumlah transfer minimal Rp10.000.");
      return;
    }

    router.push({
      pathname: "/TransConfirmation",
      params: {
        recipientAccount: accountNumber,
        amount: amount.replace(/\D/g, ""),
        note,
        recipientName: "Ahmad Jaelani",
        senderName: "Sandy Yuyu",
        senderAccount: "111888111888",
      },
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
          <Text style={styles.headerTitle}>Transfer</Text>
        </View>

        <Text style={styles.label}>Input Account Number</Text>
        <TextInput
          style={styles.input}
          value={accountNumber}
          onChangeText={setAccountNumber}
          placeholder="e.g. 1234567890"
          keyboardType="number-pad"
        />

        <Text style={styles.label}>Source of Fund</Text>
        <View style={styles.sourceBox}>
          <Ionicons name="wallet" size={24} color="#A020F0" />
          <View style={{ marginLeft: 12 }}>
            <Text>Wally Balance</Text>
            <Text style={{ fontWeight: "bold" }}>Rp1.000.000</Text>
          </View>
        </View>

        <Text style={styles.label}>Transfer Amount</Text>
        <TouchableOpacity
          style={styles.amountBox}
          onPress={() => setIsEditingAmount(true)}
          activeOpacity={1}
        >
          {isEditingAmount ? (
            <TextInput
              autoFocus
              style={styles.amountInput}
              value={amount}
              onChangeText={setAmount}
              placeholder="0"
              keyboardType="numeric"
              onBlur={() => setIsEditingAmount(false)}
            />
          ) : (
            <>
              <Text style={styles.amountText}>{formatRupiah(amount)}</Text>
              <Text style={styles.minNote}>Minimum Rp10.000</Text>
            </>
          )}
        </TouchableOpacity>

        <Text style={styles.label}>Notes (Optional)</Text>
        <TextInput
          style={styles.input}
          value={note}
          onChangeText={setNote}
          placeholder="e.g. For lunch payment"
        />

        <TouchableOpacity
          style={styles.button}
          onPress={handleNext}
        >
          <Text style={styles.buttonText}>Next</Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default TransferScreen;

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
  label: {
    fontSize: 14,
    color: "#555",
    marginBottom: 8,
    marginTop: 16,
  },
  input: {
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    paddingVertical: 8,
    fontSize: 16,
  },
  sourceBox: {
    flexDirection: "row",
    borderWidth: 1,
    borderColor: "#eee",
    borderRadius: 8,
    padding: 12,
    backgroundColor: "#fafafa",
  },
  amountBox: {
    borderRadius: 8,
    backgroundColor: "#f3eaff",
    padding: 16,
    marginBottom: 8,
  },
  amountText: {
    fontSize: 20,
    fontWeight: "bold",
  },
  amountInput: {
    fontSize: 20,
    fontWeight: "bold",
  },
  minNote: {
    fontSize: 12,
    color: "#888",
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
});