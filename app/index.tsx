import Clock from "@/components/clock/Clock";
import { ScreenSizeProvider } from "@/contexts/ScreenSizeContext";
import { View } from "react-native";

export default function Index() {
  return (
    <View className=" bg-slate-800 flex-1 justify-start items-center">
      <Clock />
    </View>
  );
}
