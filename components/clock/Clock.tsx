import { View, Text, ScrollView } from "react-native";
import CenterCircle from "./CenterCircle";
import CircularProgress from "./CircularProgress";
import { CityCheckbox } from "@/app";
import NowPointer from "./NowPointer";
import CircularOverlap from "./CircularOverlap";
import { getTimeFromGMTOffset, getTotalHoursBetweenTimes } from "@/utils/Utils";
import { cities } from "@/constants/Cities";
import React from "react";

export interface CircularInfo {
  size: number;
  workingHour: {
    progressOffset: number;
    rotationStart: number;
    rotationEnd: number;
  };
  extendedHour: {
    progressOffset: number;
    rotationStart: number;
    rotationEnd: number;
  };
}

interface ClockProps {
  cities: CityCheckbox[];
}

export default function Clock({ cities }: ClockProps) {
  const containerHeight = 500;

  const citiesCircularInfo: CircularInfo[] = cities.map((city, i) => {
    const strokeWidth = 20;
    const size = 170 + i * 50;
    const radius = size / 2 - strokeWidth / 2;
    const circumference = 2 * Math.PI * radius;
    const cityCurrentTime = getTimeFromGMTOffset(city.gmtOffset);

    // * WORKING HOUR //
    const workingHoursPassed = getTotalHoursBetweenTimes(
      "9:00am",
      cityCurrentTime
    ); // num of working hours past 9 AM based on current time
    const workHourProgress = 8 / 24; // working hrs progress
    const workHourRotationStart = 270 - workingHoursPassed * 15;
    const workingHourProgressOffset =
      circumference - workHourProgress * circumference;
    // *FIXME - End rotation likely incorrect
    let workHourRotationEnd = workHourRotationStart + workHourProgress * 360;
    workHourRotationEnd > 360 && (workHourRotationEnd -= 360);

    // * EXTENDED HOUR //
    const extendedHoursPassed = getTotalHoursBetweenTimes(
      "7:30am",
      cityCurrentTime
    ); // num of extended hours past 7:30 AM based on current time
    const extendedHourProgress = 15.5 / 24; // extended hrs progress
    const extendedHourRotationStart = 270 - extendedHoursPassed * 15;
    const extendedHourProgressOffset =
      circumference - extendedHourProgress * circumference;
    let extendedHourRotationEnd =
      extendedHourRotationStart + extendedHourProgress * 360;
    extendedHourRotationEnd > 360 && (extendedHourRotationEnd -= 360);

    return {
      size,
      workingHour: {
        progressOffset: workingHourProgressOffset,
        rotationStart: workHourRotationStart,
        rotationEnd: workHourRotationEnd,
      },
      extendedHour: {
        progressOffset: extendedHourProgressOffset,
        rotationStart: extendedHourRotationStart,
        rotationEnd: extendedHourRotationEnd,
      },
    };
  });

  return (
    <View className="w-full mt-4" style={{ height: containerHeight }}>
      <CenterCircle size={100} containerHeight={containerHeight} />
      <NowPointer />
      {cities.map((city, i) => (
        <CircularProgress
          key={i}
          city={city}
          circularInfo={citiesCircularInfo[i]}
          containerHeight={containerHeight}
        />
      ))}

      <CircularOverlap
        size={170 + cities.length * 50}
        circularInfo={citiesCircularInfo.map(({ size, ...rest }) => rest)}
        containerHeight={containerHeight}
      />
    </View>
  );
}
