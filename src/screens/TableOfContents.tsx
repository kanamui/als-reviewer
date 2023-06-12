import React, { useEffect, useState } from "react";
import { IMAGES } from "../logic/constants/images.constants";
import { IModule } from "../models/IModule";
import { ITopic } from "../models/ITopic";
import { ILesson } from "../models/ILesson";
import { ISlide } from "../models/ISlide";
import { Box, ScrollView } from "native-base";
import useStore from "../store/store";
import HeaderNav from "../components/HeaderNav";
import TopicCard from "../components/TopicCard";
import ModuleCard from "../components/ModuleCard";
import LessonCard from "../components/LessonCard";
import ModalImage from "../components/ModalImage";

type ITOCScreen = "main" | "topics" | "lessons";

const TableOfContents: React.FC = ({ navigation, route }: any) => {
  // Variables
  const { data } = route.params;

  // Hooks
  const { modules, settings, homeHelpDone, addCoins } = useStore();

  // States
  const [module, setModule] = useState(0);
  const [topic, setTopic] = useState(0);
  const [screen, setScreen] = useState<ITOCScreen>("main");
  const [show, setShow] = useState(true);

  const [showHelp, setShowHelp] = useState(settings.help);
  const [showLessonReward, setShowLessonReward] = useState(false);
  const [showQuizReward, setShowQuizReward] = useState(false);

  // TOPIC
  const isCurrentTopic = (topicId: number) => {
    return modules[module].current === topicId;
  };

  const isTopicComplete = (topicId: number) => {
    return !!modules[module].topics?.[topicId]?.complete;
  };

  // LESSON
  const isCurrentSection = (lessonId: number, sectionId: number) => {
    const slide = modules[module].topics[topic].lessons?.[lessonId]?.slide;
    if (slide < 0) return false;
    const sections =
      getLesson(lessonId)
        ?.items?.map((slide: ISlide, index: number) =>
          slide?.title ? index : -1
        )
        ?.filter((index) => index >= 0) || [];
    const closestIndex: number = sections.reduce(
      (closestIndex: number, current: number, index: number) => {
        const currentDiff: number = Math.abs(current - slide);
        const closestDiff: number = Math.abs(sections[closestIndex] - slide);
        return currentDiff < closestDiff ? index : closestIndex;
      },
      0
    );

    return sectionId === sections[closestIndex];
  };

  const isSectionComplete = (lessonId: number, sectionId: number) => {
    const slide = modules[module].topics[topic].lessons?.[lessonId]?.slide;
    if (slide < 0) return false;
    const slideLength = getLesson(lessonId)?.items?.length || 0;
    const sections =
      getLesson(lessonId)
        ?.items?.map((slide: ISlide, index: number) =>
          slide?.title ? index : -1
        )
        ?.filter((index) => index >= 0) || [];
    const closestIndex: number = sections.reduce(
      (closestIndex: number, current: number, index: number) => {
        const currentDiff: number = Math.abs(current - slide);
        const closestDiff: number = Math.abs(sections[closestIndex] - slide);
        return currentDiff < closestDiff ? index : closestIndex;
      },
      0
    );

    if (
      sectionId === sections?.[sections.length - 1] &&
      slide > sections?.[sections.length - 1]
    ) {
      return slide >= slideLength - 1;
    }

    return sectionId < sections[closestIndex];
  };

  const isLessonComplete = (lessonId: number) => {
    return !!modules[module].topics?.[topic]?.lessons?.[lessonId]?.complete;
  };

  // Handlers
  const handleModule = (module: any, index: number) => {
    if (module?.topics) {
      setModule(index);
      setScreen("topics");
    }
  };

  const handleTopic = (topic: any, index: number) => {
    if (topic?.lessons) {
      setTopic(index);
      setScreen("lessons");
    }
  };

  const handleLesson = (lesson: any, index: number, section: number = -1) => {
    navigation.navigate("Module", {
      data: lesson,
      module,
      topic,
      lesson: index,
      hasQuiz: !!getLesson(index)?.quiz,
      section,
      onComplete: giveLessonReward,
    });
  };

  const handleAssessment = () => {
    navigation.navigate("Quiz", {
      data: getTopic(topic)?.assessment,
      final: true,
      assess: true,
      module,
      topic,
      onComplete: giveQuizReward,
    });
  };

  const handleQuiz = (lesson: number) => {
    navigation.navigate("Quiz", {
      data: getLesson(lesson)?.quiz,
      final: !getLesson(lesson + 1) && !getTopic(topic)?.assessment,
      assess: false,
      module,
      topic,
      lesson,
      onComplete: giveQuizReward,
    });
  };

  const handleGoBack = () => {
    if (screen === "topics") {
      setScreen("main");
    } else if (screen === "lessons") {
      setScreen("topics");
    } else {
      navigation.goBack();
    }
  };

  const handleHelpClose = () => {
    setShowHelp(false);
    homeHelpDone();
  };

  // Effects
  useEffect(() => {
    // force reload cached images
    setShow(false);
    const timeout = setTimeout(() => setShow(true));
    return () => clearTimeout(timeout);
  }, [screen]);

  // Functions
  const DynamicScreen = () => {
    switch (screen) {
      case "lessons":
        return Lessons();
      case "topics":
        return Topics();
      case "main":
      default:
        return Main();
    }
  };

  const giveLessonReward = () => {
    setShowLessonReward(true);
  };

  const giveQuizReward = () => {
    setShowQuizReward(true);
  };

  const handleQuizClaimReward = () => {
    setShowQuizReward(false);
    addCoins(10);
  };

  const handleLessonClaimReward = () => {
    setShowLessonReward(false);
    addCoins(5);
  };

  const getHeaderTitle = () => {
    if (screen === "main") {
      return data?.title;
    } else if (screen === "topics") {
      return getModule(module)?.title;
    } else if (screen === "lessons") {
      return getTopic(topic)?.title;
    }
    return "";
  };

  const getModule = (moduleId: number): IModule | undefined => {
    return data?.items?.[moduleId];
  };

  const getTopic = (topicId: number): ITopic | undefined => {
    return getModule(module)?.topics?.[topicId];
  };

  const getLesson = (lessonId: number): ILesson | undefined => {
    return getTopic(topic)?.lessons?.[lessonId];
  };

  const getTopicProgress = (topicId: number) => {
    const lessons = modules[module].topics?.[topicId]?.lessons;
    const doneLessons = lessons?.filter((l) => l.complete === true).length || 0;
    const doneQuiz = lessons?.filter((l) => l.quiz >= 0).length || 0;
    const lessonLength = getTopic(topicId)?.lessons?.length || 0;
    const quizLength =
      getTopic(topicId)?.lessons?.filter((l) => l?.quiz !== undefined).length ||
      0;
    // const assessLength = getTopic(topicId)?.assessment ? 1 : 0;
    // const total = lessonLength + quizLength + assessLength;
    const total = lessonLength + quizLength;
    const progress = Math.round(((doneLessons + doneQuiz) / total) * 100);
    return progress;
  };

  const isQuizTaken = (lessonId: number) => {
    return modules[module].topics?.[topic]?.lessons?.[lessonId]?.quiz >= 0;
  };

  const isAssessTaken = (topicId: number) => {
    return modules[module].topics?.[topic]?.assessment >= 0;
  };

  const isAssessmentUnlocked = (topicId: number) => {
    const lessons = modules[module].topics?.[topicId]?.lessons;
    const doneLessons = lessons?.filter((l) => l.complete === true).length || 0;
    const doneQuiz = lessons?.filter((l) => l.quiz >= 0).length || 0;
    const lessonLength = getTopic(topicId)?.lessons?.length || 0;
    const quizLength =
      getTopic(topicId)?.lessons?.filter((l) => l?.quiz !== undefined).length ||
      0;
    return doneLessons === lessonLength && doneQuiz === quizLength;
  };

  const Lessons = () => {
    const data = getTopic(topic);
    const assessment = modules[module].topics[topic].assessment;

    return (
      <>
        {data?.longText && (
          <LessonCard title="About" longText={data?.longText} />
        )}

        {/* Pre-Assessment */}
        {data?.assessment && (
          <LessonCard
            score={
              assessment >= 0
                ? `Score: ${assessment}/${data?.assessment?.items?.length || 0}`
                : ""
            }
            title={data.assessment?.kicker}
            longText={data.assessment?.longText}
            icon="brain"
            cta={{
              title: isAssessTaken(topic) ? "Retake" : "Start",
              onPress: handleAssessment,
            }}
            // disabled={!isAssessmentUnlocked(topic)}
          />
        )}

        {data?.lessons?.map((lesson: any, lessonKey: number) => {
          const score =
            modules[module].topics[topic].lessons?.[lessonKey]?.quiz;
          const total = lesson?.quiz?.items?.length;

          return (
            <Box key={lessonKey}>
              {/* Lesson */}
              <LessonCard
                title={`Lesson ${lessonKey + 1}: ${lesson?.title}`}
                sections={lesson?.items
                  ?.map((slide: ISlide, index: number) => {
                    const complete = isSectionComplete(lessonKey, index);
                    if (slide?.section || slide?.title) {
                      return {
                        title: slide?.section || slide?.title,
                        active: isCurrentSection(lessonKey, index),
                        complete: complete,
                        onPress: () => handleLesson(lesson, lessonKey, index),
                      };
                    }
                  })
                  .filter((slide: ISlide) => slide !== undefined)}
              />

              {/* Quiz */}
              {lesson?.quiz && (
                <LessonCard
                  score={
                    score >= 0
                      ? total > 0
                        ? `Score: ${score}/${total}`
                        : "Submitted"
                      : ""
                  }
                  title={lesson?.quiz?.name}
                  longText={lesson?.quiz?.section}
                  icon="trophy"
                  cta={{
                    title: isQuizTaken(lessonKey) ? "Retake" : "Start",
                    onPress: () => handleQuiz(lessonKey),
                  }}
                  disabled={!isLessonComplete(lessonKey)}
                />
              )}
            </Box>
          );
        })}
      </>
    );
  };

  const Topics = () => {
    return getModule(module)?.topics?.map((topic: ITopic, key: number) => {
      return (
        <TopicCard
          key={key}
          data={topic}
          active={true}
          complete={isTopicComplete(key)}
          progress={getTopicProgress(key)}
          onPress={() => handleTopic(topic, key)}
        />
      );
    });
  };

  const Main = () => {
    return data?.items?.map((module: IModule, key: number) => (
      <ModuleCard
        key={key}
        data={module}
        disabled={!module?.topics}
        onPress={() => handleModule(module, key)}
      />
    ));
  };

  return (
    <Box size="full" bg="tertiary.600">
      <HeaderNav
        title={getHeaderTitle()}
        onPress={handleGoBack}
        showCoins
        showPet
        onHelpPress={() => setShowHelp(true)}
      />
      <Box
        pt="3"
        px="3"
        flex="1"
        size="full"
        bg={screen === "main" ? "white" : "gray.100"}
        borderTopRadius="3xl"
        shadow="6"
      >
        <ScrollView opacity={show ? 1 : 0} mt={screen === "main" ? 0 : 3}>
          <Box safeAreaX>{DynamicScreen()}</Box>
        </ScrollView>
      </Box>

      {/* Instructions */}
      <ModalImage
        show={showHelp}
        slides={[
          { image: IMAGES.catHello, title: "Meow~ I'm Alice!" },
          {
            image: IMAGES.catHappy,
            title: "Your mission is to make me happy!",
          },
          { image: IMAGES.lightbulb, title: "Here's the plan!" },
          { image: IMAGES.coin, title: "Study hard to get coins" },
          { image: IMAGES.mouse, title: "So you can buy me treats!" },
          {
            image: IMAGES.tip1,
            title: "Tip: see your coins here",
            hideClose: true,
          },
          {
            image: IMAGES.tip2,
            title: "Tip: visit Alice here",
            hideClose: true,
          },
          { image: IMAGES.catYay, title: "Have fun meow learning!" },
        ]}
        cta={{
          title: "Get started",
          onPress: handleHelpClose,
        }}
        onClose={handleHelpClose}
      />

      {/* Claim lesson reward */}
      <ModalImage
        show={showLessonReward}
        slides={[
          {
            image: IMAGES.coin,
            title: "Lesson completed! Here are 5 coins! 🎉",
          },
        ]}
        cta={{
          title: "Claim reward",
          onPress: handleLessonClaimReward,
        }}
      />

      {/* Claim quiz reward */}
      <ModalImage
        show={showQuizReward}
        slides={[
          {
            image: IMAGES.coin,
            title: "Quiz completed! Here are 10 coins! 🎉",
          },
        ]}
        cta={{
          title: "Claim reward",
          onPress: handleQuizClaimReward,
        }}
      />
    </Box>
  );
};

export default TableOfContents;
