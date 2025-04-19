import React from "react";
import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  ScrollView,
  Image,
} from "react-native";
import { router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

const TnCScreen = () => {
  return (
    <>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.push("/Register")}>
          <Ionicons name="arrow-back" size={24} color="#000" />
        </TouchableOpacity>
      </View>
      <ScrollView contentContainerStyle={styles.content}>
        <Image source={require("../assets/images/logo.png")} />
        <Text style={styles.title}>Terms and Conditions</Text>

        <Text style={styles.text}>
          Welcome to Wally! Please read these Terms and Conditions (“Terms”)
          carefully before using our mobile application (the “Service”) operated
          by Wally.
        </Text>

        <Text style={styles.text}>
          By accessing or using the app, you agree to be bound by these Terms.
          If you do not agree with any part of the Terms, please do not use the
          app.
        </Text>

        <Text style={styles.subtitle}>1. Eligibility</Text>
        <Text style={styles.text}>
          You must be at least 17 years old, or the legal age of majority in
          your country, to use Wally. By using the app, you confirm that you
          meet this requirement.
        </Text>

        <Text style={styles.subtitle}>2. Account Registration</Text>
        <Text style={styles.text}>
          To access key features of Wally, you must register and maintain an
          active account. You are responsible for providing accurate information
          and for keeping your login credentials secure.
        </Text>

        <Text style={styles.subtitle}>3. Use of Service</Text>
        <Text style={styles.text}>
          Wally is a Sharia-compliant digital wallet that allows you to send,
          receive, and manage funds securely. You agree not to misuse the app or
          engage in any activity that violates local laws or Islamic financial
          principles, including:
        </Text>
        <Text style={styles.listItem}>
          • Fraudulent or deceptive transactions
        </Text>
        <Text style={styles.listItem}>
          • Use of funds for unlawful or non-halal purposes
        </Text>
        <Text style={styles.listItem}>
          • Unauthorized access or use of another person’s account
        </Text>
      </ScrollView>
    </>
  );
};

export default TnCScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  content: {
    padding: 24,
    paddingBottom: 80,
  },
  logo: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#A020F0",
    textAlign: "center",
    marginBottom: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 16,
  },
  subtitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 16,
    marginBottom: 4,
  },
  text: {
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 12,
    color: "#333",
  },
  listItem: {
    fontSize: 14,
    marginLeft: 16,
    marginBottom: 6,
  },
  backButton: {
    backgroundColor: "#A020F0",
    paddingVertical: 12,
    margin: 16,
    borderRadius: 8,
    alignItems: "center",
    position: "absolute",
    bottom: 20,
    left: 20,
    right: 20,
  },
  backButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingTop: 30,
    paddingHorizontal: 16,
    paddingBottom: 10,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginLeft: 16,
  },
});
