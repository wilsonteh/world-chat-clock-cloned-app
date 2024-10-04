import { cities } from "@/constants/Constants";
import { View } from "react-native";
import CircularProgress from "./CircularProgress";
import NowPointer from "./NowPointer";
import HourIndicator from "./HourIndicator";
import CircularOverlap from "./CircularOverlap";
import { useState } from "react";

export default function Clock() {
  const CONTAINER_HEIGHT = 350;
  const [startRotations, setStartRotations] = useState<{
    officeHour: number[];
    stretchHour: number[];
  }>({ officeHour: [], stretchHour: [] });

  const updateStartRotations = (newItem: number, type: "office" | "stretch") => {
    if (type === "office") {
      setStartRotations((prev) => ({
        ...prev,
        officeHour: [...prev.officeHour, newItem],
      }));
    }
    else if (type === "stretch") {
      setStartRotations((prev) => ({
        ...prev,
        stretchHour: [...prev.stretchHour, newItem],
      }));
    }
  };

  return (
    <View
      className="border border-red-500"
      style={{ height: CONTAINER_HEIGHT }}
    >
      <NowPointer
        Ncircular={cities.length}
        containerHeight={CONTAINER_HEIGHT}
      />
      {cities.map((city, i) => (
        <CircularProgress
          key={i}
          nth={i + 1}
          containerHeight={CONTAINER_HEIGHT}
          city={city}
          updateRotations={updateStartRotations}
        />
      ))}
      <CircularOverlap
        Ncircular={cities.length}
        containerHeight={CONTAINER_HEIGHT}
        circularStartRotations={startRotations}
      />
      <HourIndicator
        Ncircular={cities.length}
        containerHeight={CONTAINER_HEIGHT}
      />
    </View>
  );
}
