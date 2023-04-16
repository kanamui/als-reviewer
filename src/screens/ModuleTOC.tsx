import React, { useState } from "react";
import { Box, Button, Flex, HStack, Heading, Text, VStack } from "native-base";
import Layout from "../components/Layout";
import HeaderNav from "../components/HeaderNav";
import Generic from "../components/Generic";

const ModuleTOC: React.FC = ({ navigation, route }: any) => {
  // States
  const [module, setModule] = useState<any>();
  const [topic, setTopic] = useState<any>();
  const [screen, setScreen] = useState<string | undefined>();

  // Variables
  const { data } = route.params;

  // Handlers
  const handleModule = (module: any) => {
    if (module?.topics) {
      setModule(module);
      setScreen("topics");
    }
  };

  const handleTopic = (topic: any) => {
    if (topic?.lessons) {
      setTopic(topic);
      setScreen("intro");
    }
  };

  const handleLesson = (lesson: any) => {
    navigation.navigate("Module", { data: lesson });
    setTimeout(() => setScreen("main"), 500);
  };

  // Functions
  const DynamicScreen = () => {
    switch (screen) {
      case "lessons":
        return Lessons();
      case "intro":
        return Introduction();
      case "topics":
        return Topics();
      case "main":
      default:
        return Main();
    }
  };

  const Lessons = () => {
    return (
      <>
        <HeaderNav
          title={`${module?.title} LESSONS`}
          onPress={() => setScreen("topics")}
        />
        <Box py="6" flex="1">
          <HStack flex="1" alignItems="center" justifyContent="center">
            <VStack space="2">
              {topic?.lessons?.map((lesson: any, key: number) => {
                return (
                  <Box key={key}>
                    <Button
                      w="64"
                      h="16"
                      rounded="full"
                      onPress={() => handleLesson(lesson)}
                    >
                      <Text textAlign="center" color="white" bold>
                        {lesson?.title}
                      </Text>
                    </Button>
                  </Box>
                );
              })}
            </VStack>
          </HStack>
        </Box>
      </>
    );
  };

  const Introduction = () => {
    return (
      <Generic
        header={{
          onPress: () => setScreen("topics"),
        }}
        subTitle={topic?.subTitle}
        title={topic?.longText}
        cta={{
          title: "PROCEED",
          onPress: () => setScreen("lessons"),
        }}
      />
    );
  };

  const Topics = () => {
    return (
      <>
        <HeaderNav
          title={`${module?.title} TOPICS`}
          onPress={() => setScreen("main")}
        />
        <Box py="6" flex="1">
          <HStack flex="1" alignItems="center" justifyContent="center">
            <VStack space="2">
              {module?.topics?.map((topic: any, key: number) => {
                return (
                  <Box key={key}>
                    <Button
                      w="56"
                      h="16"
                      rounded="full"
                      onPress={() => handleTopic(topic)}
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
        </Box>
      </>
    );
  };

  const Main = () => {
    return (
      <Box py="6" flex="1">
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
                    w="56"
                    h="16"
                    rounded="full"
                    onPress={() => handleModule(module)}
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
      </Box>
    );
  };

  return <Layout>{DynamicScreen()}</Layout>;
};

export default ModuleTOC;
