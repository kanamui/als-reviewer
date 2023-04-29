import React from "react";
import { useWindowDimensions } from "react-native";
import {
  AspectRatio,
  Box,
  HStack,
  Heading,
  Image,
  ScrollView,
  Text,
  VStack,
} from "native-base";
import { IMAGES } from "../logic/constants/images.constants";
import RenderHTML from "react-native-render-html";

const About: React.FC = ({ route }: any) => {
  // Hooks
  const { width } = useWindowDimensions();

  // Variables
  const { data } = route.params;

  return (
    <Box size="full" bg="white">
      <AspectRatio ratio={10}>
        <Image
          size="full"
          source={IMAGES.banner}
          resizeMode="cover"
          alt="ALS"
        />
      </AspectRatio>
      <VStack
        p="4"
        flex="1"
        bg="white"
        alignItems="center"
        justifyContent="space-between"
        safeAreaX
      >
        <ScrollView>
          <VStack space="2" alignItems="center">
            <Heading size="md" textAlign="center">
              {data?.title}
            </Heading>
            {data?.longText && (
              <RenderHTML
                contentWidth={width}
                source={{ html: data.longText }}
              />
            )}
          </VStack>
        </ScrollView>
        <HStack space="2" alignItems="center">
          <Image w="36px" h="32px" source={IMAGES.cvsu} alt="cvsu" />
          <Text fontSize="xs" bold>
            {data?.footer}
          </Text>
        </HStack>
      </VStack>
    </Box>
  );
};

export default About;
