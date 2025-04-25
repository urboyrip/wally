import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, FlatList, Image, StyleSheet } from 'react-native';
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useAuth } from "@/context/authContext";

const iconMap = {
  income: require('../assets/images/topup.png'),
  expense: require('../assets/images/transfer.png'),
};

const FinancialRecordsScreen = () => {
  const [transactions, setTransactions] = useState([]);
  const [activeTab, setActiveTab] = useState('expense');
  const [loading, setLoading] = useState(true);
  const { authToken, logout } = useAuth();

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const response = await fetch('http://localhost:8080/api/transactions/me', {
          method: 'GET',
          headers: {
            Authorization: 'Bearer ' + authToken,
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result = await response.json();
        setTransactions(result.data.transactions); // Simpan data transaksi ke state
        console.log("Transactions:", result.data.transactions);
      } catch (error) {
        console.error("Error fetching transactions:", error);
      } finally {
        setLoading(false); // Set loading selesai
      }
    };

    fetchTransactions();
  }, []);

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <Text style={styles.date}>{new Date(item.dateTime).toLocaleDateString('id-ID')}</Text>
      <View style={styles.transactionRow}>
        <Image source={iconMap[item.type]} style={styles.icon} />
        <View style={styles.transactionDetails}>
          <Text style={styles.type}>{item.fromTo}</Text>
          <Text style={styles.code}>{item.description}</Text>
        </View>
        <Text style={styles.amount}>
          {item.type === 'income' ? '+' : '-'}Rp {item.amount.toLocaleString('id-ID')}
        </Text>
      </View>
    </View>
  );

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => router.back()}>
        <Ionicons name="arrow-back" size={24} color="#000" />
      </TouchableOpacity>
      <Text style={styles.header}>Your Financial Records</Text>

      <View style={styles.tabContainer}>
        {['income', 'expense'].map((tab) => (
          <TouchableOpacity
            key={tab}
            style={[styles.tab, activeTab === tab && styles.activeTab]}
            onPress={() => setActiveTab(tab)}>
            <Text style={[styles.tabText, activeTab === tab && styles.activeTabText]}>
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <FlatList
        data={transactions.filter((item) => item.type === activeTab)} // Filter berdasarkan tab
        keyExtractor={(item) => item.id.toString()} // Gunakan ID dari API
        renderItem={renderItem}
        contentContainerStyle={{ paddingBottom: 20 }}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, paddingHorizontal: 20, backgroundColor: '#fff', padding: 24 },
  header: { fontSize: 20, fontWeight: 'bold', textAlign: 'center', marginBottom: 20 },
  tabContainer: { flexDirection: 'row', justifyContent: 'center', marginBottom: 20, gap: 10 },
  tab: { paddingVertical: 8, paddingHorizontal: 16, backgroundColor: '#eee', borderRadius: 20 },
  activeTab: { backgroundColor: '#9B30FF', borderWidth: 1, borderColor: '#000' },
  tabText: { color: '#333', fontWeight: '600' },
  activeTabText: { color: 'white' },
  card: { backgroundColor: '#f5f5f5', padding: 14, borderRadius: 12, marginBottom: 12 },
  date: { color: '#9B30FF', fontWeight: '600', marginBottom: 4 },
  transactionRow: { flexDirection: 'row', alignItems: 'center' },
  icon: { width: 18, height: 18, marginRight: 10, tintColor: '#9B30FF' },
  transactionDetails: { flex: 1 },
  type: { fontWeight: 'bold', fontSize: 14 },
  code: { color: '#333' },
  amount: { color: '#9B30FF', fontWeight: 'bold' },
  loadingContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
});

export default FinancialRecordsScreen;