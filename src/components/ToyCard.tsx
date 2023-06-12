import {
  AspectRatio,
  Box,
  Center,
  HStack,
  Heading,
  Icon,
  Image,
  Pressable,
  Stack,
  Text,
} from "native-base";
import { FontAwesome5 } from "@expo/vector-icons";

interface IToyCard {
  image: any;
  price?: number;
  title?: string;
  longText?: string;
  onPress?: () => void;
}

const ToyCard = ({ image, price, title, longText, onPress }: IToyCard) => {
  return (
    <Pressable onPress={onPress}>
      <Box
        w="40"
        h="83%"
        bg="gray.100"
        borderRadius="lg"
        shadow="3"
        overflow="hidden"
      >
        <Box>
          <AspectRatio w="full" ratio={4 / 3}>
            <Image size="full" resizeMode="contain" source={image} alt="toy" />
          </AspectRatio>
          {price && (
            <HStack
              bg="orange.400"
              position="absolute"
              top="0"
              right="0"
              px="2"
              py="1"
              space="1.5"
              borderBottomLeftRadius="lg"
              alignItems="center"
            >
              <Icon
                as={FontAwesome5}
                size="xs"
                color="yellow.400"
                name="coins"
              />
              <Text color="white">{price}</Text>
            </HStack>
          )}
        </Box>
        <Stack h="full" px="4" space="1">
          <Heading size="md">{title}</Heading>
          <Text fontSize="xs" color="gray.400" numberOfLines={3}>
            {longText}
          </Text>
        </Stack>
      </Box>
    </Pressable>
  );
};

export default ToyCard;
