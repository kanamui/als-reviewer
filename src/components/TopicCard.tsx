import React from "react";
import { Box, Center, HStack, Heading, Icon, Text, VStack } from "native-base";
import { InterfaceBoxProps } from "native-base/lib/typescript/components/primitives/Box";
import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import { ITopicCard } from "../models/components/ITopicCard";
import AnimatedPressable from "./AnimatedPressable";

const TopicCard: React.FC<ITopicCard & InterfaceBoxProps> = ({
  data,
  active,
  complete,
  progress = 0,
  onPress,
  ...props
}) => {
  return (
    <Box
      borderWidth="1"
      borderColor="gray.200"
      borderTopWidth={active && !complete ? 4 : 1}
      borderTopColor={active && !complete ? "tertiary.400" : "gray.200"}
      mb="5"
      bg="white"
      {...props}
    >
      <AnimatedPressable onPress={onPress} disabled={!(active || complete)}>
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
            bg={active || complete ? "tertiary.600" : "gray.300"}
          >
            <Icon
              size="lg"
              as={MaterialCommunityIcons}
              name={data?.icon || "alert-circle-outline"}
              color="white"
            />
          </Center>
          <HStack w="90%" alignItems="center" justifyContent="space-between">
            <VStack>
              {/* {active && !complete && (
                <Text color="tertiary.400" bold>
                  Up next for you
                </Text>
              )} */}
              <Heading
                fontSize="md"
                color={active || complete ? "black" : "gray.300"}
              >
                {data?.title}
              </Heading>
              <Text
                color={
                  complete ? "tertiary.400" : active ? "black" : "gray.300"
                }
              >
                {complete ? "Completed" : `${progress}% Progress`}
              </Text>
            </VStack>
            <Icon
              size="sm"
              as={MaterialIcons}
              name="arrow-forward-ios"
              color={active || complete ? "gray.500" : "gray.300"}
            />
          </HStack>
        </HStack>
      </AnimatedPressable>
      <AnimatedPressable onPress={onPress} disabled={!(active || complete)}>
        <VStack space="2" p="5">
          {data?.lessons?.map((lesson: any, key: number) => {
            return (
              <Text
                key={key}
                color={active || complete ? "gray.500" : "gray.300"}
                fontSize="md"
              >
                {lesson?.title}
              </Text>
            );
          })}
        </VStack>
      </AnimatedPressable>
    </Box>
  );
};

export default TopicCard;
