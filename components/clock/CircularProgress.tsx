import { Text, View } from "react-native";
import { AnimatedCircularProgress } from "react-native-circular-progress";
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
import { City } from "@/app";
import { getCurrentTimeInTimezone } from "@/utils/Utils";

interface RegionCircularProps {
  size: number;
  city: City;
  containerHeight: number;
}

export default function CircularProgress({
  size,
  city,
  containerHeight,
}: RegionCircularProps) {
  const progress = 50;
  const strokeWidth = 20;
  const radius = size / 2 - strokeWidth / 2;
  const circumference = 2 * Math.PI * radius;
  const progressOffset = circumference - (progress / 100) * circumference;
  const screenSize = useScreenSize();
  const currentTime = getCurrentTimeInTimezone(city.timezone);
  const [labelWidth, setLabelWidth] = useState(0);

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

        {/* fg circle */}
        <Circle
          id="fg-circle"
          cx={size / 2}
          cy={size / 2}
          r={radius}
          strokeWidth={strokeWidth}
          fill="none"
          stroke="orange"
          strokeDasharray={circumference}
          strokeDashoffset={progressOffset}
          strokeLinecap="butt"
          rotation={-90}
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
              {city.label} - {currentTime}
            </TSpan>
          </TextPath>
        </TextSvg>
      </Svg>
    </View>
  );
}
