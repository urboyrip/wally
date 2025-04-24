import React, { useState } from 'react';
import { View, Text, TouchableOpacity, FlatList, Image, StyleSheet, Modal } from 'react-native';
import { Ionicons } from "@expo/vector-icons";
import DateTimePicker from '@react-native-community/datetimepicker';
import { router } from "expo-router";

const DATA = {
  income: [
    { id: '1', date: '20 April 2025', type: 'Topup', code: 'TUQR20250420 - ROGER RR', amount: 'Rp50.000' },
    { id: '2', date: '19 April 2025', type: 'Topup', code: 'TUCC20250419 - ROGER RR', amount: 'Rp50.000' },
    { id: '3', date: '18 April 2025', type: 'Transfer', code: 'TRF20250418 - AHMAD JAELANI', amount: 'Rp50.000' },
    { id: '4', date: '18 April 2025', type: 'Topup', code: 'TUQR20250418 - ROGER RR', amount: 'Rp50.000' },
  ],
  expense: [
    { id: '5', date: '20 April 2025', type: 'Transfer', code: 'TRF20250420 - LAILA LALILI', amount: 'Rp50.000' },
    { id: '6', date: '18 April 2025', type: 'Transfer', code: 'TRF20250418 - KIKO RAMSIYAH', amount: 'Rp50.000' },
    { id: '7', date: '16 April 2025', type: 'Transfer', code: 'TRF20250416 - LIYANDA WINKY', amount: 'Rp50.000' },
    { id: '8', date: '15 April 2025', type: 'Transfer', code: 'TRF20250415 - KIKO RAMSIYAH', amount: 'Rp50.000' },
    { id: '9', date: '11 April 2025', type: 'Transfer', code: 'TRF20250411 - KIKO RAMSIYAH', amount: 'Rp50.000' },
  ]
};

const tabs = ['income', 'expense'];

const iconMap = {
  Transfer: require('../assets/images/transfer.png'),
  Topup: require('../assets/images/topup.png'),
};

const FinancialRecordsScreen = () => {
  const [activeTab, setActiveTab] = useState('expense');
  const [startDate, setStartDate] = useState(new Date(2025, 3, 1));
  const [endDate, setEndDate] = useState(new Date(2025, 3, 30));
  const [isDatePickerVisible, setIsDatePickerVisible] = useState(false);
  const [isStartPicker, setIsStartPicker] = useState(true);

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <Text style={styles.date}>{item.date}</Text>
      <View style={styles.transactionRow}>
        <Image source={iconMap[item.type]} style={styles.icon} />
        <View style={styles.transactionDetails}>
          <Text style={styles.type}>{item.type}</Text>
          <Text style={styles.code}>{item.code}</Text>
        </View>
        <Text style={styles.amount}>{item.amount}</Text>
      </View>
    </View>
  );

  const handleDateChange = (event, selectedDate) => {
    setIsDatePickerVisible(false);
    if (selectedDate) {
      if (isStartPicker) {
        setStartDate(selectedDate);
        const maxEndDate = new Date(selectedDate);
        maxEndDate.setDate(maxEndDate.getDate() + 30);
        if (endDate > maxEndDate) {
          setEndDate(maxEndDate);
        }
      } else {
        const maxEndDate = new Date(startDate);
        maxEndDate.setDate(maxEndDate.getDate() + 30);
        if (selectedDate <= maxEndDate) {
          setEndDate(selectedDate);
        } else {
          alert('End date cannot exceed 30 days from the start date.');
        }
      }
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => router.back()}>
        <Ionicons name="arrow-back" size={24} color="#000" />
      </TouchableOpacity>
      <Text style={styles.header}>Your Financial Records</Text>

      <View style={styles.dateFilterContainer}>
        <View>
          <Text style={styles.dateFilterLabel}>Current Report Period</Text>
          <Text style={styles.dateFilterValue}>
            {startDate.toLocaleDateString('id-ID')} - {endDate.toLocaleDateString('id-ID')}
          </Text>
        </View>
        <View style={{ flexDirection: 'row', gap: 10 }}>
          <TouchableOpacity
            onPress={() => {
              setIsStartPicker(true);
              setIsDatePickerVisible(true);
            }}
            style={styles.calendarButton}
          >
            <Ionicons name="calendar" size={24} color="#9B30FF" />
            <Text style={styles.calendarText}>Start</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              setIsStartPicker(false);
              setIsDatePickerVisible(true);
            }}
            style={styles.calendarButton}
          >
            <Ionicons name="calendar" size={24} color="#9B30FF" />
            <Text style={styles.calendarText}>End</Text>
          </TouchableOpacity>
        </View>
      </View>

      {isDatePickerVisible && (
        <DateTimePicker
          value={isStartPicker ? startDate : endDate}
          mode="date"
          display="default"
          onChange={handleDateChange}
        />
      )}

      <View style={styles.tabContainer}>
        {tabs.map((tab) => (
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
        data={DATA[activeTab]}
        keyExtractor={(item) => item.id}
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
  dateFilterContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 12,
    backgroundColor: '#f9f9f9',
    borderRadius: 10,
    marginBottom: 20,
  },
  dateFilterLabel: { fontSize: 12, color: '#333' },
  dateFilterValue: { fontSize: 14, fontWeight: 'bold', color: '#9B30FF' },
  calendarButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    padding: 8,
    borderRadius: 8,
  },
  calendarText: { marginLeft: 8, color: '#9B30FF', fontWeight: 'bold' },
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
});

export default FinancialRecordsScreen;