// Modules
import React, { useState } from "react";
import { Button, HStack, Heading, Image, Text, VStack } from "native-base";
import { IMAGES } from "../logic/constants/images.constants";
// Components
import Layout from "../components/Layout";

const Home: React.FC = ({ navigation, route }: any) => {
  // States
  const [disclaimer, setDisclaimer] = useState<boolean>(false);

  // Variables
  const { data } = route.params;

  // Handlers
  const handleProceed = () => {
    navigation.navigate("ModuleTOC");
    setTimeout(() => setDisclaimer(false), 500);
  };

  // Functions
  const Disclaimer = () => {
    return (
      <>
        <VStack space="8" alignItems="center">
          <VStack space="2">
            <Text bold>{data?.disclaimer?.kicker}</Text>
            <Text bold>{data?.disclaimer?.title}</Text>
          </VStack>

          <VStack space="4">
            <HStack space="4" maxW="270px" alignItems="center">
              <Image
                size="xs"
                source={IMAGES.checklist}
                alt="checklist"
              />
              <Text fontSize="xs" bold>
                {data?.disclaimer?.longText1}
              </Text>
            </HStack>
            <HStack space="4" maxW="270px" alignItems="center">
              <Image
                size="xs"
                source={IMAGES.book}
                alt="book"
              />
              <Text fontSize="xs" bold>
                {data?.disclaimer?.longText2}
              </Text>
            </HStack>
          </VStack>
        </VStack>

        <Button w="32" onPress={handleProceed}>
          <Text color="white" bold>
            {data?.disclaimer?.cta}
          </Text>
        </Button>
      </>
    );
  };

  const Main = () => {
    return (
      <>
        <VStack space="8" alignItems="center">
          <Heading size="sm">{data?.kicker}</Heading>
          <Heading maxW="80" textAlign="center">
            {data?.title}
          </Heading>

          <VStack alignItems="center" space="2">
            <Button w="32" onPress={() => setDisclaimer(true)}>
              <Text color="white" bold>
                {data?.cta1}
              </Text>
            </Button>
            <Button
              w="32"
              onPress={() => {
                navigation.navigate("About");
              }}
            >
              <Text color="white" bold>
                {data?.cta2}
              </Text>
            </Button>
          </VStack>
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
      </>
    );
  };

  return (
    <Layout>
      <VStack
        py="6"
        flex="1"
        alignItems="center"
        justifyContent="space-between"
      >
        {disclaimer ? Disclaimer() : Main()}
      </VStack>
    </Layout>
  );
};

export default Home;
