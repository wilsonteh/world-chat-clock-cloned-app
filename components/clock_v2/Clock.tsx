import { cities } from "@/constants/Cities";
import { View } from "react-native";
import CircularProgress from "./CircularProgress";

export default function Clock() {
  const CONTAINER_HEIGHT = 300;
  return (
    <View className="border border-red-500" style={{ height: CONTAINER_HEIGHT }} >
      { cities.map((city, i) => (
        <CircularProgress key={i} nth={i} containerHeight={CONTAINER_HEIGHT} city={city} />
      ))}
    </View>
  );
}