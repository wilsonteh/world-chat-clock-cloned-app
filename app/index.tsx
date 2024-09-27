import Clock from "@/components/clock/Clock";
import { Pressable, Text, View, Alert } from "react-native";
import CitiesSelectionModal from "./citiesSelectionModal";
import React, { useEffect, useState } from "react";
import { cities as citiesData, City } from "@/constants/Cities";
import * as Location from "expo-location";
import { useScreenSize } from "@/contexts/ScreenSizeContext";
import { openSettingsApp } from "@/utils/Linking";
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
  const [hasLocationEnabled, setHasLocationEnabled] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState(false);
  const selectedCities = cities.filter((city) => city.checked);
  const { width, height } = useScreenSize();

  useEffect(() => {
    (async() => {
      const enabled = await Location.hasServicesEnabledAsync();
      setHasLocationEnabled(enabled);
    })();

    const interval = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(interval);

  }, []);

  const promptLocationAccess = async () => {
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status === Location.PermissionStatus.DENIED) {
      Alert.alert(
        "Location permission required", 
        "Please enable location permission in setting to use this feature", 
        [
          { text: "Cancel" },
          { text: "Open Setting", onPress: openSettingsApp },
        ], 
      );

    } else if (status === Location.PermissionStatus.GRANTED) {
      try {
        if (hasLocationEnabled && location) {
          console.log("here");
          return;
        };
        setIsLoading(true);
        const position = await Location.getCurrentPositionAsync();
        const [address] = await Location.reverseGeocodeAsync(position.coords);
        setLocation(address);
        
      } catch (error) {
        console.log(error);
        Alert.alert("Error", "Failed to get location"); 

      } finally {
        setIsLoading(false);
      }
    }

  };

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
      </Text>

      <View style={{ width: width * 0.8 }}>
        <View className="w-full flex flex-row justify-between items-center bg-slate-600 rounded-full px-5 py-2">
          <Text className="text-white w-3/5">
            { !isLoading && location && `${location?.city}, ${location?.district}`}
            { !location && !isLoading && "Location not set" }
            { isLoading && "Loading..." }
          </Text>
          <Pressable onPress={promptLocationAccess} className="w-2/5">
            <Text className="text-white underline text-right">
              { !location ? "Set Location" : time.toLocaleTimeString() }
            </Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
}
