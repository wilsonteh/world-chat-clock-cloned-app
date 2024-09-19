import { View, Text, ScrollView } from "react-native";
import CenterCircle from "./CenterCircle";
import CircularProgress from "./CircularProgress";
import { CityCheckbox } from "@/app";

interface ClockProps {
  cities: CityCheckbox[];
}

export default function Clock({ cities }: ClockProps) {
  const containerHeight = 500;

  return (
    <View className="w-full" style={{ height: containerHeight }}>
      <CenterCircle size={150} containerHeight={containerHeight} />
      {cities.map((city, i) => (
        <CircularProgress
          key={i}
          size={250 + i * 50}
          city={city}
          containerHeight={containerHeight}
        />
      ))}
    </View>
  );
}
