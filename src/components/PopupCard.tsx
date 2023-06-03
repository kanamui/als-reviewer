import { useState } from "react";
import {
  Box,
  CloseIcon,
  HStack,
  Icon,
  PresenceTransition,
  Pressable,
  Text,
  VStack,
} from "native-base";
import { MaterialCommunityIcons } from "@expo/vector-icons";

interface IPopupCard {
  correct?: boolean;
  answer?: string;
}

const PopupCard = ({ correct, answer }: IPopupCard) => {
  const [visible, setVisible] = useState(true);

  return (
    <PresenceTransition
      visible={visible}
      initial={{
        opacity: 0,
        translateX: 999,
      }}
      animate={{
        opacity: 1,
        translateX: 0,
        transition: {
          duration: 200,
        },
      }}
    >
      <Box
        position="absolute"
        bottom="0"
        right="0"
        minW="80"
        p="4"
        bg="white"
        borderRadius="md"
        shadow="4"
      >
        <HStack alignItems="center" space="2">
          <Box position="absolute" right="-4px" top="-4px">
            <Pressable onPress={() => setVisible(false)} p="1">
              <CloseIcon size="xs" />
            </Pressable>
          </Box>
          <Icon
            as={MaterialCommunityIcons}
            name={correct ? "star" : "emoticon-sad"}
            color={correct ? "yellow.400" : "blue.200"}
            size="5xl"
          />
          <VStack>
            <Text bold>{correct ? "Great work!" : "Not quite"}</Text>
            <Text color="gray.500">
              {correct ? "Keep going and score as you go!" : "Correct answer: "}
              {!correct && (
                <Text underline bold>{answer}</Text>
              )}
            </Text>
          </VStack>
        </HStack>
      </Box>
    </PresenceTransition>
  );
};

export default PopupCard;
