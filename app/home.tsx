import { Text, View, Image, TouchableOpacity, Pressable, Dimensions, StyleSheet } from "react-native";
import { useState } from "react";
import { router } from "expo-router";
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

export default function Index() {
    const { authToken,logout } = useAuth();
    const [showBalance, setShowBalance] = useState(true);
    const [showRecord, setShowRecord] = useState(true);
    

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

            <View style={{ paddingHorizontal: basePadding, marginTop: basePadding * 2 }}>
                <Text style={{ color: "#3A1D6E", fontWeight: "600", fontSize: fontSizeLarge * 1.2 }}>Welcome, Sandy!</Text>
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
                        <Image source={showBalance ? require('../assets/images/eye1-on.png') : require('../assets/images/eye1-off.png')} style={styles.eyeIcon} resizeMode="contain" />
                    </TouchableOpacity>
                </View>
            </LinearGradient>

            <View style={styles.actionButtonContainer}>
                <Pressable onPress={() => router.push('/Transfer')} style={({ pressed }) => [styles.actionButton, { borderColor: '#9F2BFB' }, pressed && { backgroundColor: '#f2e8fd' }] }>
                    <Image source={require('../assets/images/transfer.png')} style={styles.actionIcon} resizeMode="contain" />
                    <Text style={styles.actionText}>Transfer</Text>
                </Pressable>
                <Pressable onPress={() => router.push('/TopUp')} style={({ pressed }) => [styles.actionButton, { borderColor: '#9F2BFB' }, pressed && { backgroundColor: '#f2e8fd' }] }>
                    <Image source={require('../assets/images/topup.png')} style={styles.actionIcon} resizeMode="contain" />
                    <Text style={styles.actionText}>Topup</Text>
                </Pressable>
            </View>

            <View style={styles.recordsContainer}>
                <Text style={styles.recordsTitle}>Your Financial Records</Text>
                <View style={styles.recordsHeader}>
                    <Text style={styles.recordDate}>1 Apr 2025 - 30 Apr 2025</Text>
                    <TouchableOpacity onPress={() => setShowRecord(!showRecord)}>
                        <Image source={showRecord ? require('../assets/images/eye2-on.png') : require('../assets/images/eye2-off.png')} style={styles.eyeIconSmall} resizeMode="contain" />
                    </TouchableOpacity>
                </View>

                <View style={styles.recordCardsRow}>
                    <View style={styles.recordCard}>
                        <View style={styles.cardRow}>
                            <Image source={require('../assets/images/login.png')} style={styles.cardIcon} resizeMode="contain" />
                            <Text style={styles.cardLabel}>Income</Text>
                        </View>
                        <Text style={styles.cardAmount}>{showRecord ? "Rp500.000" : "******"}</Text>
                    </View>
                    <View style={styles.recordCard}>
                        <View style={styles.cardRow}>
                            <Image source={require('../assets/images/logout.png')} style={styles.cardIcon} resizeMode="contain" />
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
                    <Pressable onPress={() => router.push('/')} style={({ pressed }) => [styles.seeDetailsRow, pressed && { opacity: 0.6 }] }>
                        <Text style={styles.seeDetailsText}>See Details</Text>
                        <Image source={require('../assets/images/back.png')} style={styles.seeDetailsIcon} resizeMode="contain" />
                    </Pressable>
                </View>
            </View>
        </View>
        </ProtectedRoute>
    );
}



const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    headerContainer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        borderBottomWidth: StyleSheet.hairlineWidth, // Gunakan hairlineWidth
        paddingHorizontal: basePadding,
        borderBottomColor: "grey",
        paddingVertical: basePadding * 0.66,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    logoContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        width: width * 0.35, // Lebar logo responsif
        alignItems: "center",
    },
    rightHeaderContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        width: width * 0.3, // Lebar ikon kanan responsif
        alignItems: "center",
    },
    logoImage: { width: iconSizeLarge, height: iconSizeLarge },
    wallyImage: { width: width * 0.18, height: width * 0.06, marginTop: basePadding * 0.1 },
    themeIcon: { width: iconSizeMedium, height: iconSizeMedium },
    separator: { width: StyleSheet.hairlineWidth, height: iconSizeLarge * 0.8 },
    profilePic: { width: iconSizeMedium * 1.2, height: iconSizeMedium * 1.2, borderRadius: iconSizeMedium * 0.6 },
    balanceCard: {
        borderRadius: 15,
        paddingHorizontal: basePadding * 1.33,
        paddingVertical: basePadding * 1.66,
        marginHorizontal: basePadding,
        marginTop: basePadding * 2,
        justifyContent: "center",
    },
    accountRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        width: width * 0.65,
    },
    whiteText: { fontSize: fontSizeMedium, color: "white" },
    balanceRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        width: width * 0.7,
        alignItems: "center",
        alignContent:"center"
    },
    balanceText: {
        fontWeight: "500",
        fontSize: fontSizeLarge,
        color: "white",
    },
    eyeIcon: { width: iconSizeSmall * 1.3, height: iconSizeSmall * 1.1, marginTop: basePadding * 0.3 },
    actionButtonContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginHorizontal: basePadding,
        marginTop: basePadding * 2.33,
    },
    actionButton: {
        flexDirection: "row",
        height: width * 0.13,
        width: (width - basePadding * 4) / 2, // Sesuaikan lebar tombol
        backgroundColor: "white",
        borderRadius: 15,
        borderWidth: 2,
        alignItems: "center",
        justifyContent: "center",
    },
    actionIcon: { width: iconSizeMedium, height: iconSizeMedium, marginRight: basePadding * 0.66 },
    actionText: { color: "#9F2BFB", fontWeight: "700", fontSize: fontSizeMedium * 1.1 },
    recordsContainer: {
        marginHorizontal: basePadding,
        marginTop: basePadding * 2,
    },
    recordsTitle: {
        color: "black",
        fontWeight: "bold",
        fontSize: fontSizeLarge * 0.9,
        marginBottom: basePadding * 0.66,
    },
    recordsHeader: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: basePadding * 0.66,
    },
    recordDate: { color: "black", fontSize: fontSizeSmall },
    eyeIconSmall: { width: iconSizeSmall * 1.3, height: iconSizeSmall * 1.1 },
    recordCardsRow: {
        flexDirection: "row",
        justifyContent: "space-between",
    },
    recordCard: {
        height: width * 0.3,
        width: (width - basePadding * 4) / 2,
        backgroundColor: "white",
        borderRadius: 10,
        alignItems: "center",
        justifyContent: "space-around",
        paddingVertical: basePadding * 1.33,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 1.5 },
        shadowOpacity: 0.4,
        shadowRadius: 1,
    },
    cardRow: { flexDirection: "row", alignItems: "center" },
    cardIcon: { width: iconSizeSmall * 1.2, height: iconSizeSmall * 1.2, marginRight: basePadding * 0.66 },
    cardLabel: { color: "black", fontWeight: "400", fontSize: fontSizeMedium * 0.9 },
    cardAmount: { color: "black", fontWeight: "400", fontSize: fontSizeMedium },
    differenceRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: basePadding,
    },
    differenceLabel: { color: "black", fontWeight: "400", fontSize: fontSizeMedium * 0.9, marginBottom: basePadding * 0.3 },
    differenceAmount: { color: "#4FAD43", fontWeight: "400", fontSize: fontSizeMedium * 0.9 },
    seeDetailsRow: { flexDirection: "row", alignItems: "center" },
    seeDetailsText: { color: "#9F2BFB", fontWeight: "400", fontSize: fontSizeMedium * 0.9, marginRight: basePadding * 0.66 },
    seeDetailsIcon: { width: iconSizeSmall, height: iconSizeSmall },
});