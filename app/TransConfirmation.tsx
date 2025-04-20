
import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { useLocalSearchParams, router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

const ConfirmationScreen = () => {
  const {
    recipientName,
    recipientAccount,
    senderName,
    senderAccount,
    note,
    amount,
  } = useLocalSearchParams();

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.title}>Confirmation</Text>
      </View>

      <Text style={styles.label}>Recipient</Text>
      <View style={styles.card}>
        <Text style={styles.name}>{recipientName}</Text>
        <Text style={styles.account}>{recipientAccount}</Text>
      </View>

      <Text style={styles.label}>Source of Fund</Text>
      <View style={styles.card}>
        <Text style={styles.name}>{senderName}</Text>
        <Text style={styles.account}>{senderAccount}</Text>
      </View>

      <View style={styles.row}>
        <Text style={styles.leftText}>Notes</Text>
        <Text style={styles.rightText}>{note || "-"}</Text>
      </View>

      <View style={styles.row}>
        <Text style={styles.leftText}>Amount</Text>
        <Text style={styles.rightText}>
          Rp{parseInt(amount as string).toLocaleString("id-ID")}
        </Text>
      </View>

      <TouchableOpacity style={styles.button} onPress={() => router.push("/InputPIN")}>
        <Text style={styles.buttonText}>Confirm</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default ConfirmationScreen;

const styles = StyleSheet.create({
  container: {
    padding: 24,
    backgroundColor: "#fff",
    flexGrow: 1,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 24,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginLeft: 16,
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
