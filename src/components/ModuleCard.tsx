import React from "react";
import { InterfacePressableProps } from "native-base/lib/typescript/components/primitives/Pressable/types";
import { Box, HStack, Icon, Text } from "native-base";
import { Entypo, MaterialIcons } from "@expo/vector-icons";
import { IModule } from "../models/IModule";
import AnimatedPressable from "./AnimatedPressable";

interface IModuleCard {
  data?: IModule;
}

const ModuleCard: React.FC<IModuleCard & InterfacePressableProps> = ({
  data,
  ...props
}) => {
  return (
    <AnimatedPressable {...props}>
      <Box w="full" borderBottomWidth="1" borderBottomColor="gray.200" py="3">
        <HStack p="1" space="4" alignItems="center">
          <Box
            borderRadius="full"
            p="3"
            bg={!!data?.topics ? "tertiary.600" : "gray.200"}
          >
            <Icon size="lg" as={Entypo} name="open-book" color="white" />
          </Box>
          <HStack justifyContent="space-between" w="90%">
            <Text fontSize="md" color={!!data?.topics ? "black" : "gray.300"}>
              {data?.title}
            </Text>
            <Icon
              size="sm"
              as={MaterialIcons}
              name="arrow-forward-ios"
              color={!!data?.topics ? "gray.500" : "gray.200"}
            />
          </HStack>
        </HStack>
      </Box>
    </AnimatedPressable>
  );
};

export default ModuleCard;
