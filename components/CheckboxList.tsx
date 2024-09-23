import { CityCheckbox } from "@/app";
import clsx from "clsx";
import Checkbox from "expo-checkbox";
import React from "react";
import { ScrollView, Text, View } from "react-native";

interface CheckboxListProps {
  items: CityCheckbox[];
  onItemsChange: (items: CityCheckbox[]) => void;
}

export default function CheckboxList({
  items,
  onItemsChange,
}: CheckboxListProps) {
  const handleCheckboxChange = (index: number, checked: boolean) => {
    if (checked) {
      if (items.filter((item) => item.checked).length === 5) {
        console.log("Max 5 regions allowed");
        return;
      }
    }
    const newItems = items.map((item, i) =>
      i === index ? { ...item, checked } : item
    );
    onItemsChange(newItems);
  };

  return (
    <View className="mt-12 h-[500px]">
      <Text className="font-semibold text-base px-4">
        Select up to max 5 regions
      </Text>
      <ScrollView
        contentContainerStyle={{
          alignItems: "flex-start",
          justifyContent: "center",
        }}
        className="px-4 gap-y-4 mt-2 mb-4 border border-slate-300 rounded-lg"
      >
        {items.map((item, i) => (
          <View
            key={item.region}
            className={clsx(
              "flex flex-row justify-start items-start",
              i === items.length - 1 && "mb-4"
            )}
          >
            <Checkbox
              className="mr-2"
              value={item.checked}
              onValueChange={(checked) => handleCheckboxChange(i, checked)}
            />
            <Text>
              <Text>{item.region}, </Text>
              <Text className="font-semibold">{item.country} </Text>
              <Text className="text-[10px]">{item.gmtOffset}</Text>
            </Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}
