import { CENTER_CIRCLE_SIZE } from "@/constants/Constants";
import { useScreenSize } from "@/contexts/ScreenSizeContext";
import { View, Text, StyleSheet, Dimensions } from "react-native";

const hourIndicators = [
  24,
  "•",
  "•",
  3,
  "•",
  "•",
  6,
  "•",
  "•",
  9,
  "•",
  "•",
  12,
  "•",
  "•",
  15,
  "•",
  "•",
  18,
  "•",
  "•",
  21,
  "•",
  "•",
];

const getLabelStyles = (
  index: number,
  radius: number,
  center: { x: number; y: number }
) => {
  const angle = (index / hourIndicators.length) * 2 * Math.PI;
  const x = center.x + radius * Math.sin(angle);
  const y = center.y - radius * Math.cos(angle);

  return { left: x, top: y, position: "absolute" as "absolute" };
};

export default function HourIndicator({
  Ncircular,
  containerHeight,
}: {
  Ncircular: number;
  containerHeight: number;
}) {
  const size = CENTER_CIRCLE_SIZE + 50 * Ncircular;
  const screenSize = useScreenSize();
  const radius = size / 2 + 15;
  const center = { x: radius - 7.5, y: radius - 7.5  };

  return (
    <View
      className="absolute"
      style={[
        { width: radius * 2, height: radius * 2 },
        { top: containerHeight / 2 - radius },
        { left: screenSize.width / 2 - radius },
      ]}
    >
      {hourIndicators.map((hour, index) => (
        <Text
          key={index}
          style={[getLabelStyles(index, radius, center)]}
          className="text-white"
        >
          {hour}
        </Text>
      ))}
    </View>
  );
}
