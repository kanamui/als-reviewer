import React, { useState } from "react";
import { Box } from "native-base";
import Layout from "../components/Layout";

const Module: React.FC = ({ navigation, route }: any) => {
  // States
  const [slide, setSlide] = useState<number>(0);

  // Variables
  const { data } = route.params;
  const slideLength = data?.items?.length || 0;

  // Handlers
  const handleBack = () => {
    navigation.goBack();
  };

  const handlePrev = () => {
    if (slide === 0) {
      navigation.goBack();
    } else {
      setSlide(slide - 1);
    }
  };

  const handleNext = () => {
    if (slide < slideLength - 1) {
      setSlide(slide + 1);
    } else {
      navigation.goBack();
    }
  };

  return (
    <Box size="full" bg="tertiary.600">
      <Layout
        header={{
          onPress: handleBack,
        }}
        subTitle={data?.subTitle}
        kicker={data?.items?.[slide]?.kicker}
        title={data?.items?.[slide]?.title}
        longText={data?.items?.[slide]?.longText}
        image={data?.items?.[slide]?.image}
        page={`${slide + 1} / ${slideLength}`}
        cta={[
          {
            title: "PREV",
            onPress: handlePrev,
          },
          {
            title: "NEXT",
            onPress: handleNext,
          },
        ]}
      />
    </Box>
  );
};

export default Module;
