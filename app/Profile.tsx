import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useAuth } from "@/context/authContext";

type UserData = {
  fullname: string;
  accountnum: string;
  email?: string;        
  phoneNumber?: string;  
};

const ProfileScreen = () => {
  const { authToken, logout } = useAuth();
  const [user, setUser] = useState<UserData>({
    fullname: '',
    accountnum: '',
    email: '',
    phoneNumber: '',
  });

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch("http://localhost:8080/api/users/me", {
          method: "GET",
          headers: {
            Authorization: "Bearer " + authToken,
          },
        });

        const result = await response.json();
        if (result && result.data) {
          setUser({
            fullname: result.data.fullname,
            accountnum: result.data.accountnum,
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

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Profile</Text>
      </View>

      <View style={styles.profileCard}>
        <Ionicons name="person-circle" size={80} color="#A020F0" />
        <Text style={styles.name}>{user.fullname}</Text>
        <Text style={styles.email}>Account Number: {user.accountnum}</Text>
        <Text style={styles.email}>Email : {user.email}</Text>
        <Text style={styles.email}>Phone Number : {user.phoneNumber}</Text>

        <TouchableOpacity onPress={() => router.push("/EditProfile")}>
          <Text style={styles.editLink}>Edit Profile</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.logoutButton} onPress={logout}>
        <Text style={styles.logoutText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ProfileScreen;


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 24,
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
  profileCard: {
    backgroundColor: "#fff",
    alignItems: "center",
    padding: 24,
    borderRadius: 8,
    elevation: 2,
    shadowColor: "#ccc",
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 4,
    marginBottom: 24,
  },
  name: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 12,
  },
  email: {
    color: "#555",
    marginTop: 4,
  },
  phone: {
    color: "#555",
    marginTop: 2,
    marginBottom: 8,
  },
  editLink: {
    color: "#A020F0",
    fontWeight: "500",
    marginTop: 8,
  },
  logoutButton: {
    backgroundColor: "#A020F0",
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: "center",
    marginTop: "auto",
  },
  logoutText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
});
