import React, { useEffect, useState } from "react";
import { Animated } from "react-native";
import { Image } from "native-base";
import { IMAGES } from "../logic/constants/images.constants";
import { IPetActivity } from "../models/IPetActivity";

interface IAlice {
  activity?: IPetActivity;
}

const Alice = ({ activity }: IAlice) => {
  const [show, setShow] = useState(true);
  const scaleValue = new Animated.Value(1);

  // Functions
  const getImage = () => {
    switch (activity) {
      case "play-mouse":
        return IMAGES.catPlayMouse;
      case "eat-fish":
        return IMAGES.catFish;
      case "play-yarn":
        return IMAGES.catPlayYarn;
      case "happy":
        return IMAGES.catHappy;
      case "excited":
        return IMAGES.catYay;
      case "sleep":
      default:
        return IMAGES.catSleep;
    }
  };

  const startBreath = () => {
    Animated.timing(scaleValue, {
      toValue: 1.1,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  };

  const startBreathLooped = () => {
    const scaleAnimation = Animated.timing(scaleValue, {
      toValue: 1.1,
      duration: 1000,
      useNativeDriver: true,
    });
    const resetAnimation = Animated.timing(scaleValue, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    });
    const animationLoop = Animated.sequence([scaleAnimation, resetAnimation]);
    const loopedAnimation = Animated.loop(animationLoop);
    loopedAnimation.start();
    return () => loopedAnimation.stop();
  };

  // Effects
  useEffect(() => {
    // startBreath();
    startBreathLooped();
  }, [show]);

  useEffect(() => {
    setShow(false);
    const timeout = setTimeout(() => setShow(true));
    return () => clearInterval(timeout);
  }, [activity]);

  return (
    <Animated.View style={{ transform: [{ scale: scaleValue }] }}>
      {show && (
        <Image
          size="full"
          resizeMode="contain"
          source={getImage()}
          alt="picture"
        />
      )}
    </Animated.View>
  );
};

export default Alice;
