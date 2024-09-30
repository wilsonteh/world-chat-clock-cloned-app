import { View, Text } from "react-native";
import { Circle, Svg } from "react-native-svg";

export default function CircularProgress() {
  const SIZE = 250; // hardcoded for now, will be a prop passed from parent
  const STROKE_WIDTH = 20;
  const OUTER_STROKE_WIDTH = 0.5;
  const radius = SIZE / 2 - STROKE_WIDTH / 2;
  const circumference = 2 * Math.PI * radius;

  return (
    <View>
      <Svg
        width={SIZE + OUTER_STROKE_WIDTH * 2}
        height={SIZE + OUTER_STROKE_WIDTH * 2}
      >
        {/* <Circle 
          id="circular-bg"
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
        /> */}

        <Circle
          id="circular-stretch-hours"
          cx={SIZE / 2 + OUTER_STROKE_WIDTH}
          cy={SIZE / 2 + OUTER_STROKE_WIDTH}
          r={radius}
          fill="none"
          strokeWidth={STROKE_WIDTH}
          stroke="#4b536a"
          strokeDasharray={circumference}
          strokeDashoffset={circumference * 0.5}
          strokeLinecap="butt"
          rotation={-90}
          origin={`${SIZE / 2 + OUTER_STROKE_WIDTH}, ${
            SIZE / 2 + OUTER_STROKE_WIDTH
          }`}
        />

        <Circle
          id="circular-working-hours"
          cx={SIZE / 2 + OUTER_STROKE_WIDTH}
          cy={SIZE / 2 + OUTER_STROKE_WIDTH}
          r={radius}
          fill="none"
          strokeWidth={STROKE_WIDTH}
          stroke="#9979fd"
          strokeDasharray={circumference}
          strokeDashoffset={circumference * 0.5}
          strokeLinecap="butt"
          rotation={0}
          origin={`${SIZE / 2}, ${SIZE / 2}`}
        />

        <Circle
          id="circular-bg-stroke-outer"
          cx={SIZE / 2 + OUTER_STROKE_WIDTH}
          cy={SIZE / 2 + OUTER_STROKE_WIDTH}
          r={radius + STROKE_WIDTH / 2}
          fill="none"
          strokeWidth={OUTER_STROKE_WIDTH}
          stroke="#fff"
        />

        <Circle
          id="circular-bg-stroke-inner"
          cx={SIZE / 2 + OUTER_STROKE_WIDTH}
          cy={SIZE / 2 + OUTER_STROKE_WIDTH}
          r={radius - STROKE_WIDTH / 2}
          fill="none"
          strokeWidth={OUTER_STROKE_WIDTH}
          stroke="#fff"
        />
      </Svg>
    </View>
  );
}
