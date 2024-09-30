import { City } from "@/constants/Cities";
import { useScreenSize } from "@/contexts/ScreenSizeContext";
import { getCurrentTimeFromCity } from "@/utils/Timezone";
import { View, Text } from "react-native";
import {
  Circle,
  Svg,
  TextPath,
  TSpan,
  Text as TextSvg,
} from "react-native-svg";
import moment from "moment-timezone";
import React, { useEffect, useState } from "react";

export default function CircularProgress({
  nth,
  containerHeight,
  city,
}: {
  nth: number;
  containerHeight: number;
  city: City;
}) {
  const SIZE = 100 + 50 * nth; // hardcoded for now, will be a prop passed from parent
  const STROKE_WIDTH = 15;
  const OUTER_STROKE_WIDTH = 0.5;
  const radius = SIZE / 2 - STROKE_WIDTH / 2;
  const circumference = 2 * Math.PI * radius;
  const screenSize = useScreenSize();
  const [labelWidth, setLabelWidth] = useState(0);
  const [currentTime, setCurrentTime] = useState(getCurrentTimeFromCity(city.name));

  useEffect(() => {
    const interval = setInterval(() => {
      const time = getCurrentTimeFromCity(city.name);
      setCurrentTime(time);
    }, 1000);   // update time every min
    
    return () => clearInterval(interval);
  }, [])

  return (
    <View
      className="absolute"
      style={[
        { top: containerHeight / 2 - SIZE / 2 },
        { left: screenSize.width / 2 - SIZE / 2 },
      ]}
    >
      <Svg
        width={SIZE + OUTER_STROKE_WIDTH * 2}
        height={SIZE + OUTER_STROKE_WIDTH * 2}
      >
        <Circle 
          id="circular-bg"
          cx={SIZE / 2}
          cy={SIZE / 2}
          r={radius}
          fill="none"
        />

        <Circle
          id="circular-stretch-hours"
          cx={SIZE / 2 + OUTER_STROKE_WIDTH}
          cy={SIZE / 2 + OUTER_STROKE_WIDTH}
          r={radius}
          fill="none"
          strokeWidth={STROKE_WIDTH}
          stroke="#4b536a"
          strokeDasharray={circumference}
          strokeDashoffset={circumference * 0.4}
          strokeLinecap="butt"
          rotation={-90}
          origin={`${SIZE / 2 + OUTER_STROKE_WIDTH}, ${SIZE / 2 + OUTER_STROKE_WIDTH}`}
        />

        <Circle
          id="circular-working-hours"
          cx={SIZE / 2 + OUTER_STROKE_WIDTH}
          cy={SIZE / 2 + OUTER_STROKE_WIDTH}
          r={radius}
          fill="none"
          strokeWidth={STROKE_WIDTH}
          stroke="#9979fd"
          strokeDasharray={circumference}
          strokeDashoffset={circumference * 0.7}
          strokeLinecap="butt"
          rotation={-90}
          origin={`${SIZE / 2}, ${SIZE / 2}`}
        />

        <Circle
          id="circular-bg-stroke-outer"
          cx={SIZE / 2 + OUTER_STROKE_WIDTH}
          cy={SIZE / 2 + OUTER_STROKE_WIDTH}
          r={radius + STROKE_WIDTH / 2}
          fill="none"
          strokeWidth={OUTER_STROKE_WIDTH}
          stroke="#fff"
        />

        <Circle
          id="circular-bg-stroke-inner"
          cx={SIZE / 2 + OUTER_STROKE_WIDTH}
          cy={SIZE / 2 + OUTER_STROKE_WIDTH}
          r={radius - STROKE_WIDTH / 2}
          fill="none"
          strokeWidth={OUTER_STROKE_WIDTH}
          stroke="#fff"
        />

        <TextSvg
          fill="#fff"
          fontSize="14"
          onLayout={(e) => setLabelWidth(e.nativeEvent.layout.width)}
        >
          <TextPath
            href="#circular-bg"
            startOffset={`${75 - (labelWidth / (2 * circumference)) * 100}%`}
          >
            <TSpan dy={5}>
              <TSpan fontWeight={300}>{city.name}, {city.country}</TSpan>{" "}
              <TSpan fontWeight={600}>{currentTime}</TSpan> 
            </TSpan>
          </TextPath>
        </TextSvg>
      </Svg>
    </View>
  );
}
