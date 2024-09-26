import Clock from "@/components/clock/Clock";
import { Pressable, View, Text } from "react-native";
import CitiesSelectionModal from "./citiesSelectionModal";
import React, { useEffect, useState } from "react";
import { cities as citiesData, City } from "@/constants/Cities";
import * as Location from "expo-location";
export interface CityCheckbox extends City {
  checked: boolean;
}

export default function Index() {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [location, setLocation] = useState<Location.LocationGeocodedAddress | null>(null);
  const [cities, setCities] = useState<CityCheckbox[]>(
    citiesData.map((city, i) => ({
      ...city,
      checked: ["Kuala Lumpur", "Dubai"].includes(city.region) ? true : false,
    }))
  );
  const [time, setTime] = useState(new Date());
  const selectedCities = cities.filter((city) => city.checked);

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    (async () => {
      const { canAskAgain, expires, granted, status, android, ios } = await Location.requestForegroundPermissionsAsync();
      console.log("🚀 ~ status:", status)
      if (granted) {
        const position = await Location.getCurrentPositionAsync();
        const [address] = await Location.reverseGeocodeAsync(position.coords)
        setLocation(address);
      }
    })();

  }, []);

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

      <Text className="text-white text-center text-xs">
        <Text>Time: {time.toLocaleTimeString()} {"\n"}</Text>
        { location && <Text>Location: {location.city}, {location.region}, {location.country}</Text>}
      </Text>
    </View>
  );
}
