import { Stack } from "expo-router";
import { TransferProvider } from "@/context/transferContext";

export default function RootLayout() {
  return (
    <TransferProvider>
      <Stack
        screenOptions={{
          headerShown: false,
        }}
      />
    </TransferProvider>
  );
}