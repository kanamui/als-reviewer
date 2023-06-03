import { create } from "zustand";

interface ILessonStore {
  slide: number;
  quiz: number;
  complete: boolean;
}

interface ITopicStore {
  lessons: ILessonStore[];
  assessment: number;
  complete: boolean;
}

interface IModuleStore {
  topics: ITopicStore[];
  current: number;
}

interface IGlobalStore {
  modules: IModuleStore[];
  setCurrentTopic: (module: number, topic: number) => void;
  setSlide: (module: number, topic: number, lesson: number, slide: number) => void;
  setAssessmentScore: (module: number, topic: number, score: number) => void;
  setQuizScore: (module: number, topic: number, lesson: number, score: number) => void;
  setLessonComplete: (module: number, topic: number, lesson: number) => void;
  setTopicComplete: (module: number, topic: number) => void;
}

const useStore = create<IGlobalStore>((set) => ({
  modules: [
    { current: 0, topics: [{assessment: -1, complete: false, lessons: [{slide: 0, quiz: -1, complete: false},{slide: -1, quiz: -1, complete: false},{slide: -1, quiz: -1, complete: false}]},{assessment: -1, complete: false, lessons: [{slide: 0, quiz: -1, complete: false},{slide: -1, quiz: -1, complete: false},{slide: -1, quiz: -1, complete: false}]},{assessment: -1, complete: false, lessons: [{slide: 0, quiz: -1, complete: false},{slide: -1, quiz: -1, complete: false},{slide: -1, quiz: -1, complete: false}]}] },
    { current: 0, topics: [{assessment: -1, complete: false, lessons: [{slide: 0, quiz: -1, complete: false},{slide: -1, quiz: -1, complete: false},{slide: -1, quiz: -1, complete: false}]},{assessment: -1, complete: false, lessons: [{slide: 0, quiz: -1, complete: false},{slide: -1, quiz: -1, complete: false},{slide: -1, quiz: -1, complete: false}]},{assessment: -1, complete: false, lessons: [{slide: 0, quiz: -1, complete: false},{slide: -1, quiz: -1, complete: false},{slide: -1, quiz: -1, complete: false}]}] },
    { current: 0, topics: [{assessment: -1, complete: false, lessons: [{slide: 0, quiz: -1, complete: false},{slide: -1, quiz: -1, complete: false},{slide: -1, quiz: -1, complete: false}]},{assessment: -1, complete: false, lessons: [{slide: 0, quiz: -1, complete: false},{slide: -1, quiz: -1, complete: false},{slide: -1, quiz: -1, complete: false}]},{assessment: -1, complete: false, lessons: [{slide: 0, quiz: -1, complete: false},{slide: -1, quiz: -1, complete: false},{slide: -1, quiz: -1, complete: false}]}] },
    { current: 0, topics: [{assessment: -1, complete: false, lessons: [{slide: 0, quiz: -1, complete: false},{slide: -1, quiz: -1, complete: false},{slide: -1, quiz: -1, complete: false}]},{assessment: -1, complete: false, lessons: [{slide: 0, quiz: -1, complete: false},{slide: -1, quiz: -1, complete: false},{slide: -1, quiz: -1, complete: false}]},{assessment: -1, complete: false, lessons: [{slide: 0, quiz: -1, complete: false},{slide: -1, quiz: -1, complete: false},{slide: -1, quiz: -1, complete: false}]}] },
    { current: 0, topics: [{assessment: -1, complete: false, lessons: [{slide: 0, quiz: -1, complete: false},{slide: -1, quiz: -1, complete: false},{slide: -1, quiz: -1, complete: false}]},{assessment: -1, complete: false, lessons: [{slide: 0, quiz: -1, complete: false},{slide: -1, quiz: -1, complete: false},{slide: -1, quiz: -1, complete: false}]},{assessment: -1, complete: false, lessons: [{slide: 0, quiz: -1, complete: false},{slide: -1, quiz: -1, complete: false},{slide: -1, quiz: -1, complete: false}]}] },
    { current: 0, topics: [{assessment: -1, complete: false, lessons: [{slide: 0, quiz: -1, complete: false},{slide: -1, quiz: -1, complete: false},{slide: -1, quiz: -1, complete: false}]},{assessment: -1, complete: false, lessons: [{slide: 0, quiz: -1, complete: false},{slide: -1, quiz: -1, complete: false},{slide: -1, quiz: -1, complete: false}]},{assessment: -1, complete: false, lessons: [{slide: 0, quiz: -1, complete: false},{slide: -1, quiz: -1, complete: false},{slide: -1, quiz: -1, complete: false}]}] },
  ],
  

  setCurrentTopic: (module, topic) => set((state) => {
    const modules = [...state.modules];
    if (modules?.[module] && topic < modules[module].topics.length) {
      modules[module].current = topic;
    }
    return { modules };
  }),

  setSlide: (module, topic, lesson, slide) => set((state) => {
    const modules = [...state.modules];
    if (modules?.[module]?.topics?.[topic]?.lessons?.[lesson]) {
      modules[module].topics[topic].lessons[lesson].slide = slide;
    }
    return { modules };
  }),

  setAssessmentScore: (module, topic, score) => set((state) => {
    const modules = [...state.modules];
    if (score > modules?.[module]?.topics?.[topic]?.assessment) {
      modules[module].topics[topic].assessment = score;
    }
    return { modules };
  }),

  setQuizScore: (module, topic, lesson, score) => set((state) => {
    const modules = [...state.modules];
    if (score > modules?.[module]?.topics?.[topic]?.lessons?.[lesson]?.quiz) {
      modules[module].topics[topic].lessons[lesson].quiz = score;
    }
    return { modules };
  }),

  setLessonComplete: (module, topic, lesson) => set((state) => {
    const modules = [...state.modules];
    if (modules?.[module]?.topics?.[topic]?.lessons?.[lesson]) {
      modules[module].topics[topic].lessons[lesson].complete = true;
    }
    return { modules };
  }),

  setTopicComplete: (module, topic) => set((state) => {
    const modules = [...state.modules];
    if (modules?.[module]?.topics?.[topic]) {
      modules[module].topics[topic].complete = true;
    }
    return { modules };
  }),
}));

export default useStore;
