import React from "react";
import { InterfaceBoxProps } from "native-base/lib/typescript/components/primitives/Box";
import {
  Box,
  Button,
  HStack,
  Heading,
  Icon,
  IconButton,
  Text,
  VStack,
} from "native-base";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { ILessonCard, ISection } from "../models/components/ILessonCard";
import AnimatedPressable from "./AnimatedPressable";

const LessonCard: React.FC<ILessonCard & InterfaceBoxProps> = ({
  score,
  title,
  longText,
  icon,
  sections,
  cta,
  ctaComplete = false,
  disabled = false,
  ...props
}) => {
  const isDisabled = disabled
    ? true
    : sections
    ? !sections?.find((s) => s?.active || s?.complete)
    : false;

  // Handlers
  const handleStart = () => {
    const complete = sections?.filter(
      (section: ISection) => section?.complete === true
    ).length;
    if (complete === sections?.length && sections?.[0]?.onPress) {
      // start from beginning
      sections[0].onPress();
    } else {
      const active = sections?.find((section: ISection) => section?.active);
      // resume lesson
      if (active?.onPress) active.onPress();
    }
  };

  // Functions
  const isSectionDisabled = (section: ISection) => {
    return (isDisabled || !section?.active) && !section?.complete;
  };

  return (
    <Box borderWidth="1" borderColor="gray.200" mb="5" bg="white" {...props}>
      <HStack
        w="full"
        p="5"
        borderBottomWidth={cta || sections ? 1 : 0}
        borderBottomColor="gray.200"
        alignItems="center"
        justifyContent="space-between"
      >
        <HStack space="3" alignItems="center">
          {icon && (
            <Icon
              size="lg"
              as={MaterialCommunityIcons}
              name={icon}
              color={isDisabled ? "gray.300" : "tertiary.600"}
            />
          )}
          <VStack>
            {score && (
              <Text color="tertiary.400" bold>
                {score}
              </Text>
            )}
            {title && (
              <Heading fontSize="md" color={isDisabled ? "gray.300" : "black"}>
                {title}
              </Heading>
            )}
            {longText && (
              <Text color={isDisabled ? "gray.300" : "black"}>{longText}</Text>
            )}
          </VStack>
        </HStack>
        {sections && (
          <IconButton
            p="1"
            bg="tertiary.600"
            borderRadius="full"
            icon={
              <Icon
                as={MaterialCommunityIcons}
                name="play"
                size="sm"
                color="white"
              />
            }
            onPress={handleStart}
            isDisabled={isDisabled}
          />
        )}
      </HStack>
      {sections?.map((section: ISection, key: number) => {
        return section?.title ? (
          <Box key={key}>
            <AnimatedPressable
              onPress={section?.onPress}
              disabled={isSectionDisabled(section)}
            >
              <HStack
                px="5"
                py="3"
                space="3"
                alignItems="center"
                pl={
                  section?.active && !section?.complete && !isDisabled ? 4 : 5
                }
                borderLeftWidth={
                  section?.active && !section?.complete && !isDisabled ? 4 : 0
                }
                borderLeftColor="tertiary.400"
              >
                <Icon
                  size="lg"
                  as={MaterialCommunityIcons}
                  name="crown"
                  color={
                    isSectionDisabled(section)
                      ? "gray.300"
                      : section?.complete
                      ? "tertiary.400"
                      : "gray.500"
                  }
                />
                <VStack>
                  {section?.active && !section?.complete && !isDisabled && (
                    <Text color="tertiary.400" bold>
                      Up next for you
                    </Text>
                  )}
                  <Text
                    fontSize="md"
                    color={isSectionDisabled(section) ? "gray.300" : "black"}
                  >
                    {section.title}
                  </Text>
                </VStack>
              </HStack>
            </AnimatedPressable>
          </Box>
        ) : null;
      })}
      {cta && (
        <Box p="5">
          <Button
            w="full"
            variant="outline"
            onPress={cta?.onPress}
            isDisabled={ctaComplete || isDisabled}
          >
            <Text color="tertiary.600" bold>
              {ctaComplete ? "Completed" : cta?.title}
            </Text>
          </Button>
        </Box>
      )}
    </Box>
  );
};

export default LessonCard;
