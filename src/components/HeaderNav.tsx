import React from "react";
import { useNavigation } from "@react-navigation/native";
import useStore from "../store/store";
import {
  HStack,
  Heading,
  Icon,
  IconButton,
  Popover,
  Pressable,
  Text,
} from "native-base";
import { IHeaderNav } from "../models/components/IHeaderNav";
import { Ionicons, FontAwesome5 } from "@expo/vector-icons";

const HeaderNav = ({
  title,
  showCoins,
  showPet,
  onPress,
  onHelpPress,
}: IHeaderNav) => {
  // Hooks
  const navigation: any = useNavigation();
  const { settings } = useStore();

  // Handlers
  const handleBack = () => {
    if (onPress) {
      onPress();
    } else {
      navigation.goBack();
    }
  };

  const handlePet = () => {
    navigation.navigate("Pet");
  };

  return (
    <HStack alignItems="center" py="3" px="6" justifyContent="space-between">
      <HStack alignItems="center" space="3">
        <IconButton
          p="1"
          borderRadius="full"
          icon={
            <Icon
              as={Ionicons}
              size="lg"
              color="white"
              name="arrow-back-outline"
            />
          }
          onPress={handleBack}
        />
        <Heading fontSize="lg" color="white">
          {title}
        </Heading>
      </HStack>
      <HStack space="2" alignItems="center">
        {showCoins && (
          <Popover
            trigger={(triggerProps) => {
              return (
                <Pressable {...triggerProps}>
                  <HStack
                    minW="54px"
                    px="2"
                    py="5px"
                    space="2"
                    bg="tertiary.700"
                    borderRadius="full"
                    alignItems="center"
                    justifyContent="space-between"
                  >
                    <Icon
                      as={FontAwesome5}
                      size="xs"
                      color="yellow.400"
                      name="coins"
                    />
                    <Text color="white">{settings.coins}</Text>
                  </HStack>
                </Pressable>
              );
            }}
          >
            <Popover.Content accessibilityLabel="Delete Customerd" w="56">
              <Popover.Arrow />
              <Popover.CloseButton />
              <Popover.Body>
                Collect more coins by completing lessons and quizzes! Use it to
                buy treats for Alice!
              </Popover.Body>
            </Popover.Content>
          </Popover>
        )}
        {showPet && (
          <IconButton
            p="2"
            borderRadius="full"
            bg="tertiary.700"
            _pressed={{
              bg: "tertiary.800",
            }}
            icon={
              <Icon as={Ionicons} size="sm" color="white" name="paw-sharp" />
            }
            onPress={handlePet}
          />
        )}
        {onHelpPress && (
          <IconButton
            p="2"
            borderRadius="full"
            bg="tertiary.700"
            _pressed={{
              bg: "tertiary.800",
            }}
            icon={<Icon as={Ionicons} size="sm" color="white" name="help" />}
            onPress={onHelpPress}
          />
        )}
      </HStack>
    </HStack>
  );
};

export default HeaderNav;
