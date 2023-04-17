import React from "react";
import { Box, HStack, Heading, Image, Text, VStack } from "native-base";
import { IMAGES } from "../logic/constants/images.constants";

const About: React.FC = ({ route }: any) => {
  // Variables
  const { data } = route.params;

  return (
    <Box size="full" bg="white" safeAreaX>
      <Image
        w="full"
        source={IMAGES.banner}
        alt="ALS"
      />
      <VStack
        py="6"
        flex="1"
        bg="white"
        alignItems="center"
        justifyContent="space-between"
      >
        <VStack space="4" alignItems="center">
          <Heading size="md" textAlign="center">
            {data?.title}
          </Heading>
          
          <Text bold>{data?.longText}</Text>
        </VStack>
        <HStack space="2" alignItems="center">
          <Image
            w="36px"
            h="32px"
            source={IMAGES.cvsu}
            alt="cvsu"
          />
          <Text fontSize="xs" bold>
            {data?.footer}
          </Text>
        </HStack>
      </VStack>
    </Box>
  );
};

export default About;
