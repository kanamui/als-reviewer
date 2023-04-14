import React from "react";
import { HStack, Heading, Image, Text, VStack } from "native-base";
import { IMAGES } from "../logic/constants/images.constants";
import Layout from "../components/Layout";

const About: React.FC = ({ navigation, route }: any) => {
  // Variables
  const { data } = route.params;

  return (
    <Layout>
      <Image
        w="full"
        source={IMAGES.banner}
        alt="ALS"
      />
      <VStack
        py="6"
        flex="1"
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
    </Layout>
  );
};

export default About;
