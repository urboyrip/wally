// TopUpQRISSuccessScreen.tsx
import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useTopup } from "@/context/topupContext";

const TopUpQRISSuccessScreen = () => {
  const { amount, resetTopupData } = useTopup();

  const transactionDate = new Date().toLocaleDateString("id-ID", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  const transactionTime = new Date().toLocaleTimeString("id-ID", {
    hour: "2-digit",
    minute: "2-digit",
  });
  const referenceNumber = `TUQR${Date.now().toString().slice(-8)}`; // Generate ID referensi QRIS

  const handleBackToHome = () => {
    resetTopupData();
    router.push("/Home");
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}></View>

      <View style={styles.successContainer}>
        <View style={styles.iconWrapper}>
          <Ionicons name="checkmark-circle" size={64} color="green" />
        </View>
        <Text style={styles.title}>Topup Successful</Text>
        <Text style={styles.dateTime}>
          {transactionDate}, {transactionTime}
        </Text>
      </View>

      <View style={styles.detailCard}>
        <Text style={styles.detailTitle}>QRIS Topup</Text>
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Reference Number</Text>
          <Text style={styles.infoValue}>{referenceNumber}</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Amount</Text>
          <Text style={styles.infoValue}>
            Rp{parseInt(amount).toLocaleString("id-ID")}
          </Text>
        </View>
      </View>

      <TouchableOpacity
        style={styles.backHomeButton}
        onPress={handleBackToHome}
      >
        <Text style={styles.backHomeButtonText}>Back to home</Text>
      </TouchableOpacity>
    </View>
  );
};

export default TopUpQRISSuccessScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: "#fff",
  },
  header: {
    marginBottom: 24,
  },
  successContainer: {
    alignItems: "center",
    marginBottom: 32,
  },
  iconWrapper: {
    marginBottom: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "green",
    marginBottom: 8,
    textAlign: "center",
  },
  dateTime: {
    fontSize: 14,
    color: "#666",
    textAlign: "center",
  },
  detailCard: {
    backgroundColor: "#f9f9f9",
    padding: 16,
    borderRadius: 8,
    marginBottom: 32,
  },
  detailTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 16,
    color: "#333",
  },
  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  infoLabel: {
    fontSize: 14,
    color: "#333",
  },
  infoValue: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#333",
  },
  backHomeButton: {
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
  backHomeButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
});