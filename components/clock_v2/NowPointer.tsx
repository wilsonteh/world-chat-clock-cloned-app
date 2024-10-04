import { CENTER_CIRCLE_SIZE } from "@/constants/Constants";
import { useScreenSize } from "@/contexts/ScreenSizeContext";
import { useEffect, useState } from "react";
import { Circle, Line, Svg } from "react-native-svg";

export default function NowPointer({
  Ncircular,
  containerHeight,
}: {
  Ncircular: number;
  containerHeight: number;
}) {
  const size = CENTER_CIRCLE_SIZE + 50 * Ncircular;
  const screenSize = useScreenSize();
  const radius = size / 2; 
  const [position, setPosition] = useState({
    startX: size / 2,
    startY: size / 2,
    ...getPointerEndPosition(),
  });
  
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
    <Svg
      width={size}
      height={size}
      style={[
        { top: containerHeight / 2 - size / 2 },
        { left: screenSize.width / 2 - size / 2 },
      ]}
      className="z-10"
    >
      <Circle 
        id="center-dot"
        cx={radius}
        cy={radius}
        r={10}
        fill="white"
        />
      <Line
        x1={position.startX}
        y1={position.startY}
        x2={position.endX}
        y2={position.endY}
        stroke="white"
        strokeWidth={3}
      />
    </Svg>
  );
}
