// CreditCardConfirmationScreen.tsx
import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router"
import { useTopup } from "@/context/topupContext";

const CreditCardConfirmationScreen = () => {
  const { amount, cardDetails } = useTopup();
    const { cardNumber, expiry } = cardDetails;

  const handleConfirmTopup = () => {
    router.push({
      pathname: "/TopUpCreditSuccess",
      params: { amount: amount, cardNumber: cardNumber, expiry: expiry },
    });
    console.log("Melakukan top up kartu kredit:", cardNumber, expiry, amount);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Confirmation</Text>
      </View>

      <Text style={styles.topupMethodTitle}>Credit Card Topup</Text> {/* Ubah teks metode */}

      <View style={styles.cardInfo}>
        <View style={styles.iconContainer}>
          <Ionicons name="card-outline" size={48} color="#888" /> {/* Ganti ikon jika perlu */}
        </View>
        <View style={styles.cardDetails}>
          <Text style={styles.cardNumber}>**** **** **** {cardNumber?.slice(-4)}</Text>
          <Text style={styles.expiryCvv}>Expiration {expiry}</Text>
          <Text style={styles.expiryCvv}>(CVV)</Text>
        </View>
      </View>

      <View style={styles.amountRow}>
        <Text style={styles.amountLabel}>Amount</Text>
        <Text style={styles.amountValue}>Rp{parseInt(amount).toLocaleString("id-ID")}</Text>
      </View>

      <TouchableOpacity style={styles.confirmButton} onPress={handleConfirmTopup}>
        <Text style={styles.confirmButtonText}>Confirm</Text>
      </TouchableOpacity>
    </View>
  );
};

export default CreditCardConfirmationScreen;

const styles = StyleSheet.create({
  container: {
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
  topupMethodTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 16,
    color: "#333",
  },
  cardInfo: {
    backgroundColor: "#f9f9f9",
    padding: 16,
    borderRadius: 8,
    marginBottom: 24,
    flexDirection: "row",
    alignItems: "center",
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
  amountRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 24,
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  amountLabel: {
    fontSize: 16,
    color: "#333",
  },
  amountValue: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  confirmButton: {
    backgroundColor: "#A020F0",
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: "center",
  },
  confirmButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
});