import CheckboxList from "@/components/CheckboxList";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { Button, View } from "react-native";

export interface CityCheckboxItem {
  label: string;
  timezone: string;
  checked: boolean;
}

export default function CitiesSelectionModal() {
  const router = useRouter();
  const [checkboxItems, setCheckboxItems] = useState<CityCheckboxItem[]>([
    { label: "Tokyo", timezone: "GMT+9", checked: false },
    { label: "Beijing", timezone: "GMT+8", checked: false },
    { label: "London", timezone: "GMT+1", checked: false },
    { label: "Istanbul", timezone: "GMT+3", checked: false },
  ]);

  const handleCheckboxItemsChange = (items: CityCheckboxItem[]) => {
    setCheckboxItems(items);
  };

  const handleClose = () => {
    router.back();
    router.replace({
      pathname: "/",
      params: { updatedCities: JSON.stringify(checkboxItems) },
    });
  };

  return (
    <View className="flex-1 flex justify-center items-center mt-4">
      <CheckboxList
        items={checkboxItems}
        onItemsChange={handleCheckboxItemsChange}
      />
      <Button title="Confirm" onPress={handleClose} />
    </View>
  );
}
