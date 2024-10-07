import CityList from "@/components/CityList";
import Clock from "@/components/clock_v2/Clock";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Index() {

  return (
    <SafeAreaView className=" bg-[#242936] flex-1">
      <Clock />
      <CityList />
    </SafeAreaView>
  );
}
