import React, { useEffect, useState } from "react";
import { View } from "react-native";
import {
  Box,
  Center,
  CloseIcon,
  Image,
  PresenceTransition,
  Pressable,
  Stack,
  Text,
} from "native-base";
import { IMAGES } from "../logic/constants/images.constants";
import { IPetActivity } from "../models/IPetActivity";
import useStore from "../store/store";

const Alice = () => {
  const { pet } = useStore();
  const [initiated, setInitiated] = useState(false);
  const [activity, setActivity] = useState<IPetActivity>("sleep");
  const [show, setShow] = useState(true);
  const [animate, setAnimate] = useState(true);
  const [showStats, setShowStats] = useState(false);

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

  function getActivityFromMood(): IPetActivity {
    if (pet.mood >= 90) {
      return "excited";
    } else if (pet.mood >= 30) {
      return "happy";
    }
    return "sleep";
  }

  const getMood = () => {
    if (pet.mood >= 90) {
      return "Happy happy happy";
    } else if (pet.mood >= 60) {
      return "Very happy";
    } else if (pet.mood >= 30) {
      return "Happy";
    } else {
      return "Grumpy";
    }
  };

  // Effects
  useEffect(() => {
    setShow(false);
    setAnimate(false);
    const updateAlice = () => {
      setActivity(initiated ? pet.activity : getActivityFromMood());
      setInitiated(true);
      setShow(true);
      setAnimate(true);
    };
    const timeout = setTimeout(updateAlice);
    return () => clearInterval(timeout);
  }, [pet.activity, pet.mood]);

  return (
    <>
      {/* Alice */}
      {show && (
        <Pressable onPress={() => setShowStats((prev) => !prev)}>
          <PresenceTransition
            visible={animate}
            initial={{ scale: 1 }}
            animate={{
              scale: 1.1,
              transition: {
                duration: 700,
              },
            }}
            exit={{
              scale: 1,
              transition: {
                duration: 1000,
              },
            }}
            onTransitionComplete={() =>
              setTimeout(() => setAnimate(false), 500)
            }
          >
            <Image
              size="full"
              resizeMode="contain"
              source={getImage()}
              alt="picture"
            />
          </PresenceTransition>
        </Pressable>
      )}

      {/* Stats */}
      {showStats && (
        <Center position="absolute" top="4" w="full">
          <Stack
            w="80%"
            px="4"
            py="3"
            bg="light.50"
            borderRadius="lg"
            borderWidth="1"
            borderColor="gray.300"
            space="1"
          >
            <Box position="absolute" right="1" top="1">
              <Pressable onPress={() => setShowStats((prev) => !prev)} p="1">
                <CloseIcon size="sm" />
              </Pressable>
            </Box>
            <Text fontSize="xs">
              <Text bold>Name: </Text>Alice
            </Text>
            <Text fontSize="xs">
              <Text bold>Mood: </Text>
              {getMood()}
            </Text>
          </Stack>
          <Box position="absolute" bottom="-8px">
            <View style={{ transform: [{ rotate: "45deg" }] }}>
              <Box
                size="4"
                bg="light.50"
                borderRightWidth="1"
                borderBottomWidth="1"
                borderColor="gray.300"
              ></Box>
            </View>
          </Box>
        </Center>
      )}
    </>
  );
};

export default Alice;
