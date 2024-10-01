import { cities } from "@/constants/Cities";
import { View } from "react-native";
import CircularProgress from "./CircularProgress";
import NowPointer from "./NowPointer";
import HourIndicator from "./HourIndicator";

export default function Clock() {
  const CONTAINER_HEIGHT = 350;

  return (
    <View
      className="border border-red-500"
      style={{ height: CONTAINER_HEIGHT }}
    >
      <NowPointer Ncircular={cities.length} containerHeight={CONTAINER_HEIGHT} />
      {cities.map((city, i) => (
        <CircularProgress
          key={i}
          nth={i+1}
          containerHeight={CONTAINER_HEIGHT}
          city={city}
        />
      ))}
      <HourIndicator Ncircular={cities.length} containerHeight={CONTAINER_HEIGHT} />
    </View>
  );
}
