import React, { useLayoutEffect, useState } from "react";
import { Dimensions, LayoutChangeEvent } from "react-native";
import { Box, IBoxProps, ScrollView } from "native-base";

const Layout: React.FC<IBoxProps> = ({ children }) => {
  const [exceedsScreen, setExceedsScreen] = useState(false);
  const [containerHeight, setContainerHeight] = useState(0);
  const screenHeight = Dimensions.get("window").height;

  useLayoutEffect(() => {
    setExceedsScreen(containerHeight > screenHeight);
  }, [containerHeight, screenHeight]);

  const handleContainerLayout = (event: LayoutChangeEvent) => {
    setContainerHeight(event.nativeEvent.layout.height);
  };

  return (
    <Box size="full" bg="white" safeAreaX onLayout={handleContainerLayout}>
      {exceedsScreen ? (
        <ScrollView size="full">{children}</ScrollView>
      ) : (
        children
      )}
    </Box>
  );
};

export default Layout;
