import { useScreenSize } from "@/contexts/ScreenSizeContext";
import { View, Text } from "react-native";
import { Svg, Circle } from "react-native-svg";

interface CenterCircleProps {
  size: number;
  containerHeight: number;
}

export default function CenterCircle({
  size,
  containerHeight,
}: CenterCircleProps) {
  const screenSize = useScreenSize();
  const radius = size / 2;
  const centerX = screenSize.width / 2;
  const centerY = containerHeight / 2;

  return (
    <Svg
      height={size}
      width={size}
      style={{
        position: "absolute",
        top: centerY - radius,
        left: centerX - radius,
      }}
    >
      <Circle
        cx={radius}
        cy={radius}
        r={radius - 4} // Adjust for border width
        stroke="orange"
        strokeWidth={4}
        fill="#3d5875"
      />
    </Svg>
  );
}
