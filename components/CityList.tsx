import { View } from "react-native";
import CityItem from "./CityItem";

export default function CityList() {
  return (
    <View className="flex mt-2">
      <CityItem />  
      <CityItem />  
      <CityItem />  
    </View>
  );
}
 
