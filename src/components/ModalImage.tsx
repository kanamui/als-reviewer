import { useEffect, useState } from "react";
import {
  Box,
  Button,
  HStack,
  Image,
  PresenceTransition,
  Stack,
  Text,
  VStack,
} from "native-base";
import { IModalImage } from "../models/components/IModalImage";

const ModalImage = ({ slides, show, delay, cta }: IModalImage) => {
  const [visible, setVisible] = useState(false);
  const [slide, setSlide] = useState(0);
  const [render, setRender] = useState(true);
  const slideLength = slides?.length || 0;

  // Handlers
  const handleCta = () => {
    if (slideLength > 1 && slide < slideLength - 1) {
      setSlide(slide + 1);
    } else if (cta?.onPress) {
      cta.onPress();
    }
  };

  // Effects
  useEffect(() => {
    setRender(false);
    const timeout = setTimeout(() => setRender(true));
    return () => clearInterval(timeout);
  }, [slide]);

  useEffect(() => {
    const timeout = setTimeout(() => setVisible(!!show), delay || 500);
    return () => clearInterval(timeout);
  }, [show]);

  return visible ? (
    <Box size="full" position="absolute">
      {/* Dim background */}
      <Box size="full" position="absolute">
        <PresenceTransition
          visible={visible}
          initial={{ opacity: 0 }}
          animate={{
            opacity: 0.3,
            transition: {
              duration: 300,
            },
          }}
        >
          <Box size="full" bg="black" />
        </PresenceTransition>
      </Box>

      {/* Content */}
      <Box size="full" alignItems="center" justifyContent="center">
        <Stack
          bg="white"
          w="40%"
          h="85%"
          borderRadius="lg"
          justifyContent="space-between"
          overflow="hidden"
        >
          {/* Background */}
          <Box h={slides[slide]?.title ? "62%" : "76%"}>
            {render && slides[slide]?.image && (
              <PresenceTransition
                visible={render}
                initial={{ opacity: 0 }}
                animate={{
                  opacity: 1,
                  transition: {
                    duration: 100,
                  },
                }}
              >
                <Image
                  size="full"
                  resizeMode="contain"
                  source={slides[slide].image}
                  alt="picture"
                />
              </PresenceTransition>
            )}
          </Box>
          {slideLength > 1 && (
            <HStack w="full" justifyContent="center" space="2" pt="1">
              {slides.map((_, key: number) => (
                <Box
                  key={key}
                  borderRadius="full"
                  size="2"
                  bg={key === slide ? "gray.400" : "gray.200"}
                />
              ))}
            </HStack>
          )}

          {/* CTA */}
          <VStack p="5" pt="2" space="3" alignItems="center">
            {slides[slide]?.title && (
              <Text bold numberOfLines={1}>
                {slides[slide]?.title}
              </Text>
            )}
            <Button w="full" borderRadius="full" onPress={handleCta}>
              <Text bold color="white">
                {slideLength > 1 && slide < slideLength - 1
                  ? "Next"
                  : cta?.title || "Close"}
              </Text>
            </Button>
          </VStack>
        </Stack>
      </Box>
    </Box>
  ) : null;
};

export default ModalImage;
