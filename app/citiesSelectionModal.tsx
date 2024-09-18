import CheckboxList from "@/components/CheckboxList";
import { Button, View, Modal } from "react-native";

export interface CityCheckboxItem {
  label: string;
  timezone: string;
  checked: boolean;
}

interface CitiesSelectionModalProps {
  isVisible: boolean;
  checkboxes: CityCheckboxItem[];
  onCheckboxItemsChange: (items: CityCheckboxItem[]) => void;
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
      <View className="flex-1 flex justify-center items-center mt-4">
        <CheckboxList
          items={checkboxes}
          onItemsChange={onCheckboxItemsChange}
        />
        <Button title="Confirm" onPress={() => onModalVisible(false)} />
      </View>
    </Modal>
  );
}
