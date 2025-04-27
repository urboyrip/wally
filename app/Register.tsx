import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
  Alert,
} from "react-native";
import Checkbox from "expo-checkbox";
import { router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

const RegisterScreen = () => {
  const [isChecked, setChecked] = useState(false);
  const [securePass, setSecurePass] = useState(false);
  const [secureRePass, setSecureRePass] = useState(false);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rePassword, setRePassword] = useState("");
  const [phone, setPhone] = useState("");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const handleRegister = async () => {
    if (!isChecked) {
        setErrorMessage("Please agree to the Terms and Conditions.");
        setSuccessMessage(null);
        return;
    }

    if (password !== rePassword) {
        setErrorMessage("Passwords do not match.");
        setSuccessMessage(null);
        return;
    }

    setErrorMessage(null);
    setSuccessMessage(null);

    try {
        const response = await fetch("http://localhost:8080/api/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                fullName: fullName,
                email: email,
                phone: phone,
                password: password,
                confirmationPassword: rePassword
            }),
        });

        const data = await response.json();

        if (data.accountnum && data.message === "Proceed to PIN entry.") {
          console.log("Registration successful:", data.message, "Account Number:", data.accountnum);
          setSuccessMessage(data.message);
  
          setTimeout(() => {
            router.push({ pathname: "/PINRegist", params: { accountnum: data.accountnum } });
          }, 2000);
    
          setErrorMessage(null);
      } else {
          setErrorMessage(data.message || "Something went wrong.");
      }
    } catch (error) {
        console.error("Error during registration:", error);
        setErrorMessage("Failed to connect to the server.");
    }
};

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

      <TextInput
        style={styles.input}
        placeholder="Full Name"
        value={fullName}
        onChangeText={setFullName}
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
      />
      <View style={styles.passwordContainer}>
        <TextInput
          style={styles.passwordInput}
          placeholder="Password"
          secureTextEntry={securePass}
          value={password}
          onChangeText={setPassword}
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
          value={rePassword}
          onChangeText={setRePassword}
        />
        <TouchableOpacity onPress={() => setSecureRePass(!secureRePass)}>
          <Ionicons
            name={secureRePass ? "eye-off" : "eye"}
            size={20}
            color="#A020F0"
          />
        </TouchableOpacity>
      </View>

      <TextInput
        style={styles.input}
        placeholder="Phone Number"
        value={phone}
        onChangeText={setPhone}
      />

      <View style={styles.checkboxContainer}>
        <Checkbox value={isChecked} onValueChange={setChecked} />
        <Text style={styles.checkboxText}>
          I have read and agreed to the{" "}
          <Text style={styles.link} onPress={() => router.push("/TNCRegister")}>
            Terms and Conditions
          </Text>
        </Text>
      </View>
      {errorMessage && <Text style={styles.errorText}>{errorMessage}</Text>}
    {successMessage && <Text style={styles.successText}>{successMessage}</Text>}
      <TouchableOpacity
        style={[styles.button, { opacity: isChecked ? 1 : 0.5 }]}
        disabled={!isChecked}
        onPress={handleRegister}
      >
        <Text style={styles.buttonText}>Register</Text>
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
    flexGrow: 1,
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
  errorText: {
    color: "red",
    fontSize: 14,
    marginTop: 8,
    textAlign: "center",
},successText: {
  color: "green",
  fontSize: 14,
  marginTop: 8,
  textAlign: "center",
},
});
