import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert,
  Keyboard,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useTransfer } from "@/context/transferContext";

const WALLY_BALANCE = 1000000;

const TransferScreen: React.FC = () => {
  const {
    accountNumber,
    setAccountNumber,
    amount,
    setAmount,
    note,
    setNote,
    setRecipientName,
    setSenderName,
    setSenderAccount,
  } = useTransfer();
  const [isEditingAmount, setIsEditingAmount] = useState<boolean>(false);
  const [keyboardVisible, setKeyboardVisible] = useState<boolean>(false);

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


  const handleAmountChange = (value: string): void => {
    const numericValue = value.replace(/\D/g, "");
    setAmount(numericValue);
  };

  const handleNext = (): void => {
    if (!accountNumber.trim() || accountNumber === "0") {
      Alert.alert(
        "Peringatan",
        "Nomor rekening harus diisi dan tidak boleh 0."
      );
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

    if (numericAmount > WALLY_BALANCE) {
      Alert.alert(
        "Peringatan",
        `Jumlah transfer melebihi saldo Anda (Rp${WALLY_BALANCE.toLocaleString(
          "id-ID"
        )}).`
      );
      return;
    }

    setRecipientName("Ahmad Jaelani");
    setSenderName("Sandy Yuyu");
    setSenderAccount("111888111888");

    router.push("/TransConfirmation");
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.content} keyboardShouldPersistTaps="handled">
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
            <Text style={{ fontWeight: "bold" }}>
              Rp{WALLY_BALANCE.toLocaleString("id-ID")}
            </Text>
          </View>
        </View>

        <TouchableOpacity
          style={styles.amountBox}
          onPress={() => setIsEditingAmount(true)}
          activeOpacity={1}
        >
          <Text style={styles.label}>Transfer Amount</Text>
          <View style={styles.amountContainer}>
            <Text style={styles.rupiahPrefix}>Rp</Text>
            {isEditingAmount ? (
              <TextInput
                autoFocus
                style={styles.amountInput}
                value={amount.replace(/\D/g, "")}
                onChangeText={handleAmountChange}
                placeholder="0"
                keyboardType="numeric"
                onBlur={() => setIsEditingAmount(false)}
              />
            ) : (
              <Text style={styles.amountText}>
                {amount ? parseInt(amount, 10).toLocaleString("id-ID") : "0"}
              </Text>
            )}
          </View>

          <Text style={styles.minNote}>Minimum Rp10.000</Text>
        </TouchableOpacity>

        <Text style={styles.label}>Notes (Optional)</Text>
        <TextInput
          style={styles.input}
          value={note}
          onChangeText={setNote}
          placeholder="e.g. For lunch payment"
        />
        <View style={{ height: 80 }} />
      </ScrollView>

      {!keyboardVisible && (
        <TouchableOpacity style={styles.absoluteButton} onPress={handleNext}>
          <Text style={styles.buttonText}>Next</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default TransferScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  content: {
    flex: 1,
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
    marginTop: 0,
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
    marginTop: 16,
  },
  amountContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  rupiahPrefix: {
    fontSize: 20,
    fontWeight: "bold",
    marginRight: 2,
  },
  amountText: {
    fontSize: 20,
    fontWeight: "bold",
  },
  amountInput: {
    fontSize: 20,
    fontWeight: "bold",
    flex: 1,
    padding: 0,
  },
  minNote: {
    fontSize: 12,
    color: "#888",
    marginTop: 10,
  },
  absoluteButton: {
    backgroundColor: "#A020F0",
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: "center",
    marginHorizontal: 24,
    marginBottom: 24,
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
});
