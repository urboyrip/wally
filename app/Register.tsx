import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
} from "react-native";
import Checkbox from "expo-checkbox";
import { router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

const RegisterScreen = () => {
  const [isChecked, setChecked] = useState(false);
  const [securePass, setSecurePass] = useState(false);
  const [secureRePass, setSecureRePass] = useState(false);

  return (
      <ScrollView contentContainerStyle={styles.content}>
        <View
          style={{
            alignItems: "center",
            paddingBottom: 40,
          }}
        >
          <Image source={require("../assets/images/logo.png")} />
        </View>
        <Text style={styles.welcome}>Register Your Account</Text>
        <Text style={styles.subtext}>Lets's get started</Text>

        <TextInput style={styles.input} placeholder="Full Name" />
        <TextInput style={styles.input} placeholder="Email" />
        <View style={styles.passwordContainer}>
          <TextInput
            style={styles.passwordInput}
            placeholder="Password"
            secureTextEntry={securePass}
          />
          <TouchableOpacity onPress={() => setSecurePass(!securePass)}>
            <Ionicons
              name={securePass ? "eye-off" : "eye"}
              size={20}
              color="#A020F0"
            />
          </TouchableOpacity>
        </View>

        <View style={styles.passwordContainer}>
          <TextInput
            style={styles.passwordInput}
            placeholder="Re - Enter Password"
            secureTextEntry={secureRePass}
          />
          <TouchableOpacity onPress={() => setSecureRePass(!secureRePass)}>
            <Ionicons
              name={secureRePass ? "eye-off" : "eye"}
              size={20}
              color="#A020F0"
            />
          </TouchableOpacity>
        </View>

        <TextInput style={styles.input} placeholder="Phone Number" />

        <View style={styles.checkboxContainer}>
          <Checkbox value={isChecked} onValueChange={setChecked} />
          <Text style={styles.checkboxText}>
            I have read and agreed to the{" "}
            <Text
              style={styles.link}
              onPress={() => router.push("/TNCRegister")}
            >
              Terms and Conditions
            </Text>
          </Text>
        </View>
        <TouchableOpacity
          style={[styles.button, { opacity: isChecked ? 1 : 0.5 }]}
          disabled={!isChecked}
        >
          <Text style={styles.buttonText} onPress={() => router.push("/PINRegist")}>Register</Text>
        </TouchableOpacity>

        <Text style={styles.registerText}>
          Don’t have an account?{" "}
          <Text style={styles.link} onPress={() => router.push("/Login")}>
            Login here
          </Text>
        </Text>
      </ScrollView>
  );
};

export default RegisterScreen;

const styles = StyleSheet.create({
  content: {
    flexGrow:1,
    backgroundColor: "#fff",
    paddingHorizontal: 32,
    paddingTop: 48,
    paddingBottom: 80,
  },
  welcome: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
  },
  subtext: {
    textAlign: "center",
    marginBottom: 24,
    marginTop: 8,
    fontSize: 14,
    color: "#444",
  },
  input: {
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    marginBottom: 20,
    paddingVertical: 8,
    fontSize: 16,
  },
  button: {
    backgroundColor: "#A020F0",
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 8,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  registerText: {
    textAlign: "center",
    marginTop: 20,
    fontSize: 14,
  },
  link: {
    color: "#A020F0",
    fontWeight: "bold",
  },
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 16,
    marginBottom: 16,
  },
  checkboxText: {
    marginLeft: 8,
    fontSize: 14,
    color: "#333",
    flexWrap: "wrap",
    flex: 1,
  },
  passwordContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    marginBottom: 20,
  },
  passwordInput: {
    flex: 1,
    paddingVertical: 8,
    fontSize: 16,
  },
});
