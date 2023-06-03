import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Center,
  Heading,
  PresenceTransition,
  Text,
  VStack,
} from "native-base";
import { InterfaceBoxProps } from "native-base/lib/typescript/components/primitives/Box";
import { useNavigation } from "@react-navigation/native";
import ConfettiCannon from "react-native-confetti-cannon";

interface IQuizResult {
  score: number;
  total: number;
}

const QuizResult: React.FC<IQuizResult & InterfaceBoxProps> = ({
  score,
  total,
  ...props
}) => {
  const navigation = useNavigation();
  const [animate, setAnimate] = useState<boolean>(false);
  const percent = total > 0 ? (100 * score) / total : 0;

  const getMessage = () => {
    let message = "";

    if (percent >= 60 || total === 0) {
      message = `🔥 Awesome! You cleared the test! 🔥`;
    } else {
      message = "You were so close! Good job! 👍";
    }

    return message;
  };

  useEffect(() => {
    setAnimate(true);
  }, []);

  return (
    <Box
      px="5"
      pt="4"
      pb="3"
      flex="1"
      bg="tertiary.600"
      borderTopWidth="1"
      borderColor="gray.400"
      safeAreaX
      {...props}
    >
      <ConfettiCannon
        count={200}
        origin={{ x: -10, y: 0 }}
        autoStart={total > 0 ? percent >= 60 : true}
      />
      <Center flex="1">
        <PresenceTransition
          visible={animate}
          initial={{
            opacity: 0,
            scale: 0,
          }}
          animate={{
            opacity: 1,
            scale: 1,
            transition: {
              duration: 300,
            },
          }}
        >
          <VStack space="2" alignItems="center">
            <Heading fontSize="2xl" color="white">
              {getMessage()}
            </Heading>
            {!!total ? (
              <Text fontSize="md" color="white" bold>
                {score}/{total} correct
              </Text>
            ) : null}
          </VStack>
        </PresenceTransition>
      </Center>
      <Button
        w="32"
        bg="white"
        alignSelf="center"
        onPress={() => navigation.goBack()}
      >
        <Text color="tertiary.600" bold>
          Done
        </Text>
      </Button>
    </Box>
  );
};

export default QuizResult;
