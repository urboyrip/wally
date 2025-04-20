
import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
} from "react-native";
import { useLocalSearchParams, router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

const generateTransactionId = () => {
  const timestamp = Date.now();
  return `TRX-${timestamp}`;
};

const getCurrentDateTime = () => {
  const now = new Date();
  return now.toLocaleString("id-ID", {
    dateStyle: "medium",
    timeStyle: "short",
  });
};

const TransSuccessScreen = () => {
  const {
      recipientName,
      recipientAccount,
      senderName,
      senderAccount,
      note,
      amount,
    } = useLocalSearchParams();
  

  const transactionId = generateTransactionId();
  const transactionTime = getCurrentDateTime();

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Transfer Berhasil</Text>
        <Ionicons name="checkmark-circle" size={64} color="green" />
      </View>

      <Text style={styles.timestamp}>Waktu Transaksi: {transactionTime}</Text>

      <Text style={styles.label}>To</Text>
      <View style={styles.card}>
        <Text style={styles.name}>{recipientName || "-"}</Text>
        <Text style={styles.account}>{recipientAccount || "-"}</Text>
      </View>

      <Text style={styles.label}>From</Text>
      <View style={styles.card}>
        <Text style={styles.name}>{senderName || "-"}</Text>
        <Text style={styles.account}>{senderAccount || "-"}</Text>
      </View>

      <View style={styles.row}>
        <Text style={styles.leftText}>Transaction ID</Text>
        <Text style={styles.rightText}>{transactionId}</Text>
      </View>

      <View style={styles.row}>
        <Text style={styles.leftText}>Notes</Text>
        <Text style={styles.rightText}>{note || "-"}</Text>
      </View>

      <View style={styles.row}>
        <Text style={styles.leftText}>Amount</Text>
        <Text style={styles.rightText}>
          Rp{amount ? parseInt(amount as string).toLocaleString("id-ID") : "0"}
        </Text>
      </View>

      <TouchableOpacity
        style={styles.button}
        onPress={() => router.push("/")}
      >
        <Text style={styles.buttonText}>Kembali ke Beranda</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default TransSuccessScreen;

const styles = StyleSheet.create({
  container: {
    padding: 24,
    backgroundColor: "#fff",
    flexGrow: 1,
  },
  header: {
    alignItems: "center",
    marginBottom: 24,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 8,
    color: "green",
  },
  timestamp: {
    fontSize: 12,
    color: "#666",
    marginBottom: 12,
    textAlign: "center",
  },
  label: {
    fontSize: 14,
    color: "#555",
    marginBottom: 4,
    marginTop: 12,
  },
  card: {
    padding: 12,
    borderRadius: 8,
    backgroundColor: "#f9f9f9",
    elevation: 1,
    shadowColor: "#ccc",
    marginBottom: 12,
  },
  name: {
    fontWeight: "bold",
    fontSize: 16,
  },
  account: {
    color: "#777",
    marginTop: 4,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 8,
  },
  leftText: {
    fontSize: 14,
    color: "#333",
  },
  rightText: {
    fontSize: 14,
    fontWeight: "600",
  },
  button: {
    backgroundColor: "#A020F0",
    padding: 14,
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