import { View } from "react-native";
import CityItem, { CityItemType } from "./CityItem";
import { City } from "@/constants/Constants";


export default function CityList({ cities }: { cities: CityItemType[] }) {
  return (
    <View className="flex mt-2">
      { cities.map((city, i) => (
        <CityItem key={i} city={city} Nth={i+1} />  
      ))}
    </View>
  );
}
 
