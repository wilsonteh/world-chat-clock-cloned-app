import { CityItemType } from "@/components/CityItem";
import CityList from "@/components/CityList";
import Clock from "@/components/clock_v2/Clock";
import { cities } from "@/constants/Constants";
import { getTimezoneFromCity, getHourDifferenceFromUser } from "@/utils/Timezone";
import { getHourFromAngle, getTimeStringFromHour } from "@/utils/Utils";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Index() {

  const [cityItems, setCityItems] = useState<CityItemType[]>([]);

  const displayTimeOnPointerMove = (angle: number) => {
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
    <SafeAreaView className=" bg-[#242936] flex-1">
      <Clock onPointerMove={displayTimeOnPointerMove} />
      <CityList cities={cityItems} />
    </SafeAreaView>
  );
}
