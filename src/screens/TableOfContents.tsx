import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Center,
  HStack,
  Heading,
  Icon,
  ScrollView,
  Text,
  VStack,
} from "native-base";
import {
  Entypo,
  MaterialCommunityIcons,
  MaterialIcons,
} from "@expo/vector-icons";
import HeaderNav from "../components/HeaderNav";
import AnimatedPressable from "../components/AnimatedPressable";

const TableOfContents: React.FC = ({ navigation, route }: any) => {
  // States
  const [module, setModule] = useState<any>();
  const [moduleId, setModuleId] = useState<number>(0);
  const [topic, setTopic] = useState<any>();
  const [topicId, setTopicId] = useState<number>(0);
  const [screen, setScreen] = useState<string | undefined>();
  const [show, setShow] = useState<boolean>(true);

  // Variables
  const { data } = route.params;
  const progress = [
    {
      moduleId: 2,
      currentTopic: 0,
      topic: [
        {
          topicId: 0,
          lesson: [
            {
              lessonId: 0,
              slide: 2,
            },
            // other lessons
          ],
        },
        // other topics
      ],
    },
    // other modules
  ];

  const isCurrentTopic = (topicId: number) => {
    const p = progress?.find((p) => p.moduleId === moduleId);
    return p ? p?.currentTopic === topicId : false;
  };

  const isCurrentSlide = (lessonId: number, slideId: number) => {
    const p = progress
      ?.find((p) => p.moduleId === moduleId)
      ?.topic?.find((t) => t?.topicId === topicId)
      ?.lesson?.find((l) => l?.lessonId === lessonId);

    return p ? p?.slide <= slideId : false;
  };

  const isSlideComplete = (lessonId: number, slideId: number) => {
    const p = progress
      ?.find((p) => p.moduleId === moduleId)
      ?.topic?.find((t) => t?.topicId === topicId)
      ?.lesson?.find((l) => l?.lessonId === lessonId);
    return p ? p?.slide > slideId : false;
  };

  // Handlers
  const handleModule = (module: any, index: number) => {
    if (module?.topics) {
      setModule(module);
      setModuleId(index);
      setScreen("topics");
    }
  };

  const handleTopic = (topic: any, index: number) => {
    if (topic?.lessons) {
      setTopic(topic);
      setTopicId(index);
      setScreen("lessons");
    }
  };

  const handleLesson = (lesson: any) => {
    navigation.navigate("Module", { data: lesson });
  };

  const handleAssessment = () => {
    navigation.navigate("Quiz", { data: topic?.assessment });
  }

  const handleQuiz = (lesson: number) => {
    navigation.navigate("Quiz", { data: topic?.lessons?.[lesson]?.quiz });
  };

  // Effects
  useEffect(() => {
    // force reload cached images
    setShow(false);
    const timeout = setTimeout(() => setShow(true));
    return () => clearTimeout(timeout);
  }, [screen]);

  // Functions
  const DynamicScreen = () => {
    switch (screen) {
      case "lessons":
        return Lessons();
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
        <HeaderNav title={topic?.title} onPress={() => setScreen("topics")} />
        <Box
          pt="6"
          px="3"
          flex="1"
          size="full"
          bg="gray.100"
          borderTopRadius="3xl"
          shadow="6"
        >
          <ScrollView opacity={show ? 1 : 0}>
            <Box safeAreaX>
              {topic?.longText && (
                <VStack
                  borderWidth="1"
                  borderColor="gray.200"
                  px="5"
                  py="3"
                  mb="5"
                  bg="white"
                  space="3"
                >
                  <Heading fontSize="md">About</Heading>
                  <Text>{topic?.longText}</Text>
                </VStack>
              )}

              {/* Pre-Assessment */}
              {topic?.assessment && (
                <VStack borderWidth="1" borderColor="gray.200" mb="5" bg="white">
                  <HStack
                    p="5"
                    space="3"
                    borderBottomWidth="1"
                    borderBottomColor="gray.200"
                    alignItems="center"
                  >
                    <Icon
                      size="lg"
                      as={MaterialCommunityIcons}
                      name="brain"
                      color="tertiary.600"
                    />
                    <VStack>
                      <Heading fontSize="md">{topic?.assessment?.kicker}</Heading>
                      <Text>{topic?.assessment?.longText}</Text>
                    </VStack>
                  </HStack>
                  <Box p="5">
                    <Button w="full" variant="outline" onPress={handleAssessment}>
                      <Text color="tertiary.600" bold>
                        Start
                      </Text>
                    </Button>
                  </Box>
                </VStack>
              )}
              {topic?.lessons?.map((lesson: any, lessonKey: number) => {
                return (
                  <Box key={lessonKey}>
                    {/* Lesson */}
                    <VStack
                      borderWidth="1"
                      borderColor="gray.200"
                      mb="5"
                      bg="white"
                    >
                      <HStack
                        p="5"
                        borderBottomWidth="1"
                        borderBottomColor="gray.200"
                        alignItems="center"
                      >
                        <Heading fontSize="md">{`Lesson ${lessonKey + 1}: ${
                          lesson?.title
                        }`}</Heading>
                      </HStack>
                      <VStack>
                        {lesson?.items?.map((slide: any, slideKey: number) => {
                          return slide?.section ? (
                            <Box key={slideKey}>
                              <AnimatedPressable
                                onPress={() => handleLesson(lesson)}
                              >
                                <HStack
                                  px="5"
                                  py="3"
                                  space="3"
                                  alignItems="center"
                                  pl={isCurrentSlide(lessonKey, slideKey) ? 4 : 5}
                                  borderLeftWidth={
                                    isCurrentSlide(lessonKey, slideKey) ? 4 : 0
                                  }
                                  borderLeftColor="tertiary.400"
                                >
                                  <Icon
                                    size="lg"
                                    as={MaterialCommunityIcons}
                                    name="crown"
                                    color={
                                      isSlideComplete(lessonKey, slideKey)
                                        ? "tertiary.400"
                                        : "gray.500"
                                    }
                                  />
                                  <VStack>
                                    {isCurrentSlide(lessonKey, slideKey) && (
                                      <Text color="tertiary.400" bold>
                                        Up next for you
                                      </Text>
                                    )}
                                    <Text fontSize="md">{slide.section}</Text>
                                  </VStack>
                                </HStack>
                              </AnimatedPressable>
                            </Box>
                          ) : null;
                        })}
                      </VStack>
                    </VStack>

                    {/* Quiz */}
                    {lesson?.quiz && (
                      <VStack
                        borderWidth="1"
                        borderColor="gray.200"
                        mb="5"
                        bg="white"
                      >
                        <HStack
                          p="5"
                          space="3"
                          borderBottomWidth="1"
                          borderBottomColor="gray.200"
                          alignItems="center"
                        >
                          <Icon
                            size="lg"
                            as={MaterialCommunityIcons}
                            name="trophy"
                            color="tertiary.600"
                          />
                          <VStack>
                            <Heading fontSize="md">{lesson?.quiz?.name}</Heading>
                            <Text>{lesson?.quiz?.section}</Text>
                          </VStack>
                        </HStack>
                        <Box p="5">
                          <Button
                            w="full"
                            variant="outline"
                            onPress={() => handleQuiz(lessonKey)}
                          >
                            <Text color="tertiary.600" bold>
                              Start
                            </Text>
                          </Button>
                        </Box>
                      </VStack>
                    )}
                  </Box>
                );
              })}
            </Box>
          </ScrollView>
        </Box>
      </>
    );
  };

  const Topics = () => {
    return (
      <>
        <HeaderNav title={module?.title} onPress={() => setScreen("main")} />
        <Box
          pt="6"
          px="3"
          flex="1"
          size="full"
          bg="gray.100"
          borderTopRadius="3xl"
          shadow="6"
        >
          <ScrollView opacity={show ? 1 : 0}>
            <Box safeAreaX>
              {module?.topics?.map((topic: any, key: number) => {
                return (
                  <VStack
                    key={key}
                    borderWidth="1"
                    borderColor="gray.200"
                    borderTopWidth={isCurrentTopic(key) ? 4 : 1}
                    borderTopColor={
                      isCurrentTopic(key) ? "tertiary.400" : "gray.200"
                    }
                    mb="5"
                    bg="white"
                  >
                    <AnimatedPressable onPress={() => handleTopic(topic, key)}>
                      <HStack
                        px="5"
                        py="3"
                        space="4"
                        borderBottomWidth="1"
                        borderBottomColor="gray.200"
                      >
                        <Center
                          borderRadius="full"
                          size="12"
                          bg={
                            !!!module?.topics ? "tertiary.100" : "tertiary.600"
                          }
                        >
                          <Icon
                            size="lg"
                            as={MaterialCommunityIcons}
                            name={topic?.icon || "alert-circle-outline"}
                            color="white"
                          />
                        </Center>
                        <HStack
                          w="90%"
                          alignItems="center"
                          justifyContent="space-between"
                        >
                          <VStack>
                            {isCurrentTopic(key) && (
                              <Text color="tertiary.400" bold>
                                Up next for you
                              </Text>
                            )}
                            <Heading
                              fontSize="md"
                              color={!!!module?.topics ? "gray.300" : "black"}
                            >
                              {topic?.title}
                            </Heading>
                            <Text>0% Progress</Text>
                          </VStack>
                          <Icon
                            size="sm"
                            as={MaterialIcons}
                            name="arrow-forward-ios"
                            color="gray.500"
                          />
                        </HStack>
                      </HStack>
                    </AnimatedPressable>
                    <AnimatedPressable onPress={() => handleTopic(topic, key)}>
                      <VStack space="2" p="5">
                        {topic?.lessons?.map((lesson: any, key: number) => {
                          return (
                            <Text key={key} color="gray.500" fontSize="md">
                              {lesson?.title}
                            </Text>
                          );
                        })}
                      </VStack>
                    </AnimatedPressable>
                  </VStack>
                );
              })}
            </Box>
          </ScrollView>
        </Box>
      </>
    );
  };

  const Main = () => {
    return (
      <>
        <HeaderNav title={data?.title} onPress={() => navigation.goBack()} />
        <Box
          pt="3"
          px="3"
          flex="1"
          size="full"
          bg="white"
          borderTopRadius="3xl"
          shadow="6"
        >
          <ScrollView opacity={show ? 1 : 0}>
            <Box safeAreaX>
              {data?.items?.map((module: any, key: number) => {
                return (
                  <AnimatedPressable
                    key={key}
                    disabled={!!!module?.topics}
                    onPress={() => handleModule(module, key)}
                  >
                    <Box
                      w="full"
                      borderBottomWidth="1"
                      borderBottomColor="gray.200"
                      py="3"
                    >
                      <HStack key={key} p="1" space="4" alignItems="center">
                        <Box
                          borderRadius="full"
                          p="3"
                          bg={
                            !!!module?.topics ? "gray.200" : "tertiary.600"
                          }
                        >
                          <Icon
                            size="lg"
                            as={Entypo}
                            name="open-book"
                            color="white"
                          />
                        </Box>
                        <HStack justifyContent="space-between" w="90%">
                          <Text
                            fontSize="md"
                            color={!!!module?.topics ? "gray.300" : "black"}
                          >
                            {module?.title}
                          </Text>
                          <Icon
                            size="sm"
                            as={MaterialIcons}
                            name="arrow-forward-ios"
                            color={!!!module?.topics ? "gray.200" : "gray.500"}
                          />
                        </HStack>
                      </HStack>
                    </Box>
                  </AnimatedPressable>
                );
              })}
            </Box>
          </ScrollView>
        </Box>
      </>
    );
  };

  return (
    <Box size="full" bg="tertiary.600">
      {DynamicScreen()}
    </Box>
  );
};

export default TableOfContents;
