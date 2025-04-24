import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert,
  Keyboard
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useTopup } from "@/context/topupContext";
import ProtectedRoute from "@/components/ProtectedRoute";
import { useAuth } from "@/context/authContext";
import { useLocalSearchParams } from "expo-router";


const TopupScreen = () => {
  const {
    selectedMethod,
    setSelectedMethod,
    amount,
    setAmount,
    setAccountNumber,
    setFullName
  } = useTopup();
   const { authToken } = useAuth();
  
  const [isMethodDropdownVisible, setIsMethodDropdownVisible] = useState(false);
  const [isAmountEditing, setIsAmountEditing] = useState(false);
  const [keyboardVisible, setKeyboardVisible] = useState(false);
  const [fetchedBalance, setFetchedBalance] = useState<number | null>(null);

  const topupMethods = ["Debit Card", "Credit Card", "QRIS"];

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

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch("http://localhost:8080/api/users/me", {
          headers: {
            Authorization: 'Bearer ' + authToken
          },
        });
        const json = await response.json();

        if (json.status === "success") {
          const { accountnum, fullname, balance } = json.data;
          setAccountNumber(accountnum);
          setFullName(fullname);
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

  const handleAmountChange = (value: string): void => {
    const numericValue = value.replace(/\D/g, "");
    setAmount(numericValue);
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
      router.push({
        pathname: "/TopUpDebit",
        params: {
          balance: fetchedBalance?.toString(),
        },
      });
    } else if (selectedMethod === "Credit Card") {
      router.push({
        pathname: "/TopUpCredit",
        params: {
          balance: fetchedBalance?.toString(),
        },
      });
    } else if (selectedMethod === "QRIS") {
      router.push({
        pathname: "/TopUpQRIS",
        params: {
          balance: fetchedBalance?.toString(),
        },
      });
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
    <ProtectedRoute>
      <View style={styles.container}>
        <ScrollView contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">
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
              <Text style={styles.balanceAmount}>
                {fetchedBalance !== null
                  ? `Rp${fetchedBalance.toLocaleString("id-ID")}`
                  : "Memuat..."}
              </Text>
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
            <View style={styles.amountContainer}>
              <Text style={styles.rupiahPrefix}>Rp</Text>
              {isAmountEditing ? (
                <TextInput
                  autoFocus
                  style={styles.amountInput}
                  value={amount.replace(/\D/g, "")}
                  onChangeText={handleAmountChange}
                  placeholder="0"
                  keyboardType="numeric"
                  onBlur={() => setIsAmountEditing(false)}
                />
              ) : (
                <Text style={styles.amountText}>
                  {amount ? parseInt(amount, 10).toLocaleString("id-ID") : "0"}
                </Text>
              )}
            </View>
            <Text style={styles.minNote}>Minimum Rp10.000</Text>
          </TouchableOpacity>
          <View style={{ height: 80 }} />
        </ScrollView>

        {!keyboardVisible && (
          <TouchableOpacity
            style={styles.absoluteButton}
            onPress={handleNext}
            disabled={selectedMethod === "Choose Topup Method"}
          >
            <Text style={styles.buttonText}>Next</Text>
          </TouchableOpacity>
        )}
      </View>
    </ProtectedRoute>
  );
};

export default TopupScreen;


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
    marginBottom: 0,
    marginTop: 40,
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
