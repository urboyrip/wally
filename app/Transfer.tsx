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
  FlatList,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useTransfer } from "@/context/transferContext";
import ProtectedRoute from "@/components/ProtectedRoute";
import { useAuth } from "@/context/authContext";

const TransferScreen: React.FC = () => {
  const {
    amount,
    setAmount,
    note,
    setNote,
    recipientAccount,
    setRecipientAccount,
    setRecipientName,
    setAccountNumber,
    setSenderName,
  } = useTransfer();
  const { authToken } = useAuth();

  const [isEditingAmount, setIsEditingAmount] = useState<boolean>(false);
  const [keyboardVisible, setKeyboardVisible] = useState<boolean>(false);
  const [users, setUsers] = useState<
    { accountnum: string; fullname: string }[]
  >([]);
  const [wallyBalance, setWallyBalance] = useState<number>(0);

  // State untuk mengontrol visibilitas dropdown kustom
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  // State untuk menyimpan item penerima yang dipilih untuk tampilan
  const [selectedRecipient, setSelectedRecipient] = useState<{
    accountnum: string;
    fullname: string;
  } | null>(null);

  useEffect(() => {
    // Fungsi-fungsi fetch data tetap sama
    const fetchUserMe = async () => {
      try {
        const response = await fetch("http://localhost:8080/api/users/me", {
          headers: {
            Authorization: 'Bearer ' + authToken
          },
        });
        const result = await response.json();
        const userData = result.data;
        setWallyBalance(userData.balance);
        setAccountNumber(userData.accountnum);
        setSenderName(userData.fullname);
      } catch (error) {
        console.error("Failed to fetch user data:", error);
      }
    };

    const fetchUsers = async () => {
      try {
        const response = await fetch("http://localhost:8080/api/users/all", {
          headers: {
            Authorization: 'Bearer ' + authToken
          },
        });

        const data = await response.json();
        const parsed = data.map((userString: string) => {
          const [accountnum, fullname] = userString.split(" - ");
          return { accountnum, fullname };
        });
        setUsers(parsed);
      } catch (error) {
        console.error("Failed to fetch users:", error);
      }
    };

    fetchUserMe();
    fetchUsers();

    const keyboardDidShowListener = Keyboard.addListener(
      "keyboardDidShow",
      () => setKeyboardVisible(true)
    );
    const keyboardDidHideListener = Keyboard.addListener(
      "keyboardDidHide",
      () => setKeyboardVisible(false)
    );

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, [authToken]);

  const handleAmountChange = (value: string): void => {
    const numericValue = value.replace(/\D/g, "");
    setAmount(numericValue);
  };

  const handleNext = (): void => {
    if (!recipientAccount.trim() || recipientAccount === "0") {
      Alert.alert(
        "Peringatan",
        "Nomor rekening harus dipilih dan tidak boleh 0."
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

    if (numericAmount > wallyBalance) {
      Alert.alert(
        "Peringatan",
        `Jumlah transfer melebihi saldo Anda (Rp${wallyBalance.toLocaleString(
          "id-ID"
        )}).`
      );
      return;
    }

    router.push("/TransConfirmation");
  };

  // Fungsi untuk menampilkan/menyembunyikan dropdown kustom
  const toggleDropdown = () => {
    setIsDropdownVisible(!isDropdownVisible);
  };

  // Fungsi untuk menangani pemilihan item dari dropdown kustom
  const handleSelectRecipient = (user: {
    accountnum: string;
    fullname: string;
  }) => {
    setRecipientAccount(user.accountnum);
    setRecipientName(user.fullname);
    setSelectedRecipient(user);
    setIsDropdownVisible(false);
  };

  // Komponen untuk merender setiap item dalam dropdown
  const renderRecipientItem = ({
    item,
  }: {
    item: { accountnum: string; fullname: string };
  }) => (
    <TouchableOpacity
      style={styles.dropdownItem}
      onPress={() => handleSelectRecipient(item)}
    >
      <Text style={styles.dropdownItemText}>
        {`${item.fullname} (${item.accountnum})`}
      </Text>
    </TouchableOpacity>
  );

  return (
    <ProtectedRoute>
      <View style={styles.container}>
        <ScrollView style={styles.content} keyboardShouldPersistTaps="handled">
          <View style={styles.header}>
            <TouchableOpacity onPress={() => router.back()}>
              <Ionicons name="arrow-back" size={24} color="#000" />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>Transfer</Text>
          </View>

          <Text style={styles.label}>Select Recipient Account</Text>
          
          <TouchableOpacity
            style={styles.dropdownButton} 
            onPress={toggleDropdown}
          >
            <Text
              style={
                selectedRecipient
                  ? styles.dropdownText 
                  : [styles.dropdownText, { color: "#999" }] 
              }
            >
              {selectedRecipient
                ? `${selectedRecipient.fullname} (${selectedRecipient.accountnum})`
                : "Choose Recipient Account"}
            </Text>
            <Ionicons
              name={isDropdownVisible ? "chevron-up" : "chevron-down"}
              size={20}
              color="#A020F0"
            />
          </TouchableOpacity>

          {isDropdownVisible && (
            <View style={styles.dropdownContainer}>
              <FlatList
                data={users}
                keyExtractor={(item) => item.accountnum}
                renderItem={renderRecipientItem}
              />
            </View>
          )}

          <Text style={styles.label}>Source of Fund</Text>
          <View style={styles.sourceBox}>
            <Ionicons name="wallet" size={24} color="#A020F0" />
            <View style={{ marginLeft: 12 }}>
              <Text>Wally Balance</Text>
              <Text style={{ fontWeight: "bold" }}>
                Rp{wallyBalance.toLocaleString("id-ID")}
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
    </ProtectedRoute>
  );
};

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
    maxHeight: 200,
  },
  dropdownItem: {
    paddingVertical: 10,
    paddingHorizontal: 16,
  },
  dropdownItemText: {
    fontSize: 16,
    color: "#000",
  },
});



export default TransferScreen;
