import React, { useState } from "react";
import {
  AspectRatio,
  Box,
  HStack,
  Heading,
  Icon,
  Image,
  PresenceTransition,
  ScrollView,
  Text,
  VStack,
  ZStack,
} from "native-base";
import { IMAGES } from "../logic/constants/images.constants";
import { IShopItem } from "../models/IShopItem";
import { Ionicons } from "@expo/vector-icons";
import useStore from "../store/store";
import HeaderNav from "../components/HeaderNav";
import ToyCard from "../components/ToyCard";
import Alice from "../components/Alice";
import ModalImage from "../components/ModalImage";

const shopItems: IShopItem[] = [
  {
    title: "Yarn",
    image: "yarn",
    price: 5,
    activity: "play-yarn",
    longText: "A delightful, playful bundle of yarn.",
  },
  {
    title: "Mouse",
    image: "mouse",
    price: 10,
    activity: "play-mouse",
    longText: "It can cook better than Ratatouille!",
  },
  {
    title: "Fish",
    image: "fish",
    price: 15,
    activity: "eat-fish",
    longText: "It reeks of palengke, but Alice loves it!",
  },
];

const Pet: React.FC = () => {
  const { settings, pet, petHelpDone, buyTreat } = useStore();
  const [showHelp, setShowHelp] = useState(pet.help);
  const [item, setItem] = useState(0);
  const [showConfirm, setShowConfirm] = useState(false);
  const [showWarn, setShowWarn] = useState(false);
  const [animate, setAnimate] = useState(false);

  // Handlers
  const handleHelpClose = () => {
    setShowHelp(false);
    petHelpDone();
  };

  const handleItem = (item: number) => {
    setItem(item);
    setShowConfirm(true);
  };

  const handleBuy = () => {
    setShowConfirm(false);
    const treat = shopItems[item];
    if (settings.coins >= treat.price) {
      buyTreat(treat.price, treat.activity);
      setAnimate(true);
    } else {
      setShowWarn(true);
    }
  };

  return (
    <Box size="full" bg="tertiary.600">
      <HeaderNav
        title="ALS Pet"
        showCoins
        onHelpPress={() => setShowHelp(true)}
      />
      <Box
        flex="1"
        size="full"
        bg="orange.200"
        borderTopRadius="3xl"
        shadow="6"
        overflow="hidden"
      >
        {/* Background */}
        <Box position="absolute" top="0" left="0" opacity={0.4}>
          <AspectRatio size="full" ratio={1}>
            <Image
              resizeMode="cover"
              source={IMAGES.background}
              alt="background"
            />
          </AspectRatio>
        </Box>

        <HStack>
          {/* Shop */}
          <Box w="60%" pl="0" p="4" overflow="hidden" safeAreaLeft>
            <ZStack size="full">
              <Box
                bg="white"
                opacity={0.4}
                position="absolute"
                size="full"
                borderRadius="lg"
              />
              <Box p="4" size="full" borderRadius="lg" overflow="hidden">
                <VStack space="4">
                  <HStack space="2" alignItems="center">
                    <Icon
                      as={Ionicons}
                      size="md"
                      color="orange.900"
                      name="paw-sharp"
                    />
                    <Text color="orange.900" bold fontSize="lg">
                      Paw Shop
                    </Text>
                  </HStack>
                  <ScrollView horizontal={true} h="full">
                    <HStack space="2">
                      {shopItems.map((item: IShopItem, key: number) => (
                        <ToyCard
                          key={key}
                          image={IMAGES?.[item.image]}
                          price={item.price}
                          title={item.title}
                          longText={item?.longText}
                          onPress={() => handleItem(key)}
                        />
                      ))}
                    </HStack>
                  </ScrollView>
                </VStack>
              </Box>
            </ZStack>
          </Box>

          {/* Divider */}
          <Box w="5%" />

          {/* Alice */}
          <Box w="35%" py="12" safeAreaRight>
            {/* +Mood */}
            <Box position="absolute" left="0" top="4">
              <PresenceTransition
                visible={animate}
                initial={{ opacity: 0 }}
                animate={{
                  opacity: 1,
                  transition: {
                    duration: 600,
                  },
                }}
                exit={{
                  opacity: 0,
                  transition: {
                    duration: 600,
                  },
                }}
                onTransitionComplete={() =>
                  setTimeout(() => setAnimate(false), 700)
                }
              >
                <Heading fontSize="2xl" color="orange.400" shadow="1">
                  +Mood
                </Heading>
              </PresenceTransition>
            </Box>
            <Alice />
          </Box>
        </HStack>
      </Box>

      {/* Instructions */}
      <ModalImage
        show={showHelp}
        slides={[
          {
            image: IMAGES.tip3,
            title: "Click on Alice to see its mood",
          },
          {
            image: IMAGES.tip4,
            title: "Buy treats to raise Alice's mood",
          },
          {
            image: IMAGES.tip5,
            title: "Make Alice happy!",
          },
        ]}
        cta={{
          title: "Let's go!",
          onPress: handleHelpClose,
        }}
      />

      {/* Confirm Purchase */}
      <ModalImage
        show={showConfirm}
        slides={[
          {
            image: IMAGES?.[shopItems[item].image],
            title: `Buy this treat for Alice?`,
          },
        ]}
        cta={{
          title: "Buy",
          onPress: handleBuy,
        }}
        onClose={() => setShowConfirm(false)}
      />

      {/* Insufficient coins */}
      <ModalImage
        show={showWarn}
        delay={1000}
        slides={[
          {
            image: IMAGES.denied,
            title: "You have insufficient coins!",
          },
        ]}
        cta={{
          title: "Okay",
          onPress: () => setShowWarn(false),
        }}
      />
    </Box>
  );
};

export default Pet;
