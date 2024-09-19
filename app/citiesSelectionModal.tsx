import CheckboxList from "@/components/CheckboxList";
import { Button, View, Modal, ScrollView, Pressable, Text } from "react-native";
import { CityCheckbox } from ".";

interface CitiesSelectionModalProps {
  isVisible: boolean;
  checkboxes: CityCheckbox[];
  onCheckboxItemsChange: (items: CityCheckbox[]) => void;
  onModalVisible: (visible: boolean) => void;
}

export default function CitiesSelectionModal({
  isVisible,
  checkboxes,
  onCheckboxItemsChange,
  onModalVisible,
}: CitiesSelectionModalProps) {
  return (
    <Modal visible={isVisible} animationType="slide">
      <View className="flex-1 items-center justify-center">
        <CheckboxList
          items={checkboxes}
          onItemsChange={onCheckboxItemsChange}
        />
        <Pressable
          className="bg-orange-400 px-4 py-2 rounded-lg"
          onPress={() => onModalVisible(false)}
        >
          <Text className="text-center font-semibold">Confirm</Text>
        </Pressable>
      </View>
    </Modal>
  );
}
