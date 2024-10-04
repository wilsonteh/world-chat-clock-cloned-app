import { CENTER_CIRCLE_SIZE, City, COLOR_SEQUENCE, LARGEST_CIRCLE_SIZE } from "@/constants/Constants";
import { useScreenSize } from "@/contexts/ScreenSizeContext";
import { getCurrentTimeFromCity, getHourDifferenceFromUser, getTimezoneFromCity, isTimeZoneSame } from "@/utils/Timezone";
import { View } from "react-native";
import {
  Circle,
  Svg,
  TextPath,
  TSpan,
  Text as TextSvg,
} from "react-native-svg";
import React, { useEffect, useState } from "react";

export default function CircularProgress({
  nth,
  containerHeight,
  city,
  updateRotations,
}: {
  nth: number;
  containerHeight: number;
  city: City; 
  updateRotations: (newItem: number, type: "office" | "stretch") => void;
}) {
  const SIZE = LARGEST_CIRCLE_SIZE - (50 * (nth-1)); 
  const STROKE_WIDTH = 15;
  const OUTER_STROKE_WIDTH = 0.2;
  const radius = SIZE / 2 - STROKE_WIDTH / 2;
  const circumference = 2 * Math.PI * radius;
  const screenSize = useScreenSize();
  const [labelWidth, setLabelWidth] = useState(0);
  const [currentTime, setCurrentTime] = useState(
    getCurrentTimeFromCity(city.name)
  );
  const circularInfo = computeCircularProgress();
  const isTimezoneSame = isTimeZoneSame(city.name);

  function computeCircularProgress() {
    const totalHours = 24;
    const timezone = getTimezoneFromCity(city.name);
    const hourDifference = getHourDifferenceFromUser(timezone);

    // * OFFICE HOUR //
    const totalOfficeHours = 8;
    const officeHourDashOffset = circumference - (totalOfficeHours / totalHours) * circumference;

    const startingOfficeHour = isTimezoneSame ? 9 : 9 + hourDifference; 
    const officeHourRotation = (startingOfficeHour - 6) * 360 / 24;

    // * STRETCH HOUR //
    const totalStretchHours = 15.5; 
    const stretchHourDashOffset = circumference - (totalStretchHours / totalHours) * circumference;

    const startingStretchHour = isTimezoneSame ? 7.5 : 7.5 + hourDifference;
    const stretchHourRotation = (startingStretchHour - 6) * 360 / 24;
    
    return { 
      officeHours: {
        strokeDashoffset: officeHourDashOffset, 
        rotation: officeHourRotation
      }, 
      stretchHours: {
        strokeDashoffset: stretchHourDashOffset, 
        rotation: stretchHourRotation
      }
    };
  }

  useEffect(() => {
    updateRotations(circularInfo.officeHours.rotation, "office");
    updateRotations(circularInfo.stretchHours.rotation, "stretch");

    const interval = setInterval(() => {
      const time = getCurrentTimeFromCity(city.name);
      setCurrentTime(time);
    }, 1000 * 60); // update time every min

    return () => clearInterval(interval);
  }, []);

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
          strokeDashoffset={circularInfo.stretchHours.strokeDashoffset}
          strokeLinecap="butt"
          rotation={circularInfo.stretchHours.rotation}
          origin={`${SIZE / 2 + OUTER_STROKE_WIDTH}, ${
            SIZE / 2 + OUTER_STROKE_WIDTH
          }`}
        />

        <Circle
          id="circular-office-hours"
          cx={SIZE / 2 + OUTER_STROKE_WIDTH}
          cy={SIZE / 2 + OUTER_STROKE_WIDTH}
          r={radius}
          fill="none"
          strokeWidth={STROKE_WIDTH}
          stroke={COLOR_SEQUENCE[nth - 1]}
          strokeDasharray={circumference}
          strokeDashoffset={circularInfo.officeHours.strokeDashoffset}
          strokeLinecap="butt"
          rotation={circularInfo.officeHours.rotation}
          origin={`${SIZE / 2}, ${SIZE / 2}`}
        />

        <Circle
          id="circular-bg-stroke-outer"
          cx={SIZE / 2 + OUTER_STROKE_WIDTH}
          cy={SIZE / 2 + OUTER_STROKE_WIDTH}
          r={radius + STROKE_WIDTH / 2}
          fill="none"
          strokeWidth={OUTER_STROKE_WIDTH}
          // stroke="#fff"
          stroke="none"
          />

        <Circle
          id="circular-bg-stroke-inner"
          cx={SIZE / 2 + OUTER_STROKE_WIDTH}
          cy={SIZE / 2 + OUTER_STROKE_WIDTH}
          r={radius - STROKE_WIDTH / 2}
          fill="none"
          strokeWidth={OUTER_STROKE_WIDTH}
          // stroke="#fff"
          stroke="none"
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
              <TSpan fontWeight={300}>
                {city.name}, {city.country}
              </TSpan>{" "}
              <TSpan fontWeight={600}>{currentTime}</TSpan>
            </TSpan>
          </TextPath>
        </TextSvg>
      </Svg>
    </View>
  );
}
