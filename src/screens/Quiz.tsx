import React, { useEffect, useState } from "react";
import { useWindowDimensions } from "react-native";
import {
  Box,
  Button,
  Flex,
  HStack,
  Image,
  Radio,
  Text,
  VStack,
} from "native-base";
import HeaderNav from "../components/HeaderNav";
import { IMAGES } from "../logic/constants/images.constants";
import RenderHTML from "react-native-render-html";
import QuizResult from "../components/QuizResult";

const Quiz: React.FC = ({ navigation, route }: any) => {
  // Variables
  const { data } = route.params;
  const total = data?.items?.length || 0;

  // Hooks
  const { width } = useWindowDimensions();

  // States
  const [index, setIndex] = useState<number>(0);
  const [score, setScore] = useState<number>(0);
  const [answer, setAnswer] = useState<string>("");
  const [show, setShow] = useState<boolean>(true);
  const [showResult, setShowResult] = useState<boolean>(false);

  // Handlers
  const handleRadio = (value: any) => {
    setAnswer(value);
  };

  const handleNext = () => {
    const item = data?.items?.[index];
    if (item && item?.choices?.[answer] === item?.answer) {
      setScore(score + 1);
    }

    if (index < total - 1) {
      setAnswer("");
      setIndex(index + 1);
    } else {
      setShowResult(true);
    }
  };

  // Effects
  useEffect(() => {
    setShow(false);
    const timeout = setTimeout(() => setShow(true));
    return () => clearTimeout(timeout);
  }, [index]);

  return (
    <Box size="full" bg="tertiary.600">
      <HeaderNav title={data?.header} onPress={() => navigation.goBack()} />
      {showResult ? (
        <QuizResult score={score} total={total} navigation={navigation} />
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
                {data?.title && (
                  <RenderHTML
                    contentWidth={width}
                    source={{ html: data.title }}
                  />
                )}
                {data?.items ? (
                  <VStack flex="1" pt="4" space="4" alignItems="center">
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
                  </VStack>
                ) : data?.longText ? (
                  <RenderHTML
                    contentWidth={width}
                    source={{ html: data?.longText }}
                  />
                ) : null}
              </>
            )}
          </Box>

          <HStack justifyContent="space-between">
            <Box justifyContent="flex-end">
              {data?.items && (
                <Text color="gray.400">{`${index + 1} / ${total}`}</Text>
              )}
            </Box>
            <HStack alignSelf="flex-end" space="3" mt="3">
              <Button
                w="32"
                alignSelf="flex-end"
                onPress={handleNext}
                isDisabled={!!!answer && !!data?.items}
              >
                <Text color="white" bold>
                  Next
                </Text>
              </Button>
            </HStack>
          </HStack>
        </Box>
      )}
    </Box>
  );
};

export default Quiz;
