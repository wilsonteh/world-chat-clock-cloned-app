import { cities } from "@/constants/Constants";
import { GestureResponderEvent, View } from "react-native";
import CircularProgress from "./CircularProgress";
import NowPointer from "./NowPointer";
import HourIndicator from "./HourIndicator";
import CircularOverlap from "./CircularOverlap";
import { useState } from "react";
import { getCurrentTimeFromCity, getHourDifferenceFromUser, getTimezoneFromCity } from "@/utils/Timezone";
import { getHourFromAngle } from "@/utils/Utils";

  
export default function Clock({ 
  onPointerMove 
} : { 
  onPointerMove: (angle: number) => void; 
}) {
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
    <View style={{ height: CONTAINER_HEIGHT }}>
      <NowPointer
        Ncircular={cities.length}
        containerHeight={CONTAINER_HEIGHT}
        onPointerMove={onPointerMove}
      />
      {cities.map((city, i) => (
        <CircularProgress
          key={i}
          nth={i + 1}
          containerHeight={CONTAINER_HEIGHT}
          city={city}
          onUpdateRotations={updateStartRotations}
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
