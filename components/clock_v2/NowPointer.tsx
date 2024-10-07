import { CENTER_CIRCLE_SIZE, LARGEST_CIRCLE_SIZE } from "@/constants/Constants";
import { useScreenSize } from "@/contexts/ScreenSizeContext";
import { useEffect, useState } from "react";
import { GestureResponderEvent, PanResponder, View } from "react-native";
import { Circle, Line, Svg } from "react-native-svg";

export default function NowPointer({
  Ncircular,
  containerHeight,
}: {
  Ncircular: number;
  containerHeight: number;
}) {
  const size = LARGEST_CIRCLE_SIZE + 60;
  const screenSize = useScreenSize();
  const radius = size / 2; 
  const [position, setPosition] = useState({
    startX: size / 2,
    startY: size / 2,
    ...getPointerEndPosition(),
  });
  
  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onPanResponderGrant(e, gestureState) {
      // when user click anywhere within the clock
      console.log("👆👆 onPanResponderGrant");
      handlePointerInteraction(e);
    },
    onPanResponderMove: (e, gestureState) => {
      // when user drags the pointer
      console.log("💧💧 onPanResponderMove");
      handlePointerInteraction(e);
    }, 
  })

  function handlePointerInteraction(e: GestureResponderEvent) {
    const { locationX, locationY } = e.nativeEvent;
    const dx = locationX - position.startX;
    const dy = locationY - position.startY;
    const pointerAngle = Math.atan2(dy, dx) * 180 / Math.PI;
    const pointerAngleRadian = (pointerAngle) * (Math.PI / 180);
    const endX = radius + radius * Math.cos(pointerAngleRadian);
    const endY = radius + radius * Math.sin(pointerAngleRadian);
    setPosition(prevPosition => ({ ...prevPosition, endX, endY }));   
  }

  function getPointerEndPosition() {
    const timeNow = new Date();
    const hours = timeNow.getHours();
    const minutes = timeNow.getMinutes();
  
    // Calculate the angle for the current time (360 degrees for 24 hours)
    const angle = ((hours % 24) / 24 + minutes / 1440) * 360;
    const angleInRadians = (angle - 90) * (Math.PI / 180); // Subtract 90 to start at the top
  
    // Calculate end points for the line based on the angle
    const endX = radius + radius * Math.cos(angleInRadians);
    const endY = radius + radius * Math.sin(angleInRadians);
    return { endX, endY };
  }

  useEffect(() => {
    const interval = setInterval(() => {
      setPosition(prevPosition => ({
        ...prevPosition, 
        ...getPointerEndPosition()
      }))
      console.log("Updating pointer position every min")
    }, 1000 * 60) // update pointer every min
    
    return () => clearInterval(interval);

  }, [])
  
  return (
    <View className="z-10" {...panResponder.panHandlers}>
      <Svg
        width={size}
        height={size}
        style={[
          { top: containerHeight / 2 - size / 2 },
          { left: screenSize.width / 2 - size / 2 },
        ]}
      >
        <Circle id="center-dot" cx={radius} cy={radius} r={10} fill="white" />
        <Line
          x1={position.startX}
          y1={position.startY}
          x2={position.endX}
          y2={position.endY}
          stroke="white"
          strokeWidth={3}
        />
      </Svg>
    </View>
  );
}
