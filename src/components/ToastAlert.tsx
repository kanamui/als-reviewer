import {
  Alert,
  CloseIcon,
  HStack,
  IconButton,
  Text,
  VStack,
} from "native-base";
import { IToastAlert } from "../models/components/IToastAlert";

const ToastAlert = ({ title, status, onClose }: IToastAlert) => {
  return (
    <Alert w="100%" variant="left-accent" colorScheme="success" status={status}>
      <VStack space={2} flexShrink={1} w="100%">
        <HStack
          flexShrink={1}
          space={2}
          alignItems="center"
          justifyContent="space-between"
        >
          <HStack space={2} flexShrink={1} alignItems="center">
            <Alert.Icon />
            <Text color="coolGray.800">{title}</Text>
          </HStack>
          <IconButton
            p="1"
            borderRadius="full"
            icon={<CloseIcon size="xs" />}
            onPress={onClose}
          />
        </HStack>
      </VStack>
    </Alert>
  );
};

export default ToastAlert;
