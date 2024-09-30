import Clock from "@/components/clock_v2/Clock";
import React from "react";
import { View, Text } from "react-native";

export default function Index() {

  return (
    <View className=" bg-[#242936] flex-1">
      <Clock />
    </View>
  );
}
