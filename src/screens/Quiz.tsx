import React, { useState } from "react";
import {
  Box,
  Button,
  Flex,
  HStack,
  Heading,
  Radio,
  Text,
  VStack,
} from "native-base";
import HeaderNav from "../components/HeaderNav";

const Quiz: React.FC = ({ navigation, route }: any) => {
  // Variables
  const { data, quiz, lesson, assess } = route.params;
  const total = data?.items?.length || 0;

  // States
  const [index, setIndex] = useState<number>(0);
  const [score, setScore] = useState<number>(0);
  const [answer, setAnswer] = useState<string>("");

  // Handlers
  const handleRadio = (value: any) => {
    setAnswer(value);
  };

  const handleNext = () => {
    if (index < total - 1) {
      const item = data?.items?.[index];
      if (item?.choices?.[answer] === item?.answer) {
        setScore(score + 1);
      }
      setAnswer("");
      setIndex(index + 1);
    }
  };

  const handleExit = () => {
    navigation.goBack();
    if (assess) {
      navigation.navigate("Module", { data: lesson, quiz });
    } else {
      navigation.goBack();
    }
  };

  const Result = () => {
    return (
      <Box px="6" pb="6" flex="1">
        <VStack flex="1" alignItems="center" justifyContent="space-between">
          <VStack space="2" alignItems="center">
            {assess ? (
              <Heading size="md">Pre-Assessment</Heading>
            ) : (
              <Heading size="md">Quiz</Heading>
            )}
            <Heading mb="4">
              Score: {score}/{total}
            </Heading>
            {assess ? (
              <Heading size="md">You may now proceed with the lessons.</Heading>
            ) : (
              <Heading size="md">You may now proceed with the next topic.</Heading>
            )}
          </VStack>

          <Button w="32" onPress={handleExit}>
            <Text color="white" bold>
              PROCEED
            </Text>
          </Button>
        </VStack>
      </Box>
    );
  };

  const Main = () => {
    return (
      <>
        {data?.kicker && (
          <VStack w="full" alignItems="center" mb="2">
            <Text color="primary.600">{data.kicker}</Text>
          </VStack>
        )}
        <Box px="6" pb="6" flex="1">
          <VStack flex="1" alignItems="center" justifyContent="space-between">
            <HStack flex="1" justifyContent="center" space="3" w="80%">
              <VStack space="3" alignItems="center">
                {data?.title && <Text bold>{data.title}</Text>}
                {data?.items?.[index]?.title && (
                  <Text>{data.items[index].title}</Text>
                )}
                <Radio.Group
                  name="question"
                  value={answer}
                  onChange={handleRadio}
                >
                  <Flex flexWrap="wrap" h="80px" justifyContent="space-between">
                    {data?.items?.[index]?.choices.map(
                      (choice: string, key: number) => {
                        return (
                          <Radio key={key} value={`${key}`} m="1">
                            <Text mr="20">{choice}</Text>
                          </Radio>
                        );
                      }
                    )}
                  </Flex>
                </Radio.Group>
              </VStack>
            </HStack>

            <Button w="32" onPress={handleNext} isDisabled={!!!answer}>
              <Text color="white" bold>
                NEXT
              </Text>
            </Button>
          </VStack>
        </Box>
      </>
    );
  };

  return (
    <Box size="full" bg="white" safeAreaX>
      <HeaderNav title={data?.header} onPress={() => navigation.goBack()} />
      {index < total - 1 ? Main() : Result()}
    </Box>
  );
};

export default Quiz;
