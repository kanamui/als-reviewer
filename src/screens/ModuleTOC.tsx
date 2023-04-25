import React, { useEffect, useState } from "react";
import {
  AspectRatio,
  Box,
  Button,
  Center,
  Flex,
  HStack,
  Heading,
  Image,
  Modal,
  Text,
  VStack,
} from "native-base";
import HeaderNav from "../components/HeaderNav";
import Layout from "../components/Layout";
import { IMAGES } from "../logic/constants/images.constants";

const ModuleTOC: React.FC = ({ navigation, route }: any) => {
  // States
  const [module, setModule] = useState<any>();
  const [topic, setTopic] = useState<any>();
  const [lesson, setLesson] = useState<any>();
  const [lessonIndex, setLessonIndex] = useState<number>(0);
  const [screen, setScreen] = useState<string | undefined>();
  const [showModal, setShowModal] = useState<boolean>(false);
  const [show, setShow] = useState<boolean>(true);

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
      setScreen(topic?.longText ? "intro" : "lessons");
    }
  };

  const handleLesson = (lesson: any, index: number) => {
    setLesson(lesson);
    setLessonIndex(index);

    if (topic?.preQuiz && index === 0) {
      setShowModal(true);
    } else {
      navigation.navigate("Module", {
        data: lesson,
        quiz: lessonIndex === topic?.lessons?.length - 1 ? topic?.quiz : null,
      });
    }
  };

  const handleModal = (assess: boolean = false) => {
    setShowModal(false);

    if (assess) {
      navigation.navigate("Quiz", {
        data: topic?.preQuiz,
        quiz: lessonIndex === topic?.lessons?.length - 1 ? topic?.quiz : null,
        lesson,
        assess: true,
      });
    } else {
      navigation.navigate("Module", {
        data: lesson,
        quiz: lessonIndex === topic?.lessons?.length - 1 ? topic?.quiz : null,
      });
    }
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

  // Effects
  useEffect(() => {
    // force reload cached images
    setShow(false);
    const timeout = setTimeout(() => setShow(true));
    return () => clearTimeout(timeout);
  }, [screen]);

  const Lessons = () => {
    return (
      <>
        <HeaderNav
          title={`${module?.title} LESSONS`}
          onPress={() => setScreen("topics")}
        />
        <Box px="6" py="3" flex="1">
          <HStack
            flex="1"
            alignItems="center"
            justifyContent="center"
            space="2"
          >
            {topic?.image && (
              <AspectRatio h="full" ratio={1}>
                <Image
                  size="full"
                  resizeMode="contain"
                  source={IMAGES[topic.image]}
                  alt={"topic"}
                />
              </AspectRatio>
            )}
            <VStack
              space="2"
              w={topic?.image ? "50%" : "full"}
              alignItems="center"
            >
              {topic?.lessons?.map((lesson: any, key: number) => {
                return (
                  <Box key={key}>
                    <Button
                      w="64"
                      h="16"
                      rounded="full"
                      onPress={() => handleLesson(lesson, key)}
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
      <Layout
        header={{
          onPress: () => setScreen("topics"),
        }}
        subTitle={topic?.subTitle}
        title={topic?.longText}
        image={topic?.image}
        cta={[
          {
            title: "PROCEED",
            onPress: () => setScreen("lessons"),
          },
        ]}
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
        <Box px="6" py="3" flex="1">
          <HStack
            flex="1"
            alignItems="center"
            justifyContent="center"
            space="2"
          >
            {module?.image && (
              <AspectRatio h="full" ratio={1}>
                <Image
                  size="full"
                  resizeMode="contain"
                  source={IMAGES[module.image]}
                  alt={"topic"}
                />
              </AspectRatio>
            )}
            <VStack
              space="2"
              w={module?.image ? "50%" : "full"}
              alignItems="center"
            >
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
      <Box pt="6" pb="3" flex="1">
        <VStack flex="1" alignItems="center">
          <VStack space="2" alignItems="center">
            <Heading size="md" maxW="64" textAlign="center">
              {data?.title}
            </Heading>
            <Heading size="sm">{data?.subTitle}</Heading>
          </VStack>
          <Center flex="1">
            <Flex flexWrap="wrap" h="220px">
              {data?.items?.map((module: any, key: number) => {
                return (
                  <Box key={key} p="1">
                    <Button
                      w="56"
                      h="16"
                      rounded="full"
                      onPress={() => handleModule(module)}
                      isDisabled={!!!module?.topics}
                    >
                      <Text textAlign="center" color="white" bold>
                        {module?.title}
                      </Text>
                    </Button>
                  </Box>
                );
              })}
            </Flex>
          </Center>
        </VStack>
      </Box>
    );
  };

  return (
    <>
      <Box size="full" bg="white" safeAreaX>
        {show && DynamicScreen()}
      </Box>
      <Modal isOpen={showModal} onClose={handleModal}>
        <Modal.Content>
          <Modal.CloseButton />
          <Modal.Header>Pre-Assessment</Modal.Header>
          <Modal.Body>
            <Text>
              Do you want to take the Pre-Assessment first before proceeding
              with the lessons?
            </Text>
          </Modal.Body>
          <Modal.Footer>
            <Button.Group space={2}>
              <Button
                variant="ghost"
                colorScheme="error"
                onPress={() => {
                  handleModal(false);
                }}
              >
                NO
              </Button>
              <Button
                variant="ghost"
                colorScheme="success"
                onPress={() => {
                  handleModal(true);
                }}
              >
                YES
              </Button>
            </Button.Group>
          </Modal.Footer>
        </Modal.Content>
      </Modal>
    </>
  );
};

export default ModuleTOC;
