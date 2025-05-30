// TopUpQRISScreen.tsx
import React from "react";
import {
  View,
  Text,
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
import { useEffect,useState } from "react";
import { useAuth } from "@/context/authContext";

const TopUpQRISScreen = () => {
  const { amount,setAmount } = useTopup();
  const {authToken} = useAuth()
  const [fetchedBalance, setFetchedBalance] = useState<number | null>(null);

  useEffect(() => {
      const fetchUserData = async () => {
        try {
          const response = await fetch("https://kelompok5.serverku.org/api/users/me", {
            headers: {
              Authorization: 'Bearer ' + authToken
            },
          });
          const json = await response.json();
  
          if (json.status === "success") {
            const { balance } = json.data;
            setFetchedBalance(balance);
          } else {
            Alert.alert("Error", "Gagal mengambil data user.");
          }
        } catch (error) {
          Alert.alert("Error", "Terjadi kesalahan saat mengambil data user.");
          console.error("Error fetching user data:", error);
        }
      };
  
      fetchUserData();
    }, []);

  

  const handleNext = () => {
    const numericAmount = parseFloat(amount.replace(/\D/g, ""));
    if (!amount.trim() || numericAmount === 0) {
      Alert.alert("Peringatan", "Jumlah top up tidak valid.");
      return;
    }
    router.push("/TopUpQRISConfirm");
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
          <Text style={styles.headerTitle}>QRIS</Text>
        </View>

        <View style={styles.balanceCard}>
          <Ionicons name="wallet" size={24} color="#A020F0" />
          <View style={{ marginLeft: 12 }}>
            <Text style={styles.balanceLabel}>Wally Balance</Text>
            <Text style={styles.balanceAmount}>{fetchedBalance !== null
                  ? `Rp${fetchedBalance.toLocaleString("id-ID")}`
                  : "Memuat..."}</Text>
          </View>
        </View>
        <Text style={styles.label}>Choose Top Up Method</Text>
        <View style={styles.selectedMethodContainer}>
          <Text style={styles.selectedMethodText}>QRIS</Text>
        </View>

        <View style={styles.amountBox}>
          <Text style={styles.labeltopup}>Top Up Amount</Text>
          <Text style={styles.amountText}>
            Rp{parseInt(amount).toLocaleString("id-ID")}
          </Text>
        </View>

        <Text style={styles.infoText}>
        Mohon maaf, metode Top Up menggunakan QRIS saat ini masih dalam pengembangan dan belum dapat digunakan.
        </Text>

        <TouchableOpacity style={[styles.button, { opacity: 0.5 }]} onPress={handleNext} disabled>
          <Text style={styles.buttonText}>Next</Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default TopUpQRISScreen;

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
  button: {
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
  infoText: {
    fontSize: 14,
    color: "#666",
    marginTop: 20,
    textAlign: "center",
  },
});