import React, { useState, useEffect, useCallback, useMemo } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  Image,
  StyleSheet,
  Platform,
  ActivityIndicator,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useAuth } from "@/context/authContext";

interface Transaction {
  id: number;
  dateTime: string;
  type: "income" | "expense";
  fromTo?: string;
  description?: string;
  amount: number;
}

const iconMap: Record<string, any> = {
  income: require("../assets/images/topup.png"),
  expense: require("../assets/images/transfer.png"),
};

const TransactionsScreen = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [activeTab, setActiveTab] = useState<"income" | "expense">("expense");
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState<number | null>(null);
  const { authToken } = useAuth();
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [showStartPicker, setShowStartPicker] = useState(false);
  const [showEndPicker, setShowEndPicker] = useState(false);
  const [isFetchingMore, setIsFetchingMore] = useState(false);

  const fetchTransactions = useCallback(
    async (pageNumber: number) => {
      setIsFetchingMore(true);
      try {
        const response = await fetch(
          `https://kelompok5.serverku.org/api/transactions/me?page=${pageNumber}&direction=desc`,
          {
            method: "GET",
            headers: {
              Authorization: "Bearer " + authToken,
              "Content-Type": "application/json",
            },
          }
        );

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result: {
          data: { transactions: Transaction[]; totalPages: number };
        } = await response.json();
        setTransactions((prevTransactions) => [
          ...prevTransactions,
          ...result.data.transactions,
        ]);
        setTotalPages(result.data.totalPages);
      } catch (error) {
        console.error("Error fetching transactions:", error);
      } finally {
        setLoading(false);
        setIsFetchingMore(false);
      }
    },
    [authToken]
  );

  useEffect(() => {
    setTransactions([]);
    setPage(1);
    setLoading(true);
    fetchTransactions(1);
  }, [activeTab, startDate, endDate, fetchTransactions]);

  const isWithinDateRange = useCallback(
    (dateTimeStr: string): boolean => {
      const date = new Date(dateTimeStr);
      if (startDate && date < startDate) return false;
      if (endDate && date > endDate) return false;
      return true;
    },
    [startDate, endDate]
  );

  const filteredData = useMemo(() => {
    return transactions
      .filter((item) => item && item.type === activeTab)
      .filter((item) => isWithinDateRange(item.dateTime));
  }, [transactions, activeTab, isWithinDateRange]);

  const renderItem = ({ item }: { item: Transaction }) => {
    return (
      <View style={styles.card}>
        <Text style={styles.date}>
          {item.dateTime ? new Date(item.dateTime).toLocaleDateString("id-ID") : "-"}
        </Text>
        <View style={styles.transactionRow}>
          <Image
            source={iconMap[item.type] || iconMap.expense}
            style={styles.icon}
          />
          <View style={styles.transactionDetails}>
            <Text style={styles.type}>{item.fromTo || "-"}</Text>
            <Text style={styles.code}>{item.description || "-"}</Text>
          </View>
          <Text style={styles.amount}>
            {item.type === "income" ? "+" : "-"}Rp{" "}
            {item.amount ? Number(item.amount).toLocaleString("id-ID") : "0"}
          </Text>
        </View>
      </View>
    );
  };

  const handleLoadMore = () => {
    if (!isFetchingMore && totalPages && page < totalPages) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  useEffect(() => {
    if (page > 1) {
      fetchTransactions(page);
    }
  }, [page, fetchTransactions]);

  if (loading && transactions.length === 0) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#9B30FF" />
      </View>
    );
  }

  const ListFooterComponent = () => {
    if (isFetchingMore) {
      return <ActivityIndicator style={{ marginVertical: 20 }} color="#9B30FF" />;
    }
    return null;
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => router.back()}>
        <Ionicons name="arrow-back" size={24} color="#000" />
      </TouchableOpacity>
      <Text style={styles.header}>Your Financial Records</Text>

      <View style={styles.tabContainer}>
        {["income", "expense"].map((tab) => (
          <TouchableOpacity
            key={tab}
            style={[styles.tab, activeTab === tab && styles.activeTab]}
            onPress={() => setActiveTab(tab)}
          >
            <Text
              style={[
                styles.tabText,
                activeTab === tab && styles.activeTabText,
              ]}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      
      <View style={{ flexDirection: "row", gap: 10, marginBottom: 10 }}>
        <TouchableOpacity
          onPress={() => setShowStartPicker(true)}
          style={styles.dateButton}
        >
          <Text style={styles.dateButtonText}>
            {startDate ? `${startDate.toLocaleDateString("id-ID")}` : "Pilih Tanggal Awal"}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setShowEndPicker(true)}
          style={styles.dateButton}
        >
          <Text style={styles.dateButtonText}>
            {endDate ? `${endDate.toLocaleDateString("id-ID")}` : "Pilih Tanggal Akhir"}
          </Text>
        </TouchableOpacity>
      </View>

      {showStartPicker && (
        <DateTimePicker
          value={startDate || new Date()}
          mode="date"
          display={Platform.OS === "ios" ? "spinner" : "default"}
          onChange={(event, selectedDate) => {
            setShowStartPicker(false);
            if (selectedDate) setStartDate(selectedDate);
          }}
        />
      )}
      {showEndPicker && (
        <DateTimePicker
          value={endDate || new Date()}
          mode="date"
          display={Platform.OS === "ios" ? "spinner" : "default"}
          onChange={(event, selectedDate) => {
            setShowEndPicker(false);
            if (selectedDate) setEndDate(selectedDate);
          }}
        />
      )}

      <FlatList
        data={filteredData}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        contentContainerStyle={{ paddingBottom: 20 }}
        showsVerticalScrollIndicator={false}
        onEndReached={handleLoadMore}
        onEndReachedThreshold={0.5}
        ListFooterComponent={ListFooterComponent}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    backgroundColor: "#fff",
    padding: 24,
  },
  header: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },
  tabContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 20,
    gap: 10,
  },
  tab: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    backgroundColor: "#eee",
    borderRadius: 20,
  },
  activeTab: {
    backgroundColor: "#9B30FF",
    borderWidth: 1,
    borderColor: "#000",
  },
  tabText: { color: "#333", fontWeight: "600" },
  activeTabText: { color: "white" },
  card: {
    backgroundColor: "#f5f5f5",
    padding: 14,
    borderRadius: 12,
    marginBottom: 12,
  },
  date: { color: "#9B30FF", fontWeight: "600", marginBottom: 4 },
  transactionRow: { flexDirection: "row", alignItems: "center" },
  icon: { width: 18, height: 18, marginRight: 10, tintColor: "#9B30FF" },
  transactionDetails: { flex: 1 },
  type: { fontWeight: "bold", fontSize: 14 },
  code: { color: "#333" },
  amount: { color: "#9B30FF", fontWeight: "bold" },
  loadingContainer: { flex: 1, justifyContent: "center", alignItems: "center" },
  dateButton: {
    padding: 10,
    borderRadius: 8,
    backgroundColor: "#eee",
    flex: 1,
  },
  dateButtonText: {
    textAlign: "center",
    fontWeight: "500",
  },
});

export default TransactionsScreen;