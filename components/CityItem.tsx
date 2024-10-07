import { useScreenSize } from "@/contexts/ScreenSizeContext";
import { View, Text } from "react-native";

export default function CityItem() {
  const { width, height } =  useScreenSize();

  return (
    <View className=" bg-[#31394a] mx-auto mb-2 border border-red-500 rounded-xl py-2 px-3" style={{ width: width * 0.9 }}>
      <View className="flex flex-row justify-between">
        <Text className="text-white font-light">Kuala Lumpur</Text>
        <Text className="text-white font-light">18:00</Text>
      </View>
      <Text className="text-white">Malaysia</Text>
      <View className="flex flex-row justify-between">
        <Text className="text-xs text-[#747e97]">Office Hours: </Text>
        <Text className="text-xs text-[#747e97]">09:00 - 17:00</Text>
      </View>
    </View>
  );
}
 
