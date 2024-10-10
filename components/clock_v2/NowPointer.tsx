import { LARGEST_CIRCLE_SIZE } from "@/constants/Constants";
import { useScreenSize } from "@/contexts/ScreenSizeContext";
import React, { useEffect, useRef, useState } from "react";
import {
  GestureResponderEvent,
  PanResponder,
  PanResponderGestureState,
  View,
  Animated,
  Easing,
} from "react-native";
import { Circle, Line, Svg } from "react-native-svg";

export default function NowPointer({
  containerHeight,
  onPointerMove,
}: {
  containerHeight: number;
  onPointerMove: (angle: number) => void;
}) {
  const size = LARGEST_CIRCLE_SIZE + 60;
  const screenSize = useScreenSize();
  const radius = size / 2;
  const [currentTimePosition, setPosition] = useState({
    startX: size / 2,
    startY: size / 2,
    ...getPointerPositionByCurrentTime(),
  });
  // console.log(currentTimePosition);
  const [hasPointerMoved, setHasPointerMoved] = useState(false);
  const animationValue = useRef(new Animated.Value(0)).current;

  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onPanResponderGrant(e, gestureState) {
      // When user click anywhere within the clock
      handlePointerInteraction(e);
    },
    onPanResponderMove: (e, gestureState) => {
      // When user drags the pointer
      handlePointerInteraction(e);
    },
  });

  // const rotatePointer = (newAngle: number) => {
  //   console.log("🚀 newAngle:", newAngle, "oldAngle", currentTimePosition.angle)
  //   let toValue = 0;
    
  //   if (newAngle > currentTimePosition.angle) {
  //     console.log("1")
  //     toValue = newAngle - currentTimePosition.angle;
  //   } else if (newAngle < currentTimePosition.angle) {
  //     console.log("2")
  //     toValue = 360 - currentTimePosition.angle + newAngle;
  //   }
  //   console.log("❌❌❌ toValue:", toValue)

  //   Animated.timing(animationValue, {
  //     toValue,
  //     duration: 1000,
  //     easing: Easing.inOut(Easing.ease),
  //     useNativeDriver: true,
  //   }).start();
  // };

  const interpolatedRotation = animationValue.interpolate({
    inputRange: [0, 360],
    outputRange: ["0deg", "360deg"],
  });
  
  // useEffect(() => {
  //   const listenerId  = animationValue.addListener(({ value }) => {
  //     // console.log("💧💧 rotated deg", value);
  //   });

  //   return () => interpolatedRotation.removeListener(listenerId);

  // }, [interpolatedRotation]); 
  

  function handlePointerInteraction(e: GestureResponderEvent) {
    setHasPointerMoved(true);
    const { locationX, locationY } = e.nativeEvent;
    console.log("🌍🌍🌍 location", locationX, locationY);
    const dx = locationX - currentTimePosition.startX;
    const dy = locationY - currentTimePosition.startY;
    let newPointerAngle = (Math.atan2(dy, dx) * 180) / Math.PI;
    // Adiust negative angle (coz atan2 returns angle from -179.99 to 179.99)
    if (newPointerAngle < 0) {
      newPointerAngle += 360;
    }
    // console.log("🚀🚀🚀 newPointerAngle:", newPointerAngle);
    const newPointerAngleRadian = newPointerAngle * (Math.PI / 180);
    const endX = radius + radius * Math.cos(newPointerAngleRadian);
    const endY = radius + radius * Math.sin(newPointerAngleRadian);

    // Get the angle to be rotated on the pointer to the new position
    // rotatePointer(newPointerAngle);

    // Don't alter the value for endX & endY when the pointer is being moved
    // Use the rotate css to control the pointer movement
    setPosition((prevPosition) => ({
      ...prevPosition,
      endX, 
      endY,
      angle: newPointerAngle,
    }));
    onPointerMove(newPointerAngle);
  }

  function getPointerPositionByCurrentTime() {
    const timeNow = new Date();
    const hours = timeNow.getHours();
    const minutes = timeNow.getMinutes();

    // Calculate the angle for the current time (360 degrees for 24 hours)
    const angle = ((hours % 24) / 24 + minutes / 1440) * 360 - 90;
    const angleInRadians = angle * (Math.PI / 180); // Subtract 90 to start at the top

    // Calculate end points for the pointer based on the angle
    const endX = radius + radius * Math.cos(angleInRadians);
    const endY = radius + radius * Math.sin(angleInRadians);
    return { endX, endY, angle };
  }

  function resetPointerPosition() {
    console.log("reset pointer position");
    setHasPointerMoved(false);
    setPosition((prevPosition) => ({
      ...prevPosition,
      ...getPointerPositionByCurrentTime(),
    }));

    const timeNow = new Date();
    const hours = timeNow.getHours();
    const minutes = timeNow.getMinutes();
    const angle = ((hours % 24) / 24 + minutes / 1440) * 360 - 90;
    onPointerMove(angle);
    // Reset rotate back to 0, so the pointer end position will follow endX & endY
    // rotatePointer(0);
  }

  useEffect(() => {
    const interval = setInterval(() => {
      if (!hasPointerMoved) {
        // Only change the pointer position if it hasn't been moved by the user
        setPosition((prevPosition) => ({
          ...prevPosition,
          ...getPointerPositionByCurrentTime(),
        }));
        console.log("Updating pointer position every min");
      }
    }, 1000 * 60); // update pointer every min

    return () => clearInterval(interval);
  }, []);

  return (
    <View>
      <View
        className="z-10 absolute"
        style={{
          top: containerHeight / 2 - size / 2,
          left: screenSize.width / 2 - size / 2,
          // backgroundColor: "teal",
        }}
        {...panResponder.panHandlers}
      >
        <Animated.View
          style={{
            // position: "absolute",
            width: size,
            height: size,
            transform: [{ rotate: interpolatedRotation }],
            // backgroundColor: "red",
          }}
        >
          <Svg width={size} height={size}>
            {!hasPointerMoved && (
              <Circle
                id="center-dot"
                cx={radius}
                cy={radius}
                r={10}
                fill="white"
              />
            )}
            {hasPointerMoved && (
              <Circle
                id="reset-icon-circle"
                cx={radius}
                cy={radius}
                r={20}
                fill="#1e6ff2"
                onPress={resetPointerPosition}
              />
            )}
            <Line
              x1={currentTimePosition.startX}
              y1={currentTimePosition.startY}
              x2={currentTimePosition.endX}
              y2={currentTimePosition.endY}
              stroke="white"
              strokeWidth={3}
            />
          </Svg>
        </Animated.View>
      </View>
    </View>
  );
}
