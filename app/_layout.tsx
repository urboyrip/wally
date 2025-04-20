// _layout.tsx
import { Stack } from "expo-router";
import { TransferProvider } from "@/context/transferContext";
import { TopupProvider } from "@/context/topupContext";

export default function RootLayout() {
  return (
    <TransferProvider>
      <TopupProvider>
        <Stack screenOptions={{ headerShown: false }} />
      </TopupProvider>
    </TransferProvider>
  );
}