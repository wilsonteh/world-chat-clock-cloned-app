import { View, Text, ScrollView } from "react-native";
import CenterCircle from "./CenterCircle";
import RegionCircular from "./RegionCircular";
import { CityCheckboxItem } from "@/app/citiesSelectionModal";

interface ClockProps {
  cities: CityCheckboxItem[];
}

export default function Clock({ cities }: ClockProps) {
  const containerHeight = 500;
  const halfHeight = containerHeight / 2;

  return (
    <View
      className="border-2 border-red-500 w-full relative"
      style={{ height: containerHeight }}
    >
      <CenterCircle size={150} containerHeight={containerHeight} />
      {cities.map((city, i) => (
        <RegionCircular
          key={i}
          size={250 + i * 50}
          strokeWidth={20}
          progress={60}
          region={city.label}
          containerHeight={containerHeight}
        />
      ))}
      {/* <View className="bg-red-500 -z-10" style={{ height: halfHeight }}></View> */}
    </View>
  );
}
