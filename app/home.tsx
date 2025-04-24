import { Text, View, Image, TouchableOpacity, Pressable, Dimensions, StyleSheet, ScrollView, Animated } from "react-native";
import { useState, useEffect, useRef } from "react";
import { LinearGradient } from 'expo-linear-gradient';
import { useAuth } from "@/context/authContext";
import ProtectedRoute from "@/components/ProtectedRoute";

const { width, height } = Dimensions.get('window');
const basePadding = width * 0.03;
const iconSizeSmall = width * 0.05;
const iconSizeMedium = width * 0.06;
const iconSizeLarge = width * 0.08;
const fontSizeSmall = width * 0.035;
const fontSizeMedium = width * 0.045;
const fontSizeLarge = width * 0.06;
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import Svg, { Circle, G, Text as SvgText } from 'react-native-svg';

const { width } = Dimensions.get('window');

export default function Index() {
  const [showBalance, setShowBalance] = useState(true);
  const [showRecord, setShowRecord] = useState(true);

  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [selectedPeriod, setSelectedPeriod] = useState("thisMonth");
  const [dataUser, setDataUser] = useState("");

  const income = 500000;
  const expense = 300000;
  const radius = 70;
  const strokeWidth = 15;
  const circleCircumference = 2 * Math.PI * radius;
  const progress = (expense / income) * 100;
  const animatedOffset = useRef(new Animated.Value(circleCircumference)).current;
  const AnimatedCircle = Animated.createAnimatedComponent(Circle);

  useEffect(() => {
    const fetchData = async () => {
        const token = localStorage.getItem("token");
        try {
            const response = await fetch('http://localhost:8080/api/users/7994149544', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    "token": "eyJhbGciOiJIUzM4NCJ9.eyJ1c2VySWQiOiI3OTk0MTQ5NTQ0Iiwic3ViIjoic2FuZHlAenp6LmNvbSIsImlhdCI6MTc0NTQ2MDY5NCwiZXhwIjoxNzQ1NDYxMjk0fQ.S_rf0gtmZOsqEGHGPp6TOe7o5QCc_LxLa5uOAtQqh1Lp7xe3GSs2TZ6jTJ6VOUgk"
                },
            });

            const data = await response.json();
            setDataUser(data);
            console.log(data);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    fetchData();
    }, []);

  useEffect(() => {
    const targetOffset = showRecord
      ? circleCircumference * (1 - progress / 100)
      : circleCircumference;
  
    Animated.timing(animatedOffset, {
      toValue: targetOffset,
      duration: 500,
      useNativeDriver: false,
    }).start();
  }, [showRecord]);

  const handleFilter = (period) => {
    setSelectedPeriod(period);

    if (period === "thisMonth") {
      const now = new Date();
      setStartDate(new Date(now.getFullYear(), now.getMonth(), 1));
      setEndDate(new Date(now.getFullYear(), now.getMonth() + 1, 0));
    } else if (period === "lastMonth") {
      const now = new Date();
      setStartDate(new Date(now.getFullYear(), now.getMonth() - 1, 1));
      setEndDate(new Date(now.getFullYear(), now.getMonth(), 0));
    } else if (period === "last3Months") {
      const now = new Date();
      setStartDate(new Date(now.getFullYear(), now.getMonth() - 2, 1));
      setEndDate(new Date(now.getFullYear(), now.getMonth() + 1, 0));
    }
  };

    return (
        <ProtectedRoute>
        <View style={styles.container}>
            <Text style={styles.title}>Home Screen</Text>
            {authToken ? (
                <Text>User dah login, Token: {authToken.substring(0, 10)}...</Text>
            ) : (
                <Text>Belom login</Text>
            )}
            <View style={styles.headerContainer}>
                <View style={styles.logoContainer}>
                    <Image source={require('../assets/images/logo1.png')} style={styles.logoImage} resizeMode="contain" />
                    <Image source={require('../assets/images/Wally..png')} style={styles.wallyImage} resizeMode="contain" />
                </View>
                <View style={styles.rightHeaderContainer}>
                    <Image source={require('../assets/images/theme.png')} style={styles.themeIcon} resizeMode="contain" />
                    <View style={styles.separator} />
                    <TouchableOpacity onPress={logout}>
                        <Image source={require('../assets/images/Foto.jpg')} style={styles.profilePic} resizeMode="cover" />
                    </TouchableOpacity>
                </View>
            </View>
  return (
    <SafeAreaView  style={{ flex: 1, backgroundColor: 'white'}}>
     <ScrollView contentContainerStyle={{ paddingBottom: 30 }}>
      <View style={styles.headerContainer}>
        <View style={styles.logoContainer}>
          <Image source={require('../assets/images/logo1.png')} style={styles.logoImage} />
          <Image source={require('../assets/images/Wally..png')} style={styles.wallyImage} />
        </View>
        <View style={styles.rightHeaderContainer}>
          <Image source={require('../assets/images/theme.png')} style={styles.themeIcon} />
          <Image source={require('../assets/images/garis.png')} style={styles.separator} />
          <TouchableOpacity onPress={() => router.push('/Profile')}>
            <Ionicons name="person-circle" size={50} color="#A020F0" />
          </TouchableOpacity>
        </View>
      </View>

      <View style={{ paddingHorizontal: 15, marginTop: 15 }}>
        <Text style={{ color: "#3A1D6E", fontWeight: "600", fontSize: 25 }}>Welcome, Sandy!</Text>
        <Text style={{ color: "black", fontWeight: "100", fontSize: 15 }}>Your wallet’s all set and secure. Let’s get started.</Text>
      </View>

      <LinearGradient colors={["#9B30FF", "#3A1D6E"]} style={styles.balanceCard}>
        <View style={styles.accountRow}>
          <Text style={styles.whiteText}>Account Number:</Text>
          <Text style={[styles.whiteText, { fontWeight: '500' }]}>111888111888</Text>
        </View>
        <Text style={styles.whiteText}>Total Balance</Text>
        <View style={styles.balanceRow}>
          <Text style={styles.balanceText}>{showBalance ? "Rp 1.000.000,00" : "************"}</Text>
          <TouchableOpacity onPress={() => setShowBalance(!showBalance)}>
            <Ionicons
                name={showBalance ? "eye-off" : "eye"}
                size={25}
                color="white"
                style={{marginTop:8}}
            />
          </TouchableOpacity>
        </View>
      </LinearGradient>

      <View style={styles.actionButtonContainer}>
        <Pressable onPress={() => router.push('/Transfer')} style={({ pressed }) => [styles.actionButton, { borderColor: '#9F2BFB' }, pressed && { backgroundColor: '#f2e8fd' }] }>
          <Image source={require('../assets/images/transfer.png')} style={styles.actionIcon} />
          <Text style={styles.actionText}>Transfer</Text>
        </Pressable>
        <Pressable onPress={() => router.push('/TopUp')} style={({ pressed }) => [styles.actionButton, { borderColor: '#9F2BFB' }, pressed && { backgroundColor: '#f2e8fd' }] }>
          <Image source={require('../assets/images/topup.png')} style={styles.actionIcon} />
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
                selectedPeriod === "thisMonth" && styles.activeFilterButtonText,
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
                selectedPeriod === "lastMonth" && styles.activeFilterButtonText,
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
                selectedPeriod === "last3Months" && styles.activeFilterButtonText,
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
          <Text style={styles.recordDate}>{startDate.toDateString()} - {endDate.toDateString()}</Text>
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
              <Image source={require('../assets/images/login.png')} style={styles.cardIcon} />
              <Text style={styles.cardLabel}>Income</Text>
            </View>
            <Text style={styles.cardAmount}>{showRecord ? `Rp${income.toLocaleString('id-ID')}` : "******"}</Text>
          </View>
          <View style={styles.recordCard}>
            <View style={styles.cardRow}>
              <Image source={require('../assets/images/logout.png')} style={styles.cardIcon} />
              <Text style={styles.cardLabel}>Expense</Text>
            </View>
            <Text style={styles.cardAmount}>{showRecord ? `Rp${expense.toLocaleString('id-ID')}` : "******"}</Text>
          </View>
        </View>

        <View style={styles.differenceRow}>
          <View>
            <Text style={styles.differenceLabel}>Difference</Text>
            <Text style={styles.differenceAmount}>{showRecord ? "Rp200.000" : "******"}</Text>
          </View>
          <Pressable onPress={() => router.push('/transactions')} style={({ pressed }) => [styles.seeDetailsRow, pressed && { opacity: 0.6 }] }>
            <Text style={styles.seeDetailsText}>See Details</Text>
            <Image source={require('../assets/images/back.png')} style={styles.seeDetailsIcon} />
          </Pressable>
        </View>

        <View style={{ alignItems: 'center', justifyContent: 'center', marginTop: 20 }}>
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
          <Text style={{ marginTop: 10, fontWeight: 'bold' }}>April 2025</Text>
        </View>

      </View>
     </ScrollView>
    </SafeAreaView >
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
    paddingVertical: 10
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
    alignContent:"center"
  },
  balanceText: {
    fontWeight: "500",
    fontSize: 30,
    color: "white",
  },
  eyeIcon: { width: 23, height: 20, marginTop:5 },
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
  differenceLabel: { color: "black", fontWeight: "400", fontSize: 15, marginBottom: 5 },
  differenceAmount: { color: "#4FAD43", fontWeight: "400", fontSize: 15 },
  seeDetailsRow: { flexDirection: "row", alignItems: "center" },
  seeDetailsText: { color: "#9F2BFB", fontWeight: "400", fontSize: 15, marginRight: 10 },
  seeDetailsIcon: { width: 16, height: 16 },
});
