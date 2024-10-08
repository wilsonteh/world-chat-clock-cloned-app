import { useScreenSize } from "@/contexts/ScreenSizeContext";
import { View, Text } from "react-native";

export default function ClockLegend() {
  const { height, width } = useScreenSize();
  const legendItems = [
    { label: "Stretch Hours (07:30-09:00, 17:00-23:00)", color: "#4b536a" },
    { label: "Overlapping Office Hours", color: "#99ccfd" },
    { label: "Overlapping Hours", color: "#4e8dfa" },
  ]

  return (
    <View className="bg-[#31394a] mx-auto rounded-md px-4 py-2 mt-2" style={{ width: width * .9 }}>
      { legendItems.map((item, i) => (
        <View key={i} className="flex flex-row items-center mt-1">
          <View className="w-[20px] h-[10px] rounded-full mr-2" style={{ backgroundColor: item.color }} />
          <Text className="text-white text-xs">{item.label}</Text>
        </View>
      ))}
      
    </View>
  );
}
 
