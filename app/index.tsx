import { CityItemType } from "@/components/CityItem";
import CityList from "@/components/CityList";
import Clock from "@/components/clock_v2/Clock";
import ClockLegend from "@/components/clock_v2/ClockLegend";
import { cities } from "@/constants/Constants";
import { getTimezoneFromCity, getHourDifferenceFromUser, getCurrentTimeFromCity } from "@/utils/Timezone";
import { getHourFromAngle, getTimeStringFromHour } from "@/utils/Utils";
import React, { useState } from "react";
import { ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Index() {
  const [cityItems, setCityItems] = useState<CityItemType[]>(
    cities.map(city => {
      return {
        ...city,
        currentTime: getCurrentTimeFromCity(city.name),
      } as unknown as CityItemType;
    })
  );

  const handlePointerMove = (angle: number) => {
    const hour = getHourFromAngle(angle);
    const results = cities.map(city => {
      const timezone = getTimezoneFromCity(city.name);
      const hourDiff = getHourDifferenceFromUser(timezone);
      return {
        ...city,
        currentTime: getTimeStringFromHour(hour + hourDiff),
      } as unknown as CityItemType;
    });
    setCityItems(results);
  }
  
  return (
    <ScrollView>
      <SafeAreaView className=" bg-[#242936] flex-1">
        <Clock onPointerMove={handlePointerMove} />
        <ClockLegend />
        <CityList cities={cityItems} />
      </SafeAreaView>
    </ScrollView>
  );
}
