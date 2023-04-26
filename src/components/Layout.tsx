import React, { useEffect, useState } from "react";
import { useWindowDimensions } from "react-native";
import { IMAGES } from "../logic/constants/images.constants";
import { ILayout } from "../models/components/ILayout";
import {
  AspectRatio,
  Box,
  Button,
  HStack,
  Image,
  ScrollView,
  Text,
  VStack,
} from "native-base";
import RenderHTML from "react-native-render-html";
import HeaderNav from "./HeaderNav";

const Layout = ({
  header,
  subTitle,
  kicker,
  title,
  longText,
  image,
  page,
  cta,
}: ILayout) => {
  const { width } = useWindowDimensions();
  const [show, setShow] = useState<boolean>(true);

  useEffect(() => {
    setShow(false);
    const refresh = setTimeout(() => setShow(true));
    return () => clearInterval(refresh);
  }, [image]);

  return (
    <>
      <HeaderNav title={subTitle} onPress={header?.onPress} />
      {kicker && (
        <VStack w="full" ml="52px">
          <Text color="primary.600">{kicker}</Text>
        </VStack>
      )}

      <Box px="6" py="3" flex="1">
        <VStack flex="1" alignItems="center" justifyContent="space-between">
          {show && (
            <HStack
              flex="1"
              justifyContent="center"
              space="6"
              w={image ? "full" : "80%"}
            >
              {image && (
                <>
                  {(title || longText) ? (
                    <AspectRatio h="full" ratio={1}>
                      <Image
                        size="full"
                        resizeMode="contain"
                        source={IMAGES[image]}
                        alt={image}
                      />
                    </AspectRatio>
                  ) : (
                    <Image
                      size="full"
                      resizeMode="contain"
                      source={IMAGES[image]}
                      alt={image}
                    />
                  )}
                </>
              )}

              {(title || longText) && (
                <Box w={image ? "50%" : "full"}>
                  <ScrollView size="full">
                    <VStack space="1">
                      {title && (
                        <RenderHTML
                          contentWidth={width}
                          source={{ html: `<b>${title}</b>` }}
                        />
                      )}
                      {longText && (
                        <RenderHTML
                          contentWidth={width}
                          source={{ html: longText }}
                        />
                      )}
                    </VStack>
                  </ScrollView>
                </Box>
              )}
            </HStack>
          )}
        </VStack>

        <HStack justifyContent="space-between">
          <Box justifyContent="center">
            {page && (
              <Text color="gray.400">{page}</Text>
            )}
          </Box>
          <HStack alignSelf="flex-end" space="3" mt="3">
            {cta?.map((btn: any, key: number) => {
              return (
                <Button key={key} w="32" onPress={btn?.onPress} size="xs">
                  <Text color="white" bold>
                    {btn?.title}
                  </Text>
                </Button>
              );
            })}
          </HStack>
        </HStack>
      </Box>
    </>
  );
};

export default Layout;
