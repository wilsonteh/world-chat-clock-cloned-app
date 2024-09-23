import { View, Text, ScrollView } from "react-native";
import CenterCircle from "./CenterCircle";
import CircularProgress from "./CircularProgress";
import { CityCheckbox } from "@/app";
import NowPointer from "./NowPointer";
import CircularOverlap from "./CircularOverlap";

interface ClockProps {
  cities: CityCheckbox[];
}

export default function Clock({ cities }: ClockProps) {
  const containerHeight = 500;

  return (
    <View
      className="border-red-500 border w-full"
      style={{ height: containerHeight }}
    >
      <CenterCircle size={150} containerHeight={containerHeight} />
      <NowPointer />
      {cities.map((city, i) => (
        <CircularProgress
          key={i}
          size={250 + i * 50}
          city={city}
          containerHeight={containerHeight}
        />
      ))}

      <CircularOverlap
        size={250 + cities.length * 50 + 20}
        containerHeight={containerHeight}
      />
    </View>
  );
}
