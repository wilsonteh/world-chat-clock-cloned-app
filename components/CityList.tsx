import { View } from "react-native";
import CityItem, { CityItemType } from "./CityItem";

export default function CityList({ cities }: { cities: CityItemType[] }) {
  return (
    <View className="flex mt-6">
      { cities.map((city, i) => (
        <CityItem key={i} city={city} Nth={i+1} />  
      ))}
    </View>
  );
}
 
