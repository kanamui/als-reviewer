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
  Pressable,
  ScrollView,
  Text,
  VStack,
} from "native-base";
import RenderHTML from "react-native-render-html";
import HeaderNav from "./HeaderNav";
import ImageZoom from "./ImageZoom";

const Layout = ({
  header,
  subTitle,
  kicker,
  title,
  longText,
  image,
  page,
  cta,
  searchData,
}: ILayout) => {
  const { width } = useWindowDimensions();
  const [show, setShow] = useState<boolean>(true);
  const [preview, setPreview] = useState<boolean>(false);

  // Handlers
  const handlePreview = () => {
    if (image) {
      setPreview((prev) => !prev);
    }
  };

  // Effects
  useEffect(() => {
    setShow(false);
    const refresh = setTimeout(() => setShow(true));
    return () => clearInterval(refresh);
  }, [image]);

  return (
    <>
      <HeaderNav
        title={subTitle}
        onPress={header?.onPress}
        searchData={searchData}
        showCoins
        showPet
      />
      <Box
        px="5"
        pt="4"
        pb="3"
        flex="1"
        bg="white"
        borderTopRadius="3xl"
        shadow="6"
        safeAreaX
        zIndex={-1}
      >
        {kicker && <Text color="primary.600">{kicker}</Text>}
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
                  {title || longText ? (
                    <Pressable onPress={handlePreview}>
                      <AspectRatio h="full" ratio={1}>
                        <Image
                          size="full"
                          resizeMode="contain"
                          source={IMAGES[image]}
                          alt={image}
                        />
                      </AspectRatio>
                    </Pressable>
                  ) : (
                    <Pressable size="full" onPress={handlePreview}>
                      <Image
                        size="full"
                        resizeMode="contain"
                        source={IMAGES[image]}
                        alt={image}
                      />
                    </Pressable>
                  )}
                </>
              )}

              {(title || longText) && (
                <Box w={image ? "50%" : "full"} pt="2">
                  <ScrollView>
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
          <Box justifyContent="flex-end">
            {page && <Text color="gray.400">{page}</Text>}
          </Box>
          <HStack alignSelf="flex-end" space="3" mt="3">
            {cta?.map((btn: any, key: number) => {
              return (
                <Button key={key} w="24" onPress={btn?.onPress} size="xs">
                  <Text color="white" fontSize="xs" bold>
                    {btn?.title}
                  </Text>
                </Button>
              );
            })}
          </HStack>
        </HStack>
      </Box>

      {image && (
        <ImageZoom
          source={IMAGES[image]}
          show={preview}
          onClose={handlePreview}
        />
      )}
    </>
  );
};

export default Layout;
