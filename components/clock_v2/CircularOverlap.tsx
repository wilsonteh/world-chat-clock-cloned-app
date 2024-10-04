import { CENTER_CIRCLE_SIZE } from "@/constants/Constants";
import { useScreenSize } from "@/contexts/ScreenSizeContext";
import { getOverlappedHours, getOverlappingHours } from "@/utils/Utils";
import moment from "moment-timezone";
import { useEffect, useState } from "react";
import { View, Text } from "react-native";
import Svg, { Circle } from "react-native-svg";

interface OverlapHourInfo {
  officeHours: { rotationStart: number; strokeDashoffset: number };
  stretchHours: { rotationStart: number; strokeDashoffset: number };
}

export default function CircularOverlap({
  containerHeight,
  Ncircular,
  circularStartRotations,
}: {
  containerHeight: number;
  Ncircular: number;  
  circularStartRotations: {officeHour: number[]; stretchHour: number[]};
}) {
  const size = CENTER_CIRCLE_SIZE + 50 * Ncircular + 80;
  const strokeWidth = 10;
  const radius = size / 2 - strokeWidth / 2;
  const circumference = 2 * Math.PI * radius;
  const screenSize = useScreenSize();
  const overlapHourInfo = {
    officeHours: computeOverlappedOfficeHours(),
  }
  // console.log("🚀 ~ overlapHourInfo:", overlapHourInfo)

  function returnNoOverlap() {
    console.log("No overlap");
    return {
      rotationStart: 0,
      strokeDashoffset: circumference,
    }
  }

  function computeOverlappedOfficeHours() {
    const { officeHour: startRotations } = circularStartRotations;
    
    // Find the end rotations 
    const totalOfficeHours = 8;
    const endRotations = startRotations.map((rotation) => rotation + totalOfficeHours * 15);

    // Convert start & end rotations to time ranges  
    const timeRanges = startRotations
      .map((start, i) => [start, endRotations[i]])
      .map(([startRot, endRot]) => [startRot / 15 + 6, endRot / 15 + 6]); 

    const overlappedHours = getOverlappingHours(timeRanges);
    if (!overlappedHours) return returnNoOverlap();

    const [overlappedStartHour, overlappedEndHour] = overlappedHours;
    const overlappedStartRot =  overlappedStartHour * 15 - 90;
    const overlappedEndRot = overlappedEndHour * 15 - 90;
    const dashoffset = circumference - ((overlappedEndRot - overlappedStartRot) / 360 * circumference);

    return {
      rotationStart: overlappedStartRot,
      rotationEnd: overlappedEndRot,
      strokeDashoffset: dashoffset,
    }
  }

  return (
    <View
      className="absolute"
      style={[
        { top: containerHeight / 2 - size / 2 },
        { left: screenSize.width / 2 - size / 2 },
      ]}
    >
      <Svg width={size} height={size}>
        <Circle
          id="bg-circle"
          cx={size / 2}
          cy={size / 2}
          r={radius}
          strokeWidth={strokeWidth}
          stroke="#3d5875"
          fill="none"
        />

        <Circle
          id="circular-overlap-office-hours"
          cx={size / 2}
          cy={size / 2}
          r={radius}
          strokeWidth={strokeWidth}
          fill="none"
          stroke="red"
          strokeDasharray={circumference}
          strokeDashoffset={overlapHourInfo.officeHours.strokeDashoffset}
          strokeLinecap="butt"
          rotation={overlapHourInfo.officeHours.rotationStart}
          origin={`${size / 2}, ${size / 2}`}
        />
      </Svg>
    </View>
  );
}
