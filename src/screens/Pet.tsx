import React, { useState } from "react";
import {
  Box,
  HStack,
  Icon,
  ScrollView,
  Text,
  VStack,
  ZStack,
} from "native-base";
import { IMAGES } from "../logic/constants/images.constants";
import { Ionicons } from "@expo/vector-icons";
import useStore from "../store/store";
import HeaderNav from "../components/HeaderNav";
import ToyCard from "../components/ToyCard";
import Alice from "../components/Alice";
import ModalImage from "../components/ModalImage";
import { IShopItem } from "../models/IShopItem";

const shopItems: IShopItem[] = [
  {
    title: "Mouse",
    image: "mouse",
    price: 30,
    activity: "play-mouse",
    longText: "It can cook better than Ratatouille!",
  },
  {
    title: "Fish",
    image: "fish",
    price: 50,
    activity: "eat-fish",
    longText: "Fresh from the ocean, it reeks of palengke!",
  },
  {
    title: "Yarn",
    image: "yarn",
    price: 30,
    activity: "play-yarn",
    longText: "A delightful, playful bundle of yarn.",
  },
];

const Pet: React.FC = () => {
  const { settings, pet } = useStore();
  const [item, setItem] = useState(0);
  const [showConfirm, setShowConfirm] = useState(false);
  const [showWarn, setShowWarn] = useState(false);

  // Handlers
  const handleItem = (item: number) => {
    setItem(item);
    setShowConfirm(true);
  };

  const handleBuy = () => {
    setShowConfirm(false);
    const treat = shopItems[item];
    if (settings.coins >= treat.price) {
      settings.coins -= treat.price;
      pet.activity = treat.activity;
    } else {
      setShowWarn(true);
    }
  };

  return (
    <Box size="full" bg="tertiary.600">
      <HeaderNav title="ALS Pet" showCoins />
      <Box
        flex="1"
        size="full"
        bg="orange.200"
        borderTopRadius="3xl"
        shadow="6"
      >
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
          <Box w="5%" />

          {/* Alice */}
          <Box w="35%" py="12" safeAreaRight>
            <Alice activity={pet.activity} />
          </Box>
        </HStack>
      </Box>

      {/* Confirm Purchase */}
      <ModalImage
        show={showConfirm}
        slides={[
          {
            image: IMAGES?.[shopItems[item].image] || IMAGES.mouse,
            title: `Buy this ${shopItems[item].image} for Alice?`,
          },
        ]}
        cta={{
          title: "Buy",
          onPress: handleBuy,
        }}
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
