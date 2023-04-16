import React from "react";
import { IGeneric } from "../models/components/IGeneric";
import { Box, Button, HStack, Text, VStack } from "native-base";
import HeaderNav from "./HeaderNav";

const Generic = ({
  header,
  subTitle,
  kicker,
  title,
  longText,
  cta,
}: IGeneric) => {
  return (
    <>
      <HeaderNav title={subTitle} onPress={header?.onPress} />
      <Box py="6" flex="1">
        <VStack flex="1" alignItems="center" justifyContent="space-between">
          {kicker && (
            <VStack w="full" alignItems="center" mb="4">
              <Text color="primary.600">{kicker}</Text>
            </VStack>
          )}

          <HStack flex="1" justifyContent="center" space="3">
            <VStack space="2">
              {title && <Text bold>{title}</Text>}
              {longText && <Text>{longText}</Text>}
            </VStack>
          </HStack>

          {cta && (
            <Button w="32" onPress={cta?.onPress}>
              <Text color="white" bold>
                {cta?.title}
              </Text>
            </Button>
          )}
        </VStack>
      </Box>
    </>
  );
};

export default Generic;
