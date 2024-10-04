import { CENTER_CIRCLE_SIZE, LARGEST_CIRCLE_SIZE } from "@/constants/Constants";
import { useScreenSize } from "@/contexts/ScreenSizeContext";
import { getOverlappedHours } from "@/utils/Utils";
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
  const size = LARGEST_CIRCLE_SIZE + 70;
  const strokeWidth = 10;
  const radius = size / 2 - strokeWidth / 2;
  const circumference = 2 * Math.PI * radius;
  const screenSize = useScreenSize();
  const overlapHourInfo: OverlapHourInfo = {
    officeHours: computeOverlappedOfficeHours(),
    stretchHours: computeOverlappedStretchHours(),
  }
  // console.log("⚓⚓⚓ overlapHourInfo:", overlapHourInfo)

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

    const overlappedHours = getOverlappedHours(timeRanges);
    if (!overlappedHours) return returnNoOverlap();

    const [overlappedStartHour, overlappedEndHour] = overlappedHours;
    const overlappedStartRot =  overlappedStartHour * 15 - 90;
    const overlappedEndRot = overlappedEndHour * 15 - 90;
    const dashoffset = circumference - ((overlappedEndRot - overlappedStartRot) / 360 * circumference);

    return {
      rotationStart: overlappedStartRot,
      rotationEnd: overlappedEndRot,
      strokeDashoffset: dashoffset,
    } as OverlapHourInfo["officeHours"];
  }

  function computeOverlappedStretchHours() {
    const { stretchHour: startRotations } = circularStartRotations;
    
    // Find the end rotations
    const totalStretchHours = 15.5;
    const endRotations = startRotations.map((rotation) => rotation + totalStretchHours * 15);

    // Convert start & end rotations to time ranges
    const timeRanges = startRotations
      .map((start, i) => [start, endRotations[i]])
      .map(([startRot, endRot]) => [startRot / 15 + 6, endRot / 15 + 6]);

    const overlappedHours = getOverlappedHours(timeRanges);
    if (!overlappedHours) return returnNoOverlap();

    const [overlappedStartHour, overlappedEndHour] = overlappedHours;
    const overlappedStartRot = overlappedStartHour * 15 - 90;
    const overlappedEndRot = overlappedEndHour * 15 - 90;
    const dashoffset = circumference - ((overlappedEndRot - overlappedStartRot) / 360 * circumference);
    // console.log("💵💵", overlappedStartRot, overlappedEndRot, dashoffset)

    return {
      rotationStart: overlappedStartRot,
      rotationEnd: overlappedEndRot,
      strokeDashoffset: dashoffset,
    } as OverlapHourInfo["stretchHours"];
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
          id="circular-overlap-stretch-hours"
          cx={size / 2}
          cy={size / 2}
          r={radius}
          strokeWidth={strokeWidth}
          fill="none"
          stroke="#4e8dfa"
          strokeDasharray={circumference}
          strokeDashoffset={overlapHourInfo.stretchHours.strokeDashoffset}
          strokeLinecap="butt"
          rotation={overlapHourInfo.stretchHours.rotationStart}
          origin={`${size / 2}, ${size / 2}`}
        />

        <Circle
          id="circular-overlap-office-hours"
          cx={size / 2}
          cy={size / 2}
          r={radius}
          strokeWidth={strokeWidth}
          fill="none"
          stroke="#99ccfd"
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
