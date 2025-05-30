import {
  Text,
  View,
  Image,
  TouchableOpacity,
  Pressable,
  Dimensions,
  StyleSheet,
  ScrollView,
  Animated,
} from "react-native";
import { useState, useEffect, useRef } from "react";
import { LinearGradient } from "expo-linear-gradient";
import { useAuth } from "@/context/authContext";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import Svg, { Circle, G, Text as SvgText } from "react-native-svg";
import ProtectedRoute from "@/components/ProtectedRoute";

const { width } = Dimensions.get("window");
type UserData = {
  fullname: string;
  accountnum: string;
  balance: number;
};

export default function Index() {
  const [showBalance, setShowBalance] = useState(true);
  const [showRecord, setShowRecord] = useState(true);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [selectedPeriod, setSelectedPeriod] = useState("thisMonth");
  const [selectedPeriodText, setSelectedPeriodText] = useState<string>("");
  const [dataUser, setDataUser] = useState<UserData | null>(null);
  const { authToken } = useAuth();
  const [summary, setSummary] = useState({ totalIncome: 0, totalExpense: 0 });

  const radius = 70;
  const strokeWidth = 15;
  const circleCircumference = 2 * Math.PI * radius;
  const rawProgress = (summary.totalExpense / summary.totalIncome) * 100;
  const progress = isNaN(rawProgress) ? 0 : rawProgress;
  const animatedOffset = useRef(
    new Animated.Value(circleCircumference)
  ).current;
  const AnimatedCircle = Animated.createAnimatedComponent(Circle);

  const API_SUMMARY_THIS_MONTH =
    "https://kelompok5.serverku.org/api/transactions/summary/this_month";
  const API_SUMMARY_LAST_MONTH =
    "https://kelompok5.serverku.org/api/transactions/summary/last_month";
  const API_SUMMARY_LAST_3_MONTHS =
    "https://kelompok5.serverku.org/api/transactions/summary/three_month_ago";

  const fetchSummaryThisMonth = async () => {
    try {
      const response = await fetch(API_SUMMARY_THIS_MONTH, {
        method: "GET",
        headers: {
          Authorization: "Bearer " + authToken,
        },
      });
      const result = await response.json();
      if (result && result.data) {
        setSummary({
          totalIncome: result.data.totalIncome || 0,
          totalExpense: result.data.totalExpense || 0,
        });
        console.log("Summary This Month:", result.data);
      } else {
        console.error("Error fetching this month summary: Invalid response");
      }
    } catch (error) {
      console.error("Error fetching this month summary:", error);
    }
  };

  const fetchSummaryLastMonth = async () => {
    try {
      const response = await fetch(API_SUMMARY_LAST_MONTH, {
        method: "GET",
        headers: {
          Authorization: "Bearer " + authToken,
        },
      });
      const result = await response.json();
      if (result && result.data) {
        setSummary({
          totalIncome: result.data.totalIncome || 0,
          totalExpense: result.data.totalExpense || 0,
        });
        console.log("Summary Last Month:", result.data);
      } else {
        console.error("Error fetching last month summary: Invalid response");
      }
    } catch (error) {
      console.error("Error fetching last month summary:", error);
    }
  };

  const fetchSummaryLast3Months = async () => {
    try {
      const response = await fetch(API_SUMMARY_LAST_3_MONTHS, {
        method: "GET",
        headers: {
          Authorization: "Bearer " + authToken,
        },
      });
      const result = await response.json();
      if (result && result.data) {
        setSummary({
          totalIncome: result.data.totalIncome || 0,
          totalExpense: result.data.totalExpense || 0,
        });
        console.log("Summary Last 3 Months:", result.data);
      } else {
        console.error("Error fetching last 3 months summary: Invalid response");
      }
    } catch (error) {
      console.error("Error fetching last 3 months summary:", error);
    }
  };

  const formatMonthYear = (date: Date) => {
    const monthNames = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    return `${monthNames[date.getMonth()]} ${date.getFullYear()}`;
  };

  const handleFilter = async (period: string) => {
    setSelectedPeriod(period);

    const now = new Date();
    let text = "";

    if (period === "thisMonth") {
      setStartDate(new Date(now.getFullYear(), now.getMonth(), 1));
      setEndDate(new Date(now.getFullYear(), now.getMonth() + 1, 0));
      text = formatMonthYear(now);
      await fetchSummaryThisMonth();
    } else if (period === "lastMonth") {
      const lastMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1);
      setStartDate(lastMonth);
      setEndDate(new Date(now.getFullYear(), now.getMonth(), 0));
      text = formatMonthYear(lastMonth);
      await fetchSummaryLastMonth();
    } else if (period === "last3Months") {
      const threeMonthsAgo = new Date(now.getFullYear(), now.getMonth() - 2, 1);
      setStartDate(threeMonthsAgo);
      setEndDate(new Date(now.getFullYear(), now.getMonth() + 1, 0));
      text = formatMonthYear(threeMonthsAgo);
      await fetchSummaryLast3Months();
    }

    setSelectedPeriodText(text);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userResponse = await fetch("https://kelompok5.serverku.org/api/users/me", {
          method: "GET",
          headers: {
            Authorization: "Bearer " + authToken,
          },
        });

        const userResult = await userResponse.json();
        setDataUser(userResult.data);
        console.log("User Data:", userResult.data);

        await handleFilter("thisMonth");
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const targetOffset = showRecord
      ? circleCircumference * (1 - progress / 100)
      : circleCircumference;

    Animated.timing(animatedOffset, {
      toValue: targetOffset,
      duration: 500,
      useNativeDriver: false,
    }).start();
  }, [summary, showRecord]);

  return (
    <ProtectedRoute>
      <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
        <ScrollView contentContainerStyle={{ paddingBottom: 30 }}>
          <View style={styles.headerContainer}>
            <View style={styles.logoContainer}>
              <Image
                source={require("../assets/images/logo1.png")}
                style={styles.logoImage}
              />
              <Image
                source={require("../assets/images/Wally..png")}
                style={styles.wallyImage}
              />
            </View>
            <View style={styles.rightHeaderContainer}>
              <Image
                source={require("../assets/images/theme.png")}
                style={styles.themeIcon}
              />
              <Image
                source={require("../assets/images/garis.png")}
                style={styles.separator}
              />
              <TouchableOpacity onPress={() => router.push("/Profile")}>
                <Ionicons name="person-circle" size={50} color="#A020F0" />
              </TouchableOpacity>
            </View>
          </View>

          <View style={{ paddingHorizontal: 15, marginTop: 15 }}>
            <Text style={{ color: "#3A1D6E", fontWeight: "600", fontSize: 25 }}>
              {" "}
              Assalamualaikum, {dataUser?.fullname?.split(" ")[0] || "User"}!
            </Text>
            <Text style={{ color: "black", fontWeight: "100", fontSize: 15 }}>
              Your wallet’s all set and secure. Bismillah let’s get started.
            </Text>
          </View>

          <LinearGradient
            colors={["#9B30FF", "#3A1D6E"]}
            style={styles.balanceCard}
          >
            <View style={styles.accountRow}>
              <Text style={styles.whiteText}>Account Number:</Text>
              <Text style={[styles.whiteText, { fontWeight: "500" }]}>
                {dataUser?.accountnum || "Loading..."}
              </Text>
            </View>
            <Text style={styles.whiteText}>Total Balance</Text>
            <View style={styles.balanceRow}>
              <Text style={styles.balanceText}>
                {showBalance
                  ? `Rp ${dataUser?.balance?.toLocaleString("id-ID") || "0"}`
                  : "************"}
              </Text>
              <TouchableOpacity onPress={() => setShowBalance(!showBalance)}>
                <Ionicons
                  name={showBalance ? "eye-off" : "eye"}
                  size={25}
                  color="white"
                  style={{ marginTop: 8 }}
                />
              </TouchableOpacity>
            </View>
          </LinearGradient>

          <View style={styles.actionButtonContainer}>
            <Pressable
              onPress={() => router.push("/Transfer")}
              style={({ pressed }) => [
                styles.actionButton,
                { borderColor: "#9F2BFB" },
                pressed && { backgroundColor: "#f2e8fd" },
              ]}
            >
              <Image
                source={require("../assets/images/transfer.png")}
                style={styles.actionIcon}
              />
              <Text style={styles.actionText}>Transfer</Text>
            </Pressable>
            <Pressable
              onPress={() => router.push("/TopUp")}
              style={({ pressed }) => [
                styles.actionButton,
                { borderColor: "#9F2BFB" },
                pressed && { backgroundColor: "#f2e8fd" },
              ]}
            >
              <Image
                source={require("../assets/images/topup.png")}
                style={styles.actionIcon}
              />
              <Text style={styles.actionText}>Topup</Text>
            </Pressable>
          </View>

          <View style={styles.filterContainer}>
            <View style={styles.buttonFilterContainer}>
              <Pressable
                onPress={() => handleFilter("thisMonth")}
                style={[
                  styles.filterButton,
                  selectedPeriod === "thisMonth" && styles.activeFilterButton,
                ]}
              >
                <Text
                  style={[
                    styles.filterButtonText,
                    selectedPeriod === "thisMonth" &&
                      styles.activeFilterButtonText,
                  ]}
                >
                  This Month
                </Text>
              </Pressable>
              <Pressable
                onPress={() => handleFilter("lastMonth")}
                style={[
                  styles.filterButton,
                  selectedPeriod === "lastMonth" && styles.activeFilterButton,
                ]}
              >
                <Text
                  style={[
                    styles.filterButtonText,
                    selectedPeriod === "lastMonth" &&
                      styles.activeFilterButtonText,
                  ]}
                >
                  Last Month
                </Text>
              </Pressable>
              <Pressable
                onPress={() => handleFilter("last3Months")}
                style={[
                  styles.filterButton,
                  selectedPeriod === "last3Months" && styles.activeFilterButton,
                ]}
              >
                <Text
                  style={[
                    styles.filterButtonText,
                    selectedPeriod === "last3Months" &&
                      styles.activeFilterButtonText,
                  ]}
                >
                  3 Months
                </Text>
              </Pressable>
            </View>
          </View>

          <View style={styles.recordsContainer}>
            <Text style={styles.recordsTitle}>Your Financial Records</Text>
            <View style={styles.recordsHeader}>
              <Text style={styles.recordDate}>
                {startDate.toDateString()} - {endDate.toDateString()}
              </Text>
              <TouchableOpacity onPress={() => setShowRecord(!showRecord)}>
                <Ionicons
                  name={showRecord ? "eye-off" : "eye"}
                  size={25}
                  color="#A020F0"
                />
              </TouchableOpacity>
            </View>

            <View style={styles.recordCardsRow}>
              <View style={styles.recordCard}>
                <View style={styles.cardRow}>
                  <Image
                    source={require("../assets/images/login.png")}
                    style={styles.cardIcon}
                  />
                  <Text style={styles.cardLabel}>Income</Text>
                </View>
                <Text style={styles.cardAmount}>
                  {showRecord
                    ? `Rp${summary.totalIncome.toLocaleString("id-ID")}`
                    : "******"}
                </Text>
              </View>
              <View style={styles.recordCard}>
                <View style={styles.cardRow}>
                  <Image
                    source={require("../assets/images/logout.png")}
                    style={styles.cardIcon}
                  />
                  <Text style={styles.cardLabel}>Expense</Text>
                </View>
                <Text style={styles.cardAmount}>
                  {showRecord
                    ? `Rp${summary.totalExpense.toLocaleString("id-ID")}`
                    : "******"}
                </Text>
              </View>
            </View>

            <View style={styles.differenceRow}>
              <View>
                <Text style={styles.differenceLabel}>Difference</Text>
                <Text style={styles.differenceAmount}>
                  {showRecord
                    ? `Rp${(
                        summary.totalIncome - summary.totalExpense
                      ).toLocaleString("id-ID")}`
                    : "******"}
                </Text>
              </View>
              <Pressable
                onPress={() => router.push("/Transactions")}
                style={({ pressed }) => [
                  styles.seeDetailsRow,
                  pressed && { opacity: 0.6 },
                ]}
              >
                <Text style={styles.seeDetailsText}>See Details</Text>
                <Image
                  source={require("../assets/images/back.png")}
                  style={styles.seeDetailsIcon}
                />
              </Pressable>
            </View>
            <View
              style={{
                alignItems: "center",
                justifyContent: "center",
                marginTop: 20,
              }}
            >
              <Text style={{ marginTop: 10, fontWeight: "bold", fontSize: 18 }}>
                {selectedPeriodText}
              </Text>
              <Svg width={180} height={180}>
                <G rotation="-90" origin="90,90">
                  <Circle
                    cx="90"
                    cy="90"
                    r={radius}
                    stroke="#e6e6e6"
                    strokeWidth={strokeWidth}
                    fill="transparent"
                  />
                  <AnimatedCircle
                    cx="90"
                    cy="90"
                    r={radius}
                    stroke={showRecord ? "#6F29D9" : "#e6e6e6"}
                    strokeWidth={strokeWidth}
                    strokeDasharray={`${circleCircumference}, ${circleCircumference}`}
                    strokeDashoffset={animatedOffset}
                    strokeLinecap="round"
                    fill="transparent"
                  />
                </G>
                <SvgText
                  x="90"
                  y="85"
                  textAnchor="middle"
                  fontSize="24"
                  fontWeight="bold"
                  fill="#3A1D6E"
                >
                  {showRecord ? `${progress.toFixed(0)}%` : "*"}
                </SvgText>
                <SvgText
                  x="90"
                  y="110"
                  textAnchor="middle"
                  fontSize="16"
                  fill="#666"
                >
                  Expense
                </SvgText>
              </Svg>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </ProtectedRoute>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderBottomWidth: 1,
    paddingHorizontal: 15,
    borderBottomColor: "grey",
    paddingVertical: 10,
  },
  logoContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: 130,
    alignItems: "center",
  },
  rightHeaderContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: 120,
    alignItems: "center",
  },
  logoImage: { width: 45, height: 45 },
  wallyImage: { width: 70, height: 25, marginTop: 6 },
  themeIcon: { width: 30, height: 30 },
  separator: { width: 1.3, height: 50 },
  balanceCard: {
    borderRadius: 15,
    paddingHorizontal: 20,
    paddingVertical: 25,
    marginHorizontal: 15,
    marginTop: 20,
    justifyContent: "center",
  },
  accountRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: 240,
  },
  whiteText: { fontSize: 17, color: "white" },
  balanceRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: 250,
    alignItems: "center",
    alignContent: "center",
  },
  balanceText: {
    fontWeight: "500",
    fontSize: 30,
    color: "white",
  },
  eyeIcon: { width: 23, height: 20, marginTop: 5 },
  actionButtonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 15,
    marginTop: 35,
  },
  actionButton: {
    flexDirection: "row",
    height: 50,
    width: (width - 45) / 2,
    backgroundColor: "white",
    borderRadius: 15,
    borderWidth: 2,
    alignItems: "center",
    justifyContent: "center",
  },
  actionIcon: { width: 25, height: 25, marginRight: 10 },
  actionText: { color: "#9F2BFB", fontWeight: "700", fontSize: 18 },
  filterContainer: {
    marginHorizontal: 15,
    marginTop: 20,
    padding: 10,
    backgroundColor: "#f9f9f9",
    borderRadius: 10,
  },
  datePickerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  filterLabel: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#333",
  },
  buttonFilterContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
  filterButton: {
    flex: 1,
    marginHorizontal: 5,
    backgroundColor: "#e6e6e6",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
  },
  activeFilterButton: {
    backgroundColor: "#9F2BFB",
  },
  filterButtonText: {
    color: "#333",
    fontWeight: "bold",
  },
  activeFilterButtonText: {
    color: "white",
  },
  recordsContainer: {
    marginHorizontal: 15,
    marginTop: 30,
  },
  recordsTitle: {
    color: "black",
    fontWeight: "bold",
    fontSize: 20,
    marginBottom: 10,
  },
  recordsHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  recordDate: { color: "black", fontSize: 11 },
  eyeIconSmall: { width: 23, height: 20 },
  recordCardsRow: { flexDirection: "row", justifyContent: "space-between" },
  recordCard: {
    height: 120,
    width: (width - 45) / 2,
    backgroundColor: "white",
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "space-around",
    paddingVertical: 20,
    boxShadow: "0px 1.5px 3px rgba(0, 0, 0, 0.4)", // Ganti shadow* dengan boxShadow
  },
  cardRow: { flexDirection: "row", alignItems: "center" },
  cardIcon: { width: 20, height: 20, marginRight: 10 },
  cardLabel: { color: "black", fontWeight: "400", fontSize: 15 },
  cardAmount: { color: "black", fontWeight: "400", fontSize: 18 },
  differenceRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 15,
  },
  differenceLabel: {
    color: "black",
    fontWeight: "400",
    fontSize: 15,
    marginBottom: 5,
  },
  differenceAmount: { color: "#4FAD43", fontWeight: "400", fontSize: 15 },
  seeDetailsRow: { flexDirection: "row", alignItems: "center" },
  seeDetailsText: {
    color: "#9F2BFB",
    fontWeight: "400",
    fontSize: 15,
    marginRight: 10,
  },
  seeDetailsIcon: { width: 16, height: 16 },
});
