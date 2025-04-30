// TopUpQRISConfirmScreen.tsx
import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native"; 
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useTopup } from "@/context/topupContext";

const PAYMENT_TIMEOUT = 3 * 60;
const qrisImage = require("../assets/images/qris.png");

const TopUpQRISConfirmScreen = () => {
  const { amount } = useTopup();
  const [timeLeft, setTimeLeft] = useState(PAYMENT_TIMEOUT);
  let intervalId: NodeJS.Timeout | null = null;

  

  useEffect(() => {
    intervalId = setInterval(() => {
      setTimeLeft((prevTime) => prevTime - 1);
    }, 1000);

    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, []);

  useEffect(() => {
    if (timeLeft <= 0) {
      if (intervalId) {
        clearInterval(intervalId);
      }
      router.replace("/TopUp");
    }
  }, [timeLeft, router]);

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? "0" : ""}${remainingSeconds}`;
  };

  const handleConfirmTopup = () => {
    router.push("/TopUpQRISSuccess");
    console.log("Melakukan top up QRIS:", amount);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Confirmation</Text>
      </View>

      <Text style={styles.topupMethodTitle}>QRIS Topup</Text>

      <View style={styles.infoContainer}>
        <View style={styles.iconContainer}>
          <Ionicons name="qr-code-outline" size={48} color="#888" />
        </View>
        <Text style={styles.infoText}>
          Scan QR Code di bawah ini menggunakan aplikasi pembayaran Anda.
        </Text>
        <View style={styles.qrCodeContainer}>
          <Image source={qrisImage} style={styles.qrImage} resizeMode="contain" />
        </View>
        <Text style={styles.timerText}>Waktu pembayaran: {formatTime(timeLeft)}</Text>
      </View>

      <View style={styles.amountRow}>
        <Text style={styles.amountLabel}>Amount</Text>
        <Text style={styles.amountValue}>Rp{parseInt(amount).toLocaleString("id-ID")}</Text>
      </View>

      <TouchableOpacity style={styles.confirmButton} onPress={handleConfirmTopup}>
        <Text style={styles.confirmButtonText}>Next</Text>
      </TouchableOpacity>
    </View>
  );
};

export default TopUpQRISConfirmScreen;

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
  infoContainer: {
    backgroundColor: "#f9f9f9",
    padding: 16,
    borderRadius: 8,
    marginBottom: 24,
    alignItems: "center",
  },
  iconContainer: {
    marginBottom: 16,
  },
  infoText: {
    fontSize: 14,
    color: "#666",
    textAlign: "center",
    marginBottom: 16,
  },
  qrCodeContainer: {
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
    alignItems: "center",
    justifyContent: "center",
    elevation: 3,
  },
  qrImage: {
    width: 200,
    height: 200,
  },
  timerText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "red",
    marginTop: 16,
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