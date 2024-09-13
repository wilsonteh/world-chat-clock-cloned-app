import { CityCheckboxItem } from "@/app/citiesSelectionModal";
import Checkbox from "expo-checkbox";
import { Text, View } from "react-native";

interface CheckboxListProps {
  items: CityCheckboxItem[];
  onItemsChange: (items: CityCheckboxItem[]) => void;
}

export default function CheckboxList({
  items,
  onItemsChange,
}: CheckboxListProps) {
  const handleCheckboxChange = (index: number, checked: boolean) => {
    const newItems = items.map((item, i) =>
      i === index ? { ...item, checked } : item
    );
    onItemsChange(newItems);
  };

  return (
    <View className="flex-1 w-full">
      <View className="flex items-center">
        {items.map((item, i) => (
          <View
            key={item.label}
            className="w-full flex flex-row justify-start items-center"
          >
            <Checkbox
              className="mr-2"
              value={item.checked}
              onValueChange={(checked) => handleCheckboxChange(i, checked)}
            />
            <Text>
              <Text className="text-xl">{item.label} </Text>
              <Text className="text-xs">{item.timezone}</Text>
            </Text>
          </View>
        ))}
      </View>
    </View>
  );
}
