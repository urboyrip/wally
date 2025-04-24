import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { useTransfer } from "@/context/transferContext";

const ConfirmationScreen: React.FC = () => {
  const {
    accountNumber,
    amount,
    note,
    recipientAccount,
    recipientName,
    senderName,
  } = useTransfer();
  

  return (
    <View style={styles.container}>
      <ScrollView style={styles.content} keyboardShouldPersistTaps="handled">
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
          <Text style={styles.account}>{accountNumber}</Text>
        </View>

        <View style={styles.row}>
          <Text style={styles.leftText}>Notes</Text>
          <Text style={styles.rightText}>{note || "-"}</Text>
        </View>

        <View style={styles.row}>
          <Text style={styles.leftText}>Amount</Text>
          <Text style={styles.rightText}>
            Rp{parseInt(amount || "0").toLocaleString("id-ID")}
          </Text>
        </View>
        
        {/* Tambahkan spacer di bawah content */}
        <View style={{ height: 80 }} />
      </ScrollView>
      
        <TouchableOpacity
          style={styles.absoluteButton}
          onPress={() =>
            router.push({
              pathname: "/InputPIN",
            })
          }
        >
          <Text style={styles.buttonText}>Confirm</Text>
        </TouchableOpacity>
    </View>
  );
};

export default ConfirmationScreen;

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
  absoluteButton: {
    backgroundColor: "#A020F0",
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: "center",
    marginHorizontal: 24,
    marginBottom: 24,
    position: 'absolute',
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