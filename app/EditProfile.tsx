import React, { useState,useEffect } from "react";
import { View, Text, TextInput, StyleSheet, TouchableOpacity, ScrollView } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useAuth } from "@/context/authContext";

type UserData = {
  fullname: string;
  email?: string;        
  phoneNumber?: string;  
};

const EditProfileScreen = () => {
  const {authToken} = useAuth();
  const [name, setName] = useState("Sandy Yuyu");
  const [email, setEmail] = useState("sandy.yuyu@gmail.com");
  const [phone, setPhone] = useState("081588844488");
  const [user, setUser] = useState<UserData>({
      fullname: '',
      email: '',
      phoneNumber: '',
    });

  useEffect(() => {
      const fetchUserData = async () => {
        try {
          const response = await fetch("https://kelompok5.serverku.org/api/users/me", {
            method: "GET",
            headers: {
              Authorization: "Bearer " + authToken,
            },
          });
  
          const result = await response.json();
          if (result && result.data) {
            setUser({
              fullname: result.data.fullname,
              email: result.data.email,
              phoneNumber:  result.data.phone
            });
          }
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      };
  
      fetchUserData();
    }, []);
  
  const handleSave = () => {
    router.back();
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Edit Profile</Text>
      </View>

      <View style={styles.card}>
        <Ionicons name="person-circle" size={80} color="#A020F0" style={{ alignSelf: 'center' }} />

        <Text style={styles.label}>Full Name</Text>
        <TextInput
          style={styles.input}
          value={user.fullname}
          onChangeText={setName}
        />

        <Text style={styles.label}>Email</Text>
        <TextInput
          style={styles.input}
          value={user.email}
          onChangeText={setEmail}
          keyboardType="email-address"
        />

        <Text style={styles.label}>Phone Number</Text>
        <TextInput
          style={styles.input}
          value={user.phoneNumber}
          onChangeText={setPhone}
          keyboardType="phone-pad"
        />
      </View>

      <TouchableOpacity style={styles.button} onPress={handleSave}>
        <Text style={styles.buttonText}>Save</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default EditProfileScreen;

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
  card: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 24,
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
    marginBottom: 24,
  },
  label: {
    fontSize: 14,
    color: '#555',
    marginBottom: 8,
    marginTop: 16,
  },
  input: {
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    fontSize: 16,
    paddingVertical: 6,
  },
  button: {
    backgroundColor: '#A020F0',
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 12,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
