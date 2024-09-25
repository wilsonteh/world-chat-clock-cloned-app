import { useScreenSize } from "@/contexts/ScreenSizeContext";
import { View, Text } from "react-native";
import Svg, { Circle } from "react-native-svg";
import { CircularInfo } from "./Clock";

type CircularOverlapInfo = Omit<CircularInfo, "size">;

interface CircularOverlapProps {
  size: number;
  circularInfo: CircularOverlapInfo[];
  containerHeight: number;
}

export default function CircularOverlap({
  size,
  circularInfo,
  containerHeight,
}: CircularOverlapProps) {
  const screenSize = useScreenSize();
  const strokeWidth = 10;
  const radius = size / 2 - strokeWidth / 2;
  const circumference = 2 * Math.PI * radius;

  const hourRotations = circularInfo.map((item) => {
    const { workingHour, extendedHour } = item;
    if (workingHour.rotationEnd < workingHour.rotationStart) {
      workingHour.rotationEnd += 360;
    }

    if (extendedHour.rotationEnd < extendedHour.rotationStart) {
      extendedHour.rotationEnd += 360;
    }

    return {
      workingHour: {
        start: workingHour.rotationStart,
        end: workingHour.rotationEnd,
      },
      extendedHour: {
        start: extendedHour.rotationStart,
        end: extendedHour.rotationEnd,
      },
    };
  });

  // console.log("working hour ========================");
  // hourRotations.map((item) => console.log(item.workingHour));

  // *NOTE - figure when to use Math.max and Math.min (not fixed)
  const hourOverlaps = hourRotations.reduce((acc, item) => {
    return {
      workingHour: {
        start: Math.max(acc.workingHour.start, item.workingHour.start),
        end: Math.min(acc.workingHour.end, item.workingHour.end),
      },
      extendedHour: {
        start: Math.max(acc.extendedHour.start, item.extendedHour.start),
        end: Math.min(acc.extendedHour.end, item.extendedHour.end),
      },
    };
  });

  function getTotalHoursFromTwoAngles(rotStart: number, rotEnd: number) {
    if (rotEnd < rotStart) {
      return (360 - rotStart + rotEnd) / 15;
    }
    return (rotEnd - rotStart) / 15;
  }

  const [hourOverlapResults] = [hourOverlaps].map((item) => {
    const { workingHour, extendedHour } = item;
    return {
      workingHour: {
        start: workingHour.start,
        end: workingHour.end,
        hourProgress:
          getTotalHoursFromTwoAngles(workingHour.start, workingHour.end) / 24,
      },
      extendedHour: {
        start: extendedHour.start,
        end: extendedHour.end,
        hourProgress:
          getTotalHoursFromTwoAngles(extendedHour.start, extendedHour.end) / 24,
      },
    };
  });

  console.log("🚀 ~ hourOverlapResults", hourOverlapResults);

  const workingHourProgressOffset =
    circumference - hourOverlapResults.workingHour.hourProgress * circumference;
  const extendedHourProgressOffset =
    circumference -
    hourOverlapResults.extendedHour.hourProgress * circumference;

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
          id="circle-overlap-extended-hours"
          cx={size / 2}
          cy={size / 2}
          r={radius}
          strokeWidth={strokeWidth}
          fill="none"
          stroke="#fb923c"
          strokeDasharray={circumference}
          strokeDashoffset={extendedHourProgressOffset}
          strokeLinecap="butt"
          rotation={hourOverlapResults.extendedHour.start}
          origin={`${size / 2}, ${size / 2}`}
        />

        <Circle
          id="circle-overlap-working-hours"
          cx={size / 2}
          cy={size / 2}
          r={radius}
          strokeWidth={strokeWidth}
          fill="none"
          stroke="#fff"
          strokeDasharray={circumference}
          strokeDashoffset={workingHourProgressOffset}
          strokeLinecap="butt"
          rotation={hourOverlapResults.workingHour.start}
          origin={`${size / 2}, ${size / 2}`}
        />
      </Svg>
    </View>
  );
}
