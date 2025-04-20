// TopUpCreditSuccessScreen.tsx
import React, { useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useTopup } from "@/context/topupContext";

const TopUpCreditSuccessScreen = () => {
  const { amount, cardDetails, resetTopupData } = useTopup();
    const { cardNumber, expiry } = cardDetails; 

  const transactionDate = new Date().toLocaleDateString("id-ID", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  const transactionTime = new Date().toLocaleTimeString("id-ID", {
    hour: "2-digit",
    minute: "2-digit",
  });
  const referenceNumber = `TUCC${Date.now().toString().slice(-8)}`;

  const handleBackToHome = () => {
    resetTopupData();
    router.push("/");
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
        <Text style={styles.detailTitle}>Credit Card Topup</Text>{" "}
       
        <View style={styles.cardInfo}>
          <View style={styles.iconContainer}>
            <Ionicons name="card-outline" size={48} color="#888" />{" "}
            
          </View>
          <View style={styles.cardDetails}>
            <Text style={styles.cardNumber}>
              **** **** **** {cardNumber?.slice(-4)}
            </Text>
            <Text style={styles.expiryCvv}>Expiration {expiry}</Text>
            <Text style={styles.expiryCvv}>(CVV)</Text>
          </View>
        </View>
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

export default TopUpCreditSuccessScreen;

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
  cardInfo: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  iconContainer: {
    marginRight: 16,
  },
  cardDetails: {},
  cardNumber: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#555",
    marginBottom: 4,
  },
  expiryCvv: {
    fontSize: 14,
    color: "#777",
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
  },
  backHomeButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
});
