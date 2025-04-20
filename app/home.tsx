import { Text, View, Image, TouchableOpacity, Pressable, Dimensions, StyleSheet } from "react-native";
import { useState } from "react";
import { Link, useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';

const { width } = Dimensions.get('window');

export default function Index() {
  const [showBalance, setShowBalance] = useState(true);
  const [showRecord, setShowRecord] = useState(true);
  const router = useRouter();

  return (
    <View style={{ flex: 1, backgroundColor: 'white' }}>

      <View style={styles.headerContainer}>
        <View style={styles.logoContainer}>
          <Image source={require('../assets/images/logo1.png')} style={styles.logoImage} />
          <Image source={require('../assets/images/Wally..png')} style={styles.wallyImage} />
        </View>
        <View style={styles.rightHeaderContainer}>
          <Image source={require('../assets/images/theme.png')} style={styles.themeIcon} />
          <Image source={require('../assets/images/garis.png')} style={styles.separator} />
          <TouchableOpacity onPress={() => router.push('/profile')}>
            <Image source={require('../assets/images/Foto.jpg')} style={styles.profilePic} />
          </TouchableOpacity>
        </View>
      </View>

      <View style={{ paddingHorizontal: 15, marginTop: 15 }}>
        <Text style={{ color: "#3A1D6E", fontWeight: "600", fontSize: 30 }}>Welcome, Sandy!</Text>
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
            <Image source={showBalance ? require('../assets/images/eye1-on.png') : require('../assets/images/eye1-off.png')} style={styles.eyeIcon} />
          </TouchableOpacity>
        </View>
      </LinearGradient>

      <View style={styles.actionButtonContainer}>
        <Pressable onPress={() => router.push('/transfer')} style={({ pressed }) => [styles.actionButton, { borderColor: '#9F2BFB' }, pressed && { backgroundColor: '#f2e8fd' }] }>
          <Image source={require('../assets/images/transfer.png')} style={styles.actionIcon} />
          <Text style={styles.actionText}>Transfer</Text>
        </Pressable>
        <Pressable onPress={() => router.push('/topup')} style={({ pressed }) => [styles.actionButton, { borderColor: '#9F2BFB' }, pressed && { backgroundColor: '#f2e8fd' }] }>
          <Image source={require('../assets/images/topup.png')} style={styles.actionIcon} />
          <Text style={styles.actionText}>Topup</Text>
        </Pressable>
      </View>

      <View style={styles.recordsContainer}>
        <Text style={styles.recordsTitle}>Your Financial Records</Text>
        <View style={styles.recordsHeader}>
          <Text style={styles.recordDate}>1 Apr 2025 - 30 Apr 2025</Text>
          <TouchableOpacity onPress={() => setShowRecord(!showRecord)}>
            <Image source={showRecord ? require('../assets/images/eye2-on.png') : require('../assets/images/eye2-off.png')} style={styles.eyeIconSmall} />
          </TouchableOpacity>
        </View>

        <View style={styles.recordCardsRow}>
          <View style={styles.recordCard}>
            <View style={styles.cardRow}>
              <Image source={require('../assets/images/login.png')} style={styles.cardIcon} />
              <Text style={styles.cardLabel}>Income</Text>
            </View>
            <Text style={styles.cardAmount}>{showRecord ? "Rp500.000" : "******"}</Text>
          </View>
          <View style={styles.recordCard}>
            <View style={styles.cardRow}>
              <Image source={require('../assets/images/logout.png')} style={styles.cardIcon} />
              <Text style={styles.cardLabel}>Expense</Text>
            </View>
            <Text style={styles.cardAmount}>{showRecord ? "Rp300.000" : "******"}</Text>
          </View>
        </View>

        <View style={styles.differenceRow}>
          <View>
            <Text style={styles.differenceLabel}>Difference</Text>
            <Text style={styles.differenceAmount}>{showRecord ? "Rp200.000" : "******"}</Text>
          </View>
          <Pressable onPress={() => router.push('/details')} style={({ pressed }) => [styles.seeDetailsRow, pressed && { opacity: 0.6 }] }>
            <Text style={styles.seeDetailsText}>See Details</Text>
            <Image source={require('../assets/images/back.png')} style={styles.seeDetailsIcon} />
          </Pressable>
        </View>
      </View>
    </View>
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
  profilePic: { width: 40, height: 40, borderRadius: 50 },
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
  recordCardsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  recordCard: {
    height: 120,
    width: (width - 45) / 2,
    backgroundColor: "white",
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "space-around",
    paddingVertical: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1.5 },
    shadowOpacity: 0.4,
    shadowRadius: 1,
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
