import Clock from "@/components/clock/Clock";
import { useLocalSearchParams } from "expo-router";
import { Pressable, View, Text } from "react-native";
import CitiesSelectionModal, { CityCheckboxItem } from "./citiesSelectionModal";
import React, { useState } from "react";

export default function Index() {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const { updatedCities } = useLocalSearchParams<{ updatedCities?: string }>();
  const parsedCities = updatedCities ? JSON.parse(updatedCities) : [];
  const [checkboxItems, setCheckboxItems] = useState<CityCheckboxItem[]>([
    { label: "Tokyo", timezone: "GMT+9", checked: false },
    { label: "Beijing", timezone: "GMT+8", checked: false },
    { label: "London", timezone: "GMT+1", checked: false },
    { label: "Istanbul", timezone: "GMT+3", checked: false },
  ]);
  const selectedCities = checkboxItems.filter((city) => city.checked);

  return (
    <View className=" bg-slate-800 flex-1 justify-start items-center">
      <Pressable
        className=" bg-orange-400 px-4 py-2 rounded-full"
        onPress={() => setIsModalVisible(true)}
      >
        <Text className="text-black font-semibold">Select Cities</Text>
      </Pressable>

      <Clock cities={selectedCities} />

      <CitiesSelectionModal
        isVisible={isModalVisible}
        checkboxes={checkboxItems}
        onCheckboxItemsChange={setCheckboxItems}
        onModalVisible={setIsModalVisible}
      />
    </View>
  );
}
