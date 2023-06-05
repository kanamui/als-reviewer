import React, { useEffect, useState } from "react";
import { IMAGES } from "../logic/constants/images.constants";
import { Box } from "native-base";
import Layout from "../components/Layout";
import useStore from "../store/store";
import ModalImage from "../components/ModalImage";

const Module: React.FC = ({ navigation, route }: any) => {
  // Hooks
  const {
    modules,
    addCoins,
    slideIncrement,
    setLessonHalfReached,
    setLessonComplete,
  } = useStore();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [showReward, setShowReward] = useState(false);

  // Variables
  const { data, module, topic, lesson, hasQuiz, section, onComplete } =
    route.params;
  const slideLength = data?.items?.length || 0;
  const moduleLesson = modules[module].topics[topic].lessons[lesson];
  const slide = moduleLesson.slide;
  const half = moduleLesson.half;
  const complete = moduleLesson.complete;

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
      if (!complete && onComplete) onComplete();
      setLessonComplete(module, topic, lesson);

      // if no quiz, set the next lesson to first slide
      if (!hasQuiz) {
        const slide =
          modules[module].topics[topic].lessons?.[lesson + 1]?.slide || -1;
        if (slide < 0) slideIncrement(module, topic, lesson + 1);
      }
    }

    if (currentSlide < slideLength - 1) {
      setCurrentSlide((prev) => prev + 1);
      if (currentSlide >= slide) slideIncrement(module, topic, lesson);
    } else {
      navigation.goBack();
    }
  };

  const handleClaimReward = () => {
    setShowReward(false);
    addCoins(5);
  };

  // Effects
  useEffect(() => {
    if (section >= 0) {
      setCurrentSlide(section);
    }
  }, []);

  useEffect(() => {
    if (!half && slide === Math.floor((slideLength - 1) / 2)) {
      setLessonHalfReached(module, topic, lesson);
      setShowReward(true);
    }
  }, [slide]);

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
      <ModalImage
        show={showReward}
        slides={[
          { image: IMAGES.coin, title: "Almost there! Here are 5 coins! 🔥" },
        ]}
        cta={{
          title: "Claim reward",
          onPress: handleClaimReward,
        }}
      />
    </Box>
  );
};

export default Module;
