import React, { useEffect, useState } from "react";
import { Box } from "native-base";
import Layout from "../components/Layout";
import useStore from "../store/store";

const Module: React.FC = ({ navigation, route }: any) => {
  // Hooks
  const { modules, setSlide, setLessonComplete } = useStore();
  const [currentSlide, setCurrentSlide] = useState(0);

  // Variables
  const { data, module, topic, lesson, section } = route.params;
  const slideLength = data?.items?.length || 0;
  const slide = modules[module].topics[topic].lessons[lesson].slide;

  // Handlers
  const handleBack = () => {
    navigation.goBack();
  };

  const handlePrev = () => {
    if (currentSlide === 0) {
      navigation.goBack();
    } else {
      setCurrentSlide((prev) => prev - 1);
    }
  };

  const handleNext = () => {
    if (currentSlide === slideLength - 1) {
      setLessonComplete(module, topic, lesson);
    }

    if (currentSlide < slideLength - 1) {
      setCurrentSlide((prev) => prev + 1);
      if (currentSlide >= slide) setSlide(module, topic, lesson, slide + 1);
    } else {
      navigation.goBack();
    }
  };

  // Effects
  useEffect(() => {
    if (section >= 0) {
      setCurrentSlide(section);
    }
  }, []);

  return (
    <Box size="full" bg="tertiary.600">
      <Layout
        header={{
          onPress: handleBack,
        }}
        subTitle={data?.subTitle}
        kicker={data?.items?.[currentSlide]?.kicker}
        title={data?.items?.[currentSlide]?.title}
        longText={data?.items?.[currentSlide]?.longText}
        image={data?.items?.[currentSlide]?.image}
        page={`${currentSlide + 1} / ${slideLength}`}
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
