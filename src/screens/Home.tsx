import React, { useState } from "react";
import {
  AspectRatio,
  Box,
  Button,
  HStack,
  Heading,
  Image,
  Modal,
  Text,
  VStack,
} from "native-base";
import { IMAGES } from "../logic/constants/images.constants";

const Home: React.FC = ({ navigation, route }: any) => {
  // States
  const [showModal, setShowModal] = useState<boolean>(false);

  // Variables
  const { data } = route.params;

  // Handlers
  const handleModal = () => {
    setShowModal(false);
    navigation.navigate("ModuleTOC");
  };

  // Functions
  const Main = () => {
    return (
      <Box size="full" bg="white">
        <AspectRatio ratio={10}>
          <Image
            size="full"
            source={IMAGES.banner}
            resizeMode="cover"
            alt="ALS"
          />
        </AspectRatio>
        <VStack
          space="4"
          flex="1"
          alignItems="center"
          justifyContent="center"
          safeAreaX
        >
          <Heading fontSize="sm">{data?.kicker}</Heading>
          <Heading fontSize="2xl" maxW="80" textAlign="center">
            {data?.title}
          </Heading>

          <VStack alignItems="center" space="2">
            <Button w="24" size="xs" onPress={() => setShowModal(true)}>
              <Text color="white" fontSize="xs" bold>
                {data?.cta1}
              </Text>
            </Button>
            <Button
              w="24"
              size="xs"
              onPress={() => {
                navigation.navigate("About");
              }}
            >
              <Text color="white" fontSize="xs" bold>
                {data?.cta2}
              </Text>
            </Button>
          </VStack>
        </VStack>

        <HStack mb="4" space="2" alignItems="center" alignSelf="center">
          <Image w="36px" h="32px" source={IMAGES.cvsu} alt="cvsu" />
          <Text fontSize="xs" bold>
            {data?.footer}
          </Text>
        </HStack>
      </Box>
    );
  };

  return (
    <>
      {Main()}
      {data?.disclaimer && (
        <Modal isOpen={showModal} onClose={handleModal}>
          <Modal.Content maxW="90%" maxH="80%">
            <Modal.CloseButton />
            <Modal.Header>{data?.disclaimer?.kicker}</Modal.Header>
            <Modal.Body>
              <VStack
                space="4"
                flex="1"
                alignItems="center"
                justifyContent="space-between"
              >
                <Text bold>{data?.disclaimer?.title}</Text>
                <VStack space="4">
                  <HStack space="4" maxW="270px" alignItems="center">
                    <Image
                      size="xs"
                      source={IMAGES.checklist}
                      alt="checklist"
                    />
                    <Text fontSize="xs" bold>
                      {data?.disclaimer?.longText1}
                    </Text>
                  </HStack>
                  <HStack space="4" maxW="270px" alignItems="center">
                    <Image size="xs" source={IMAGES.book} alt="book" />
                    <Text fontSize="xs" bold>
                      {data?.disclaimer?.longText2}
                    </Text>
                  </HStack>
                </VStack>
              </VStack>
            </Modal.Body>
            <Modal.Footer>
              <Button onPress={handleModal}>{data?.disclaimer?.cta}</Button>
            </Modal.Footer>
          </Modal.Content>
        </Modal>
      )}
    </>
  );
};

export default Home;
