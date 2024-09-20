import { View, Text } from "react-native";

export default function NowPointer() {
  return (
    <View className="absolute top-0 left-1/2">
      <Text
        className="text-white"
        style={[{ transform: [{ translateX: -10 }] }]}
      >
        now
      </Text>
      <View className="bg-slate-300 w-[3px] h-[160px] z-10"></View>
    </View>
  );
}
