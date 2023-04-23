import React, { useState } from "react";
import { Box } from "native-base";
import Layout from "../components/Layout";

const Module: React.FC = ({ navigation, route }: any) => {
  // States
  const [slide, setSlide] = useState<number>(0);

  // Variables
  const { data, quiz } = route.params;
  const slideLength = data?.items?.length || 0;

  // Handlers
  const handleBack = () => {
    if (slide === 0) {
      navigation.goBack();
    } else {
      setSlide(slide - 1);
    }
  };

  const handleProceed = () => {
    if (slide < slideLength - 1) {
      setSlide(slide + 1);
    } else if (quiz) {
      navigation.navigate("Quiz", { data: quiz })
    } else {
      navigation.goBack();
    }
  };

  return (
    <Box size="full" bg="white" safeAreaX>
      <Layout
        header={{
          onPress: handleBack,
        }}
        subTitle={data?.subTitle}
        kicker={data?.items?.[slide]?.kicker}
        title={data?.items?.[slide]?.title}
        longText={data?.items?.[slide]?.longText}
        cta={{
          title: "NEXT",
          onPress: handleProceed,
        }}
      />
    </Box>
  );
};

export default Module;
