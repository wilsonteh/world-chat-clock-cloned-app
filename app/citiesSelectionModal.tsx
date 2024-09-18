import CheckboxList from "@/components/CheckboxList";
import { Button, View, Modal } from "react-native";
import { City } from ".";

interface CitiesSelectionModalProps {
  isVisible: boolean;
  checkboxes: City[];
  onCheckboxItemsChange: (items: City[]) => void;
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
      <View className="flex-1 flex justify-center items-center mt-12 mx-auto">
        <CheckboxList
          items={checkboxes}
          onItemsChange={onCheckboxItemsChange}
        />
        <Button title="Confirm" onPress={() => onModalVisible(false)} />
      </View>
    </Modal>
  );
}
