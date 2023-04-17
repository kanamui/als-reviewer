import React from "react";
import { useWindowDimensions } from "react-native";
import { ILayout } from "../models/components/ILayout";
import { Box, Button, HStack, Text, VStack } from "native-base";
import RenderHTML from "react-native-render-html";
import HeaderNav from "./HeaderNav";

const Layout = ({
  header,
  subTitle,
  kicker,
  title,
  longText,
  image,
  cta,
}: ILayout) => {
  const { width } = useWindowDimensions();

  return (
    <>
      <HeaderNav title={subTitle} onPress={header?.onPress} />
      {kicker && (
        <VStack w="full" alignItems="center" mb="2">
          <Text color="primary.600">{kicker}</Text>
        </VStack>
      )}
      <Box px="6" pb="6" flex="1">
        <VStack flex="1" alignItems="center" justifyContent="space-between">
          <HStack
            flex="1"
            justifyContent="center"
            space="3"
            w={image ? "full" : "80%"}
          >
            <VStack>
              {title && <Text bold>{title}</Text>}
              {longText && (
                <RenderHTML contentWidth={width} source={{ html: longText }} />
              )}
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

export default Layout;
