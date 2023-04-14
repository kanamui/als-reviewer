import React, { useState } from "react";
import {
  Box,
  Button,
  Flex,
  HStack,
  Heading,
  Icon,
  IconButton,
  Text,
  VStack,
} from "native-base";
import { Ionicons } from "@expo/vector-icons";
import Layout from "../components/Layout";

const ModuleTOC: React.FC = ({ navigation, route }: any) => {
  // States
  const [module, setModule] = useState<any>();

  // Variables
  const { data } = route.params;

  // Handlers
  const handleModule = (index: number) => {
    const mod = data?.items?.[index];
    if (mod?.topics) setModule(data?.items?.[index]);
  };

  const handleTopic = (index: number) => {};

  // Functions
  const Topics = () => {
    return (
      <>
        <HStack space="3" alignItems="center">
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
            onPress={() => setModule(null)}
          />
          <Heading fontSize="lg">{module?.title}</Heading>
        </HStack>
        <HStack>
          <VStack space="2">
            {module?.topics?.map((topic: any, key: number) => {
              return (
                <Box key={key}>
                  <Button
                    w="64"
                    h="16"
                    rounded="full"
                    onPress={() => handleModule(topic)}
                  >
                    <Text textAlign="center" color="white" bold>
                      {topic?.title}
                    </Text>
                  </Button>
                </Box>
              );
            })}
          </VStack>
        </HStack>
      </>
    );
  };

  const Main = () => {
    return (
      <>
        <VStack alignItems="center" space="4">
          <VStack space="2" alignItems="center">
            <Heading maxW="80" textAlign="center">
              {data?.title}
            </Heading>
            <Heading size="sm">{data?.subTitle}</Heading>
          </VStack>
          <Flex flexWrap="wrap" h="240px">
            {data?.items?.map((module: any, key: number) => {
              return (
                <Box key={key} p="1">
                  <Button
                    w="64"
                    h="16"
                    rounded="full"
                    onPress={() => handleModule(key)}
                  >
                    <Text textAlign="center" color="white" bold>
                      {module?.title}
                    </Text>
                  </Button>
                </Box>
              );
            })}
          </Flex>
        </VStack>
      </>
    );
  };

  return (
    <Layout>
      <VStack py="6" flex="1" space="4">
        {module ? Topics() : Main()}
      </VStack>
    </Layout>
  );
};

export default ModuleTOC;
