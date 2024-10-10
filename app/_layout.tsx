import { ScreenSizeProvider } from "@/contexts/ScreenSizeContext";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { NativeWindStyleSheet } from "nativewind";

NativeWindStyleSheet.setOutput({
  default: "native",
});

export default function RootLayout() {
  return (
    <ScreenSizeProvider>
      <Stack>
        <Stack.Screen name="index" options={{ title: "Home", headerShown: false }} />
      </Stack>
      <StatusBar style="light" />
    </ScreenSizeProvider>
  );
}
