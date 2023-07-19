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
import { randomizeArray } from "../logic/Utilities";

const Quiz: React.FC = ({ navigation, route }: any) => {
  // Variables
  const { data, final, assess, module, topic, lesson, onComplete } =
    route.params;
  const [questions] = useState(randomizeArray(data?.items || [], 10));

  const total = questions.length;

  // Hooks
  const { width } = useWindowDimensions();
  const {
    modules,
    slideIncrement,
    setTopicComplete,
    setAssessmentScore,
    setQuizScore,
    setCurrentTopic,
  } = useStore();

  // States
  const [index, setIndex] = useState<number>(0);
  const [score, setScore] = useState<number>(0);
  const [answer, setAnswer] = useState<string>("");
  const [answers, setAnswers] = useState<string[]>(Array(10).fill(""));
  const [show, setShow] = useState<boolean>(true);
  const [showResult, setShowResult] = useState<boolean>(false);
  const [showConfirmModal, setShowConfirmModal] = useState<boolean>(false);
  const [showResultModal, setShowResultModal] = useState<boolean>(false);

  // Handlers
  const handleRadio = (value: any) => {
    setAnswer(value);
  };

  const handleComplete = () => {
    if (onComplete) {
      const modTopic = modules[module].topics[topic];
      const modLesson = modTopic.lessons[lesson];
      const score = assess ? modTopic.assessment : modLesson.quiz;
      if (score < 0) onComplete();
    }

    if (assess) {
      setAssessmentScore(module, topic, score);
    } else {
      setQuizScore(module, topic, lesson, score);
    }
  };

  // Functions
  const nextScreen = () => {
    const item = questions?.[index];

    // record answer
    setAnswers((prev) => {
      const updated = [...prev];
      updated[index] = item?.choices?.[answer];
      return updated;
    });

    // check if answer is correct
    if (item?.choices?.[answer] === item?.answer) {
      setScore(score + 1);
    }

    if (index < total - 1) {
      // next slide
      setAnswer("");
      setIndex(index + 1);
    } else if (!item) {
      // show confirm submission modal
      setShowConfirmModal(true);
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
  }, [index, questions]);

  useEffect(() => {
    // proceed to next slide after quiz
    if (showResult) {
      const slide =
        modules[module].topics[topic].lessons?.[lesson + 1]?.slide || -1;
      if (slide < 0) slideIncrement(module, topic, lesson + 1);
    }
    // if final quiz, proceed to next topic
    if (final && showResult) {
      setTopicComplete(module, topic);
      setCurrentTopic(module, topic + 1);
    }
  }, [showResult]);

  return (
    <>
      <Box size="full" bg="tertiary.600">
        <HeaderNav title={data?.header} showBack={false} />
        {showResult ? (
          <QuizResult
            score={score}
            total={total}
            cta={
              total > 0
                ? {
                    onPress: () => setShowResultModal(true),
                    title: "See result",
                  }
                : undefined
            }
            onComplete={handleComplete}
          />
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
                        {questions?.[index]?.title && (
                          <Text>{`${index + 1}. ${
                            questions?.[index].title
                          }`}</Text>
                        )}
                        <Image
                          resizeMode="contain"
                          source={IMAGES[questions?.[index]?.image]}
                          alt={"question"}
                        />
                        <Radio.Group
                          name="question"
                          value={answer}
                          onChange={handleRadio}
                        >
                          <Flex
                            flexWrap="wrap"
                            h="70px"
                            justifyContent="space-between"
                          >
                            {questions?.[index]?.choices?.map(
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
                  onPress={data?.items && nextScreen}
                  isDisabled={!!!answer && !!data?.items}
                >
                  <Text color="white" bold>
                    {data?.items
                      ? index === total - 1
                        ? "Done"
                        : "Next question"
                      : "Submit"}
                  </Text>
                </Button>
              </HStack>
            </HStack>
          </Box>
        )}
      </Box>

      {/* Confirm submission modal */}
      <Modal
        isOpen={showConfirmModal}
        onClose={() => setShowConfirmModal(false)}
      >
        <Modal.Content>
          <Modal.CloseButton />
          <Modal.Header>Confirm Submission</Modal.Header>
          <Modal.Body>Are you sure you want to submit your answer?</Modal.Body>
          <Modal.Footer>
            <Button.Group space={2}>
              <Button
                variant="ghost"
                onPress={() => {
                  setShowConfirmModal(false);
                }}
              >
                Cancel
              </Button>
              <Button
                onPress={() => {
                  setShowConfirmModal(false);
                  setShowResult(true);
                }}
              >
                Submit
              </Button>
            </Button.Group>
          </Modal.Footer>
        </Modal.Content>
      </Modal>

      {/* Answer result modal */}
      <Modal isOpen={showResultModal} onClose={() => setShowResultModal(false)}>
        <Modal.Content maxW="90%" maxH="80%">
          <Modal.CloseButton />
          <Modal.Header>
            <Text fontSize="md" bold>
              Result ({score}/{total})
            </Text>
          </Modal.Header>
          <Modal.Body>
            <VStack space="4">
              {answers.map((el: string, key: number) => {
                return (
                  <Box key={key}>
                    <Text mb={questions?.[key]?.image ? 2 : 0}>
                      <Text bold>{key + 1}</Text>.{" "}
                      {questions?.[key]?.image ? (
                        <Image
                          resizeMode="contain"
                          source={IMAGES[questions?.[key]?.image]}
                          alt={"question"}
                        />
                      ) : (
                        questions?.[key]?.title
                      )}
                    </Text>
                    <Text>
                      <Text bold>Your answer:</Text> {el}
                    </Text>
                    {el === questions?.[key]?.answer ? (
                      <Text color="tertiary.600">
                        <Text bold>Result:</Text> Correct
                      </Text>
                    ) : (
                      <Text color="red.600">
                        <Text bold>Result:</Text> Wrong (Answer:{" "}
                        {questions?.[key]?.answer})
                      </Text>
                    )}
                  </Box>
                );
              })}
            </VStack>
          </Modal.Body>
          <Modal.Footer>
            <Button onPress={() => setShowResultModal(false)}>Close</Button>
          </Modal.Footer>
        </Modal.Content>
      </Modal>
    </>
  );
};

export default Quiz;
