import React, { useEffect, useState } from "react";
import { IModule } from "../models/IModule";
import { ITopic } from "../models/ITopic";
import { ISlide } from "../models/ISlide";
import { Box, ScrollView } from "native-base";
import HeaderNav from "../components/HeaderNav";
import TopicCard from "../components/TopicCard";
import ModuleCard from "../components/ModuleCard";
import LessonCard from "../components/LessonCard";

type ITOCScreen = "main" | "topics" | "lessons";

const TableOfContents: React.FC = ({ navigation, route }: any) => {
  // States
  const [module, setModule] = useState<IModule>();
  const [moduleId, setModuleId] = useState<number>(0);
  const [topic, setTopic] = useState<ITopic>();
  const [topicId, setTopicId] = useState<number>(0);
  const [screen, setScreen] = useState<ITOCScreen>("main");
  const [show, setShow] = useState<boolean>(true);

  // Variables
  const { data } = route.params;
  const progress = [
    {
      moduleId: 2,
      currentTopic: 0,
      topic: [
        {
          topicId: 0,
          lesson: [
            {
              lessonId: 0,
              slide: 1,
            },
            // other lessons
          ],
        },
        // other topics
      ],
    },
    // other modules
  ];

  const isLessonComplete = (lessonId: number) => {
    // find lesson
    const p = progress
      ?.find((p) => p.moduleId === moduleId)
      ?.topic?.find((t) => t?.topicId === topicId)
      ?.lesson?.find((l) => l?.lessonId === lessonId);
    const slideLength = topic?.lessons?.[lessonId]?.items?.length || 0;
    return p ? p.slide === slideLength - 1 : false;
  };

  const isCurrentTopic = (topicId: number) => {
    // find module
    const p = progress?.find((p) => p.moduleId === moduleId);
    return p ? p?.currentTopic === topicId : false;
  };

  const isTopicComplete = (topicId: number) => {
    // find module
    const p = progress?.find((p) => p.moduleId === moduleId);
    return p ? p?.currentTopic > topicId : false;
  };

  const isCurrentSlide = (lessonId: number, slideId: number) => {
    // find lesson
    const p = progress
      ?.find((p) => p.moduleId === moduleId)
      ?.topic?.find((t) => t?.topicId === topicId)
      ?.lesson?.find((l) => l?.lessonId === lessonId);
    const slides = topic?.lessons?.[lessonId]?.items;
    const slideLength = slides?.length || 0;
    return p ? slideId === p?.slide : false;
  };

  const isSlideComplete = (lessonId: number, slideId: number) => {
    const p = progress
      ?.find((p) => p.moduleId === moduleId)
      ?.topic?.find((t) => t?.topicId === topicId)
      ?.lesson?.find((l) => l?.lessonId === lessonId);
    return p ? p?.slide > slideId : false;
  };

  // Handlers
  const handleModule = (module: any, index: number) => {
    if (module?.topics) {
      setModule(module);
      setModuleId(index);
      setScreen("topics");
    }
  };

  const handleTopic = (topic: any, index: number) => {
    if (topic?.lessons) {
      setTopic(topic);
      setTopicId(index);
      setScreen("lessons");
    }
  };

  const handleLesson = (lesson: any) => {
    navigation.navigate("Module", { data: lesson });
  };

  const handleAssessment = () => {
    navigation.navigate("Quiz", { data: topic?.assessment });
  };

  const handleQuiz = (lesson: number) => {
    navigation.navigate("Quiz", { data: topic?.lessons?.[lesson]?.quiz });
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

  const getHeaderTitle = () => {
    if (screen === "main") {
      return data?.title;
    } else if (screen === "topics") {
      return module?.title;
    } else if (screen === "lessons") {
      return topic?.title;
    }
    return "";
  };

  const Lessons = () => {
    return (
      <>
        {topic?.longText && (
          <LessonCard title="About" longText={topic?.longText} />
        )}

        {/* Pre-Assessment */}
        {topic?.assessment && (
          <LessonCard
            title={topic.assessment?.kicker}
            longText={topic.assessment?.longText}
            icon="brain"
            cta={{
              title: "Start",
              onPress: handleAssessment,
            }}
          />
        )}

        {topic?.lessons?.map((lesson: any, lessonKey: number) => {
          return (
            <Box key={lessonKey}>
              {/* Lesson */}
              <LessonCard
                title={`Lesson ${lessonKey + 1}: ${lesson?.title}`}
                sections={lesson?.items?.map(
                  (slide: ISlide, slideKey: number) => {
                    if (slide?.section) {
                      return {
                        title: slide.section,
                        active: isCurrentSlide(lessonKey, slideKey),
                        complete: isSlideComplete(lessonKey, slideKey),
                        onPress: () => handleLesson(lesson),
                      };
                    }
                  }
                )}
              />

              {/* Quiz */}
              {lesson?.quiz && (
                <LessonCard
                  title={lesson?.quiz?.name}
                  longText={lesson?.quiz?.section}
                  icon="trophy"
                  cta={{
                    title: "Start",
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
    return module?.topics?.map((topic: ITopic, key: number) => (
      <TopicCard
        key={key}
        data={topic}
        active={isCurrentTopic(key)}
        complete={isTopicComplete(key)}
        onPress={() => handleTopic(topic, key)}
      />
    ));
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
      <HeaderNav title={getHeaderTitle()} onPress={handleGoBack} />
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
    </Box>
  );
};

export default TableOfContents;
