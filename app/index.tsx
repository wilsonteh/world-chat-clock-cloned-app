import Clock from "@/components/clock/Clock";
import { Link, useLocalSearchParams } from "expo-router";
import { View } from "react-native";

export default function Index() {
  const { updatedCities } = useLocalSearchParams<{ updatedCities: string }>();
  const selectedCities = JSON.parse(updatedCities).filter(
    (city: any) => city.checked
  );

  return (
    <View className=" bg-slate-800 flex-1 justify-start items-center">
      <Link
        href="./citiesSelectionModal"
        className="text-black bg-orange-400 px-4 py-2 rounded-full"
      >
        Select cities
      </Link>
      <Clock cities={selectedCities} />
    </View>
  );
}
