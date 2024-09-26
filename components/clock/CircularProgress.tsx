import { Text, View } from "react-native";
import React, { useState } from "react";
import { useScreenSize } from "@/contexts/ScreenSizeContext";
import {
  Circle,
  Defs,
  G,
  Path,
  Svg,
  TextPath,
  Text as TextSvg,
  TSpan,
} from "react-native-svg";
import { CityCheckbox } from "@/app";
import {
  getTimeFromGMTOffset,
  getTotalHoursBetweenTimes,
  getUserTimezoneInfo,
} from "@/utils/Utils";
import { CircularInfo } from "./Clock";

interface RegionCircularProps {
  city: CityCheckbox;
  circularInfo: CircularInfo;
  containerHeight: number;
}

export default function CircularProgress({
  city,
  circularInfo,
  containerHeight,
}: RegionCircularProps) {
  const [labelWidth, setLabelWidth] = useState(0);
  const { size, workingHour, extendedHour } = circularInfo;
  const strokeWidth = 20;
  const radius = size / 2 - strokeWidth / 2;
  const circumference = 2 * Math.PI * radius;
  const screenSize = useScreenSize();

  // To get: the user current time in his timezone & selected city current time
  const { userNamedTimezone, userCurrentTime } = getUserTimezoneInfo();
  const cityCurrentTime = getTimeFromGMTOffset(city.gmtOffset);

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
          id="circle-extended-hours"
          cx={size / 2}
          cy={size / 2}
          r={radius}
          strokeWidth={strokeWidth}
          fill="none"
          stroke="#fdba74"
          strokeDasharray={circumference}
          strokeDashoffset={extendedHour.progressOffset}
          strokeLinecap="butt"
          rotation={extendedHour.rotationStart}
          origin={`${size / 2}, ${size / 2}`}
        />

        <Circle
          id="circle-working-hours"
          cx={size / 2}
          cy={size / 2}
          r={radius}
          strokeWidth={strokeWidth}
          fill="none"
          stroke="#fb923c"
          strokeDasharray={circumference}
          strokeDashoffset={workingHour.progressOffset}
          strokeLinecap="butt"
          rotation={workingHour.rotationStart}
          origin={`${size / 2}, ${size / 2}`}
        />

        <TextSvg
          fill="#fff"
          fontSize="14"
          onLayout={(e) => setLabelWidth(e.nativeEvent.layout.width)}
        >
          <TextPath
            href="#bg-circle"
            startOffset={`${75 - (labelWidth / (2 * circumference)) * 100}%`}
          >
            <TSpan dy={5}>
              <TSpan fontWeight={300}>{city.region}, </TSpan>
              <TSpan fontWeight={600}>{city.country}</TSpan> {cityCurrentTime}
            </TSpan>
          </TextPath>
        </TextSvg>
      </Svg>
    </View>
  );
}
