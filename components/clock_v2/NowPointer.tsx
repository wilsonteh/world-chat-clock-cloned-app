import { useScreenSize } from "@/contexts/ScreenSizeContext";
import { View, Text } from "react-native";
import { Line, Svg } from "react-native-svg";

export default function NowPointer({
  Ncircular,
  containerHeight,
}: {
  Ncircular: number;
  containerHeight: number;
}) {
  // * NOTE nid to calculate dynamically based on radius of the largest circle
  const size = 100 + 50 * Ncircular;
  // const length = size / 2;
  const screenSize = useScreenSize();

  const centerX = size / 2;
  const centerY = size / 2;
  const radius = size / 2; // Adjust the radius to fit your design

  const timeNow = new Date();
  const hours = timeNow.getHours();
  const minutes = timeNow.getMinutes();
  // const seconds = timeNow.getSeconds();
  // Calculate the angle for the current time (360 degrees for 24 hours)
  const angle = ((hours % 24) / 24 + minutes / 1440) * 360;
  const angleInRadians = (angle - 90) * (Math.PI / 180); // Subtract 90 to start at the top

  // Calculate end points for the line based on the angle
  const endX = centerX + radius * Math.cos(angleInRadians);
  const endY = centerY + radius * Math.sin(angleInRadians);

  return (
    <Svg
      width={size}
      height={size}
      // className="bg-teal-500"
      style={[
        { top: containerHeight / 2 - size / 2 },
        { left: screenSize.width / 2 - size / 2 },
      ]}
    >
      {/* <Line
        x1={size / 2}
        y1={size / 2}
        x2={0}
        y2={0}
        stroke="white"
        strokeWidth={3}
      /> */}
      <Line
        x1={centerX}
        y1={centerY}
        x2={endX}
        y2={endY}
        stroke="white"
        strokeWidth={3}
      />
    </Svg>
    // <View className="absolute top left-1/2">
    //   <View
    //     className="bg-slate-300"
    //     style={{ width: 3, height: LENGTH }}
    //   ></View>
    // </View>
  );
}
