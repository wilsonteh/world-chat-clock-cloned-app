import { View } from "react-native";
import CityItem, { CityItemType } from "./CityItem";
import AddCityButton from "./AddCityButton";

export default function CityList({ cities }: { cities: CityItemType[] }) {
  return (
    <View className="flex my-6">
      { cities.map((city, i) => (
        <CityItem key={i} city={city} Nth={i+1} />  
      ))}
      <AddCityButton />
    </View>
  );
}
 
