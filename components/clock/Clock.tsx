import { View, Text, ScrollView } from "react-native";
import CenterCircle from "./CenterCircle";
import RegionCircular from "./RegionCircular";
import { City } from "@/app";

interface ClockProps {
  cities: City[];
}

export default function Clock({ cities }: ClockProps) {
  const containerHeight = 500;

  return (
    <View className="w-full" style={{ height: containerHeight }}>
      <CenterCircle size={150} containerHeight={containerHeight} />
      {cities.map((city, i) => (
        <RegionCircular
          key={i}
          size={250 + i * 50}
          strokeWidth={20}
          progress={60}
          city={city}
          containerHeight={containerHeight}
        />
      ))}
    </View>
  );
}
