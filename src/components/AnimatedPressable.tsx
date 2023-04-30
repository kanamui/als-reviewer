import React from "react";
import { Animated } from "react-native";
import { Pressable } from "native-base";
import { InterfacePressableProps } from "native-base/lib/typescript/components/primitives/Pressable/types";

const AnimatedPressable: React.FC<InterfacePressableProps> = ({ ...props }) => {
  const animation = new Animated.Value(0);
  const fadeIn = () => {
    Animated.timing(animation, {
      toValue: 1,
      duration: 100,
      useNativeDriver: false,
    }).start();
  };
  const fadeOut = () => {
    Animated.timing(animation, {
      toValue: 0,
      duration: 200,
      useNativeDriver: false,
    }).start();
  };
  const bg = animation.interpolate({
    inputRange: [0, 1],
    outputRange: ["rgba(0,0,0,0)", "rgba(0,0,0,0.1)"],
  });
  return (
    <Pressable
      onPressIn={fadeIn}
      onPressOut={fadeOut}
      onPress={props.onPress}
      {...props}
    >
      <Animated.View
        style={{
          position: "absolute",
          width: "100%",
          height: "100%",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: 2,
          backgroundColor: bg,
        }}
      />
      <>{props.children}</>
    </Pressable>
  );
};

export default AnimatedPressable;
