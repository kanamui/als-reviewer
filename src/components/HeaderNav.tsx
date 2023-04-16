import React from "react";
import { HStack, Heading, Icon, IconButton } from "native-base";
import { Ionicons } from "@expo/vector-icons";
import { ICta } from "../models/components/ICta";

const HeaderNav = ({ title, onPress }: ICta) => {
  return (
    <HStack space="3" alignItems="center" py="3">
      <IconButton
        p="1"
        borderRadius="full"
        icon={
          <Icon
            as={Ionicons}
            size="lg"
            color="black"
            name="arrow-back-outline"
          />
        }
        onPress={onPress}
      />
      <Heading fontSize="lg">{title}</Heading>
    </HStack>
  );
};

export default HeaderNav;