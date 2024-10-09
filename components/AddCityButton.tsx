import { useScreenSize } from "@/contexts/ScreenSizeContext";
import { View, Text, Pressable } from "react-native";

export default function AddCityButton() {
  const { width } = useScreenSize();
  return (
    <Pressable
      className="bg-[#31394a] mx-auto rounded-xl py-2 px-3 flex flex-row justify-center items-center"
      style={{ width: width * 0.9, height: 50 }}
    >
      <Text className="text-white">Add City +</Text>
    </Pressable>
  );
}
 
