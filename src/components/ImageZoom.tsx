import { useState } from "react";
import { ReactNativeZoomableView } from "@openspacelabs/react-native-zoomable-view";
import {
  Box,
  CloseIcon,
  Image,
  PresenceTransition,
  Pressable,
} from "native-base";

interface ImageZoom {
  source: any;
  show?: boolean;
  onClose?: () => void;
}

const ImageZoom = ({ source, show, onClose }: ImageZoom) => {
  // const [show, setShow] = useState(false);

  return show ? (
    <Box size="full" position="absolute">
      <Box size="full" position="absolute">
        <PresenceTransition
          visible={show}
          initial={{ opacity: 0 }}
          animate={{
            opacity: 1,
            transition: {
              duration: 200,
            },
          }}
        >
          <Box size="full" bg="black" />
        </PresenceTransition>
      </Box>
      <Box size="full" safeArea>
        <ReactNativeZoomableView
          maxZoom={3}
          minZoom={1}
          zoomStep={0.5}
          initialZoom={1}
        >
          <Image
            size="full"
            resizeMode="contain"
            source={source}
            alt="picture"
          />
        </ReactNativeZoomableView>
      </Box>
      <Box position="absolute" right="0" top="0" safeArea>
        <Pressable onPress={onClose} p="1">
          <CloseIcon size="lg" />
        </Pressable>
      </Box>
    </Box>
  ) : null;
};

export default ImageZoom;
