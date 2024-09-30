import CircularProgress from "@/components/clock_v2/CircularProgress";
import { View, Text } from "react-native";

export default function Index() {

  return (
    <View className=" bg-[#242936] flex-1 justify-start items-center">
      {/* <Text className="text-white">Hi</Text> */}
      <CircularProgress />
    </View>
  );
}
