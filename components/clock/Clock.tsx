import { View, Text, ScrollView } from "react-native";
import CenterCircle from "./CenterCircle";
import RegionCircular from "./RegionCircular";

export default function Clock() {
  const containerHeight = 500;
  const halfHeight = containerHeight / 2;

  return (
    <View
      className="border-2 border-red-500 w-full relative"
      style={{ height: containerHeight }}
    >
      {/* <CenterCircle size={150} containerHeight={containerHeight} /> */}
      <RegionCircular
        size={250}
        strokeWidth={20}
        progress={50}
        region="Tokyo"
        containerHeight={containerHeight}
      />
      <RegionCircular
        size={300}
        strokeWidth={20}
        progress={50}
        region="BeiJing"
        containerHeight={containerHeight}
      />
      <RegionCircular
        size={350}
        strokeWidth={20}
        progress={50}
        region="London"
        containerHeight={containerHeight}
      />
      {/* <View className="bg-red-500 -z-10" style={{ height: halfHeight }}></View> */}
    </View>
  );
}
