import { City, COLOR_SEQUENCE } from "@/constants/Constants";
import { useScreenSize } from "@/contexts/ScreenSizeContext";
import { View, Text } from "react-native";

export interface CityItemType extends City {
  currentTime: number;
}

export default function CityItem({
  city,
  Nth,
}: {
  city: CityItemType;
  Nth: number;
}) {
  const { width } = useScreenSize();

  return (
    <View
      className=" bg-[#31394a] mx-auto mb-2 border-2 rounded-xl py-2 px-3"
      style={{ width: width * 0.9, borderColor: COLOR_SEQUENCE[Nth-1] }}
    >
      <View className="flex flex-row justify-between">
        <Text className="text-white font-light">{city.name}</Text>
        <Text className="text-white font-light">{city.currentTime}</Text>
      </View>
      <Text className="text-white">{city.country}</Text>
      <View className="flex flex-row justify-between">
        <Text className="text-xs text-[#747e97]">Office hours: </Text>
        <Text className="text-xs text-[#747e97]">09:00 - 17:00</Text>
      </View>
    </View>
  );
}
