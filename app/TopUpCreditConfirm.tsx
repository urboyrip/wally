import { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Alert } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useTopup } from "@/context/topupContext";
import { useAuth } from "@/context/authContext";

const CreditCardConfirmationScreen = () => {
  const { amount, cardDetails, accountNumber } = useTopup();
  const { cardNumber, cvv, expiry } = cardDetails;
  const { authToken } = useAuth();

  const [errorMessage, setErrorMessage] = useState("");

  const handleConfirmTopup = async () => {
    try {
      console.log(expiry);
      const response = await fetch("https://kelompok5.serverku.org/api/topup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + authToken,
        },
        body: JSON.stringify({
          accountnum: accountNumber,
          amount: parseInt(amount),
          method: "Credit",
          cardNumber: cardNumber.replace(/[^0-9]/g, ''),
          cvv: cvv,
          expirationDate: expiry,
        }),
      });
      
      const json = await response.json();

      if (response.ok && json.status === "success") {
        setErrorMessage("");
        router.push({
          pathname: "/TopUpDebitSuccess",
          params: { amount: amount, cardNumber: cardNumber, expiry: expiry },
        });
        console.log("Top up berhasil:", json);
      } else {
        const msg = json.message || "Top up gagal dilakukan.";
        setErrorMessage(msg);
        console.error("Top up error:", json);
      }
    } catch (error) {
      const fallback = "Terjadi kesalahan saat menghubungi server.";
      setErrorMessage(fallback);
      console.error("Top up error:", error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Confirmation</Text>
      </View>

      <Text style={styles.topupMethodTitle}>Credit Card Topup</Text>

      <View style={styles.cardInfo}>
        <View style={styles.iconContainer}>
          <Ionicons name="card-outline" size={48} color="#888" />
        </View>
        <View>
          <Text style={styles.cardNumber}>
            **** **** **** {cardNumber.slice(-4)}
          </Text>
          <Text style={styles.expiryCvv}>Expiration {expiry}</Text>
          <Text style={styles.expiryCvv}>(CVV)</Text>
        </View>
      </View>

      <View style={styles.amountRow}>
        <Text style={styles.amountLabel}>Amount</Text>
        <Text style={styles.amountValue}>
          Rp{parseInt(amount).toLocaleString("id-ID")}
        </Text>
      </View>

      {errorMessage !== "" && (
        <View style={styles.errorBox}>
          <Text style={styles.errorText}>{errorMessage}</Text>
        </View>
      )}

      <TouchableOpacity
        style={styles.confirmButton}
        onPress={handleConfirmTopup}
      >
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
  errorBox: {
    backgroundColor: "#fdecea",
    borderColor: "#f5c6cb",
    borderWidth: 1,
    padding: 12,
    borderRadius: 8,
    marginBottom: 16,
  },
  errorText: {
    color: "#a94442",
    fontSize: 14,
    textAlign: "center",
  },
  confirmButton: {
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
  confirmButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
});
