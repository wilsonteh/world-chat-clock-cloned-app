import { Text, View } from "react-native";
import { AnimatedCircularProgress } from "react-native-circular-progress";
import React from "react";
import { useScreenSize } from "@/contexts/ScreenSizeContext";

interface RegionCircularProps {
  size: number;
  strokeWidth: number;
  progress: number;
  region: string;
  containerHeight: number;
}

export default function RegionCircular({
  size,
  strokeWidth,
  progress,
  region,
  containerHeight,
}: RegionCircularProps) {
  const screenSize = useScreenSize();

  return (
    <View
      className="absolute top-0"
      style={[
        { top: containerHeight / 2 - size / 2 },
        { left: screenSize.width / 2 - size / 2 },
      ]}
    >
      {/* <Text className="text-orange-300">{region}</Text> */}
      <AnimatedCircularProgress
        size={size}
        width={strokeWidth}
        fill={progress}
        tintColor="orange"
        backgroundColor="#3d5875"
        rotation={0}
        lineCap="butt"
        renderCap={({ center }) => (
          // {x, y} = {75, 140}
          <View>
            {/* <Circle cx={center.x} cy={center.y / 2} r="10" fill="blue" /> */}
            {/* <Text className="text-orange-300">
              {center.x}, {center.y}
            </Text> */}
          </View>
        )}
      >
        {(fill) => <Text className="text-orange-300 absolute">{fill}%</Text>}
      </AnimatedCircularProgress>
    </View>
  );
}
