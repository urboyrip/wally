import { Stack } from "expo-router";
import { TransferProvider } from "@/context/transferContext";
import { TopupProvider } from "@/context/topupContext";
import { AuthProvider } from "@/context/authContext";

export default function RootLayout() {
  return (
    <AuthProvider>
      <TransferProvider>
        <TopupProvider>
          <Stack screenOptions={{ headerShown: false }} />
        </TopupProvider>
      </TransferProvider>
    </AuthProvider>
  );
}
