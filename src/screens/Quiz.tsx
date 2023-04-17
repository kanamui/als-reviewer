import React from "react";
import { Box, Center, Heading } from "native-base";

const Quiz: React.FC = ({ navigation, route }: any) => {
  return (
    <Box size="full" bg="white" safeAreaX>
      <Center flex="1">
        <Heading>Quiz</Heading>
      </Center>
    </Box>
  );
};

export default Quiz;
