import { Text, View } from "react-native";
import { AnimatedCircularProgress } from "react-native-circular-progress";
import React, { useState } from "react";
import { useScreenSize } from "@/contexts/ScreenSizeContext";
import {
  Circle,
  Svg,
  TextPath,
  Text as TextSvg,
  TSpan,
} from "react-native-svg";
import { City } from "@/app";
import { getCurrentTimeInTimezone } from "@/utils/Utils";

interface RegionCircularProps {
  size: number;
  strokeWidth: number;
  progress: number;
  city: City;
  containerHeight: number;
}

export default function RegionCircular({
  size,
  strokeWidth,
  progress,
  city,
  containerHeight,
}: RegionCircularProps) {
  const radius = size / 2 - strokeWidth / 2;
  const circumference = 2 * Math.PI * radius;
  const screenSize = useScreenSize();
  const [labelWidth, setLabelWidth] = useState(0);

  return (
    <View
      className="absolute top-0"
      style={[
        { top: containerHeight / 2 - size / 2 },
        { left: screenSize.width / 2 - size / 2 },
      ]}
    >
      <AnimatedCircularProgress
        size={size}
        width={strokeWidth}
        fill={progress}
        tintColor="orange"
        backgroundColor="#3d5875"
        rotation={0}
        lineCap="butt"
        renderCap={({ center }) => (
          // {x, y} = {75, 140}
          <View>
            {/* <Svg
              height={size}
              width={size}
              style={{ position: "absolute", top: 0, left: 0 }}
            >
              <Circle
                cx={size / 2}
                cy={size / 2}
                r={radius}
                fill="none"
                stroke="none"
                id="circlePath"
              />
              <TextSvg fill="white" fontSize="16" fontWeight="light">
                <TextPath
                  href="#circlePath"
                  startOffset="72%"
                  textAnchor="middle"
                >
                  {city.label}
                </TextPath>
              </TextSvg>
            </Svg> */}
          </View>
        )}
      >
        {(fill) => <Text className="text-orange-300 absolute">{fill}%</Text>}
      </AnimatedCircularProgress>
      <View
        className="absolute top-0 left-1/2 "
        onLayout={(e) => setLabelWidth(e.nativeEvent.layout.width)}
        style={{ transform: [{ translateX: -(labelWidth / 2) }] }}
      >
        <Text className="text-white font-semibold">
          {city.label} - {getCurrentTimeInTimezone(city.timezone)}
        </Text>
      </View>
    </View>
  );
}
