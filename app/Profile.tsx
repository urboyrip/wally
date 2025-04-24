import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";

const ProfileScreen = () => {
  const user = {
    fullName: "Sandy Yuyu",
    email: "sandy.yuyu@gmail.com",
    phoneNumber: "081588844488",
  };

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
        <Text style={styles.name}>{user.fullName}</Text>
        <Text style={styles.email}>{user.email}</Text>
        <Text style={styles.phone}>{user.phoneNumber}</Text>
        <TouchableOpacity onPress={() => router.push("/EditProfile")}>
          <Text style={styles.editLink}>Edit Profile</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.logoutButton} onPress={() => router.push("/Login")}>
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
