import React, { useEffect, useState } from "react";
import { useWindowDimensions } from "react-native";
import useStore from "../store/store";
import {
  AspectRatio,
  Box,
  Button,
  Flex,
  HStack,
  Image,
  Modal,
  Radio,
  ScrollView,
  Text,
  VStack,
} from "native-base";
import HeaderNav from "../components/HeaderNav";
import { IMAGES } from "../logic/constants/images.constants";
import RenderHTML from "react-native-render-html";
import QuizResult from "../components/QuizResult";
import PopupCard from "../components/PopupCard";

const Quiz: React.FC = ({ navigation, route }: any) => {
  // Variables
  const { data, final, assess, module, topic, lesson } = route.params;
  const total = data?.items?.length || 0;

  // Hooks
  const { width } = useWindowDimensions();
  const {
    modules,
    setSlide,
    setTopicComplete,
    setAssessmentScore,
    setQuizScore,
    setCurrentTopic,
  } = useStore();

  // States
  const [index, setIndex] = useState<number>(0);
  const [score, setScore] = useState<number>(0);

  const [answer, setAnswer] = useState<string>("");
  const [checked, setChecked] = useState<boolean>(false);
  const [correct, setCorrect] = useState<boolean>(false);

  const [show, setShow] = useState<boolean>(true);
  const [showResult, setShowResult] = useState<boolean>(false);
  const [showModal, setShowModal] = useState<boolean>(false);

  // Handlers
  const handleRadio = (value: any) => {
    setAnswer(value);
  };

  // Functions
  const checkAnswer = () => {
    const item = data?.items?.[index];
    if (item?.choices?.[answer] === item?.answer) {
      setScore(score + 1);
      setCorrect(true);
    } else {
      setCorrect(false);
    }
    setChecked(true);
  };

  const nextScreen = () => {
    const item = data?.items?.[index];

    if (index < total - 1) {
      // next slide
      setAnswer("");
      setChecked(false);
      setIndex(index + 1);
    } else if (!item) {
      // show confirm submission modal
      setShowModal(true);
    } else {
      // show result screen
      setShowResult(true);
    }
  };

  // Effects
  useEffect(() => {
    setShow(false);
    const timeout = setTimeout(() => setShow(true));
    return () => clearTimeout(timeout);
  }, [index, checked]);

  useEffect(() => {
    if (showResult) {
      if (assess) {
        setAssessmentScore(module, topic, score);
      } else {
        setQuizScore(module, topic, lesson, score);
      }
    }
  }, [showResult]);

  useEffect(() => {
    if (showResult) {
      const slide =
        modules[module].topics[topic].lessons?.[assess ? 0 : lesson + 1]
          ?.slide || -1;
      if (slide < 0) setSlide(module, topic, assess ? 0 : lesson + 1, 0);
    }
  }, [showResult]);

  useEffect(() => {
    if (final && showResult) {
      setTopicComplete(module, topic);
    }
  }, [showResult]);

  useEffect(() => {
    if (final && showResult) {
      setCurrentTopic(module, topic + 1);
    }
  }, [showResult]);

  return (
    <>
      <Box size="full" bg="tertiary.600">
        <HeaderNav title={data?.header} onPress={() => navigation.goBack()} />
        {showResult ? (
          <QuizResult score={score} total={total} />
        ) : (
          <Box
            px="5"
            pt="4"
            pb="3"
            flex="1"
            bg="white"
            borderTopRadius="3xl"
            shadow="6"
            safeAreaX
          >
            {data?.kicker && (
              <Text color="primary.600" mb="2">
                {data.kicker}
              </Text>
            )}
            <Box flex="1">
              {show && (
                <>
                  {data?.title && data?.items && (
                    <Box mb="4">
                      <RenderHTML
                        contentWidth={width}
                        source={{ html: data.title }}
                      />
                    </Box>
                  )}
                  <VStack flex="1" space="4" alignItems="center">
                    {data?.items ? (
                      <>
                        {data?.items?.[index]?.title && (
                          <Text>{data.items[index].title}</Text>
                        )}
                        <Image
                          resizeMode="contain"
                          source={IMAGES[data?.items?.[index]?.image]}
                          alt={"question"}
                        />
                        <Radio.Group
                          name="question"
                          value={answer}
                          onChange={handleRadio}
                          isReadOnly={checked}
                        >
                          <Flex
                            flexWrap="wrap"
                            h="70px"
                            justifyContent="space-between"
                          >
                            {data?.items?.[index]?.choices.map(
                              (choice: string, key: number) => {
                                return (
                                  <Radio key={key} value={`${key}`} m="1">
                                    <Text mr="16">{choice}</Text>
                                  </Radio>
                                );
                              }
                            )}
                          </Flex>
                        </Radio.Group>
                      </>
                    ) : (
                      <HStack
                        flex="1"
                        justifyContent="center"
                        space="6"
                        w="full"
                      >
                        {data?.image && (
                          <>
                            {data?.title || data?.longText ? (
                              <AspectRatio h="full" ratio={1}>
                                <Image
                                  size="full"
                                  resizeMode="contain"
                                  source={IMAGES[data?.image]}
                                  alt={data?.image}
                                />
                              </AspectRatio>
                            ) : (
                              <Image
                                size="full"
                                resizeMode="contain"
                                source={IMAGES[data?.image]}
                                alt={data?.image}
                              />
                            )}
                          </>
                        )}

                        {(data?.title || data?.longText) && (
                          <VStack w={data?.image ? "50%" : "full"}>
                            <ScrollView>
                              <VStack space="2">
                                {data.title && (
                                  <RenderHTML
                                    contentWidth={width}
                                    source={{ html: data.title }}
                                  />
                                )}
                                {data.longText && (
                                  <RenderHTML
                                    contentWidth={width}
                                    source={{ html: data.longText }}
                                  />
                                )}
                              </VStack>
                            </ScrollView>
                          </VStack>
                        )}
                      </HStack>
                    )}
                  </VStack>
                </>
              )}

              {/* Answer result popup */}
              {checked && (
                <PopupCard
                  correct={correct}
                  answer={data?.items?.[index]?.answer}
                />
              )}
            </Box>

            <HStack justifyContent="space-between">
              {/* Slide progress */}
              <Box justifyContent="flex-end">
                {data?.items && (
                  <Text color="gray.400">{`${index + 1} / ${total}`}</Text>
                )}
              </Box>

              {/* CTA */}
              <HStack alignSelf="flex-end" space="3" mt="3">
                <Button
                  w="32"
                  alignSelf="flex-end"
                  onPress={data?.items && !checked ? checkAnswer : nextScreen}
                  isDisabled={!!!answer && !!data?.items}
                >
                  <Text color="white" bold>
                    {data?.items
                      ? checked
                        ? "Next question"
                        : "Check answer"
                      : "Submit"}
                  </Text>
                </Button>
              </HStack>
            </HStack>
          </Box>
        )}
      </Box>

      {/* Confirm submission modal */}
      <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
        <Modal.Content>
          <Modal.CloseButton />
          <Modal.Header>Confirm Submission</Modal.Header>
          <Modal.Body>Are you sure you want to submit your answer?</Modal.Body>
          <Modal.Footer>
            <Button.Group space={2}>
              <Button
                variant="ghost"
                onPress={() => {
                  setShowModal(false);
                }}
              >
                Cancel
              </Button>
              <Button
                onPress={() => {
                  setShowModal(false);
                  setShowResult(true);
                }}
              >
                Submit
              </Button>
            </Button.Group>
          </Modal.Footer>
        </Modal.Content>
      </Modal>
    </>
  );
};

export default Quiz;
