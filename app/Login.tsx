import { router } from "expo-router";
import React from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Image,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";

const LoginScreen = () => {
  const [secure, setSecure] = useState(true);

  return (
    <View style={styles.container}>
      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
          paddingBottom: 40,
        }}
      >
        <Image source={require("../assets/images/logo.png")} />
      </View>
      <Text style={styles.welcome}>Welcome Back</Text>
      <Text style={styles.subtext}>
        Enter your email and password to access your account!
      </Text>

      <TextInput style={styles.input} placeholder="Email" />
      <View style={styles.passwordContainer}>
        <TextInput
          style={styles.passwordInput}
          placeholder="Password"
          secureTextEntry={secure}
        />
        <TouchableOpacity onPress={() => setSecure(!secure)}>
          <Ionicons
            name={secure ? "eye-off" : "eye"}
            size={20}
            color="#A020F0"
          />
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>

      <Text style={styles.registerText}>
        Don’t have an account?{" "}
        <Text style={styles.link} onPress={() => router.push("/Register")}>
          Register here
        </Text>
      </Text>
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 32,
    justifyContent: "center",
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
  },  passwordContainer: {
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
