import { ScreenSizeProvider } from "@/contexts/ScreenSizeContext";
import { Stack } from "expo-router";
import { NativeWindStyleSheet } from "nativewind";

NativeWindStyleSheet.setOutput({
  default: "native",
});

export default function RootLayout() {
  return (
    <ScreenSizeProvider>
      <Stack>
        <Stack.Screen name="index" options={{ title: "Home" }} />
        <Stack.Screen
          name="citiesSelectionModal"
          options={{
            presentation: "modal",
            title: "Select Cities",
          }}
        />
      </Stack>
    </ScreenSizeProvider>
  );
}
