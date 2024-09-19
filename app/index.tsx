import Clock from "@/components/clock/Clock";
import { Pressable, View, Text } from "react-native";
import CitiesSelectionModal from "./citiesSelectionModal";
import React, { useState } from "react";
import { cities as citiesData, City } from "@/constants/Cities";

export interface CityCheckbox extends City {
  checked: boolean;
}

export default function Index() {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [cities, setCities] = useState<CityCheckbox[]>(
    citiesData.map((city) => ({ ...city, checked: false }))
  );
  const selectedCities = cities.filter((city) => city.checked);

  return (
    <View className=" bg-slate-800 flex-1 justify-start items-center">
      <Pressable
        className=" bg-orange-400 mt-4 px-4 py-2 rounded-full"
        onPress={() => setIsModalVisible(true)}
      >
        <Text className="text-black font-semibold">Select Cities</Text>
      </Pressable>

      <Clock cities={selectedCities} />

      <CitiesSelectionModal
        isVisible={isModalVisible}
        checkboxes={cities}
        onCheckboxItemsChange={setCities}
        onModalVisible={setIsModalVisible}
      />
    </View>
  );
}
