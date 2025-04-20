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
import { useTopup } from "@/context/topupContext";

const MAX_BALANCE = 20000000;

const TopupScreen = () => {
  const { selectedMethod, setSelectedMethod, amount, setAmount, resetTopupData } = useTopup();
  const [isMethodDropdownVisible, setIsMethodDropdownVisible] = useState(false);
  const [isAmountEditing, setIsAmountEditing] = useState(false);

  const topupMethods = ["Debit Card", "Credit Card", "QRIS"];

  const formatRupiah = (value: string) => {
    const numericValue = value.replace(/\D/g, "");
    return (
      "Rp" +
      (numericValue ? parseInt(numericValue, 10).toLocaleString("id-ID") : "0")
    );
  };

  const handleNext = () => {
    if (selectedMethod === "Choose Topup Method") {
      Alert.alert("Peringatan", "Pilih metode top up terlebih dahulu.");
      return;
    }

    const numericAmount = parseFloat(amount.replace(/\D/g, ""));
    if (!amount.trim() || numericAmount === 0) {
      Alert.alert("Peringatan", "Masukkan jumlah top up.");
      return;
    }

    if (selectedMethod === "Debit Card") {
      router.push("/TopUpDebit"); // Tidak perlu mengirimkan amount sebagai params
    } else if (selectedMethod === "Credit Card") {
      router.push("/TopUpCredit"); // Tidak perlu mengirimkan amount sebagai params
    } else if (selectedMethod === "QRIS") {
      router.push("/TopUpQRIS"); // Asumsi rute QRIS Anda, tidak mengirimkan amount
    }
  };

  const toggleMethodDropdown = () => {
    setIsMethodDropdownVisible(!isMethodDropdownVisible);
  };

  const selectMethod = (method: string) => {
    setSelectedMethod(method);
    setIsMethodDropdownVisible(false);
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
          <Text style={styles.headerTitle}>Topup</Text>
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
        <TouchableOpacity
          style={styles.dropdownButton}
          onPress={toggleMethodDropdown}
        >
          <Text style={styles.dropdownText}>{selectedMethod}</Text>
          <Ionicons
            name={isMethodDropdownVisible ? "chevron-up" : "chevron-down"}
            size={20}
            color="#A020F0"
          />
        </TouchableOpacity>

        {isMethodDropdownVisible && (
          <View style={styles.dropdownContainer}>
            {topupMethods.map((method) => (
              <TouchableOpacity
                key={method}
                style={styles.dropdownItem}
                onPress={() => selectMethod(method)}
              >
                <Text>{method}</Text>
              </TouchableOpacity>
            ))}
          </View>
        )}

        <TouchableOpacity
          style={styles.amountBox}
          onPress={() => setIsAmountEditing(true)}
          activeOpacity={1}
        >
          <Text style={styles.labeltopup}>Top Up Amount</Text>
          {isAmountEditing ? (
            <TextInput
              autoFocus
              style={styles.amountInput}
              value={amount}
              onChangeText={setAmount}
              placeholder="0"
              keyboardType="numeric"
              onBlur={() => setIsAmountEditing(false)}
            />
          ) : (
            <>
              <Text style={styles.amountText}>{formatRupiah(amount)}</Text>
              <Text style={styles.minNote}>Minimum Rp10.000</Text>
            </>
          )}
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={handleNext}
          disabled={selectedMethod === "Choose Topup Method"}
        >
          <Text style={styles.buttonText}>Next</Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default TopupScreen;

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
    textAlign: "center",
    marginTop: 0,
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
  dropdownButton: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    paddingVertical: 12,
  },
  dropdownText: {
    fontSize: 16,
  },
  dropdownContainer: {
    borderWidth: 1,
    borderColor: "#eee",
    borderRadius: 4,
    marginTop: 4,
    backgroundColor: "#fff",
    elevation: 2,
  },
  dropdownItem: {
    paddingVertical: 10,
    paddingHorizontal: 16,
  },
  amountBox: {
    borderRadius: 8,
    backgroundColor: "#f3eaff",
    padding: 16,
    marginBottom: 8,
    marginTop:16
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
    marginTop: 10,
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