import AsyncStorage from "@react-native-async-storage/async-storage";
import { persist, createJSONStorage } from "zustand/middleware";
import { create } from "zustand";
import { IPetActivity } from "../models/IPetActivity";

interface ILessonStore {
  slide: number;
  quiz: number;
  half: boolean;
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

interface IPetStore {
  activity: IPetActivity;
  mood: number;
  help: boolean;
}

interface ISettingStore {
  help: boolean;
  coins: number;
}

interface IGlobalStore {
  modules: IModuleStore[];
  pet: IPetStore;
  settings: ISettingStore;

  homeHelpDone: () => void;
  petHelpDone: () => void;

  addCoins: (value: number) => void;
  buyTreat: (price: number, activity: IPetActivity) => void;

  setCurrentTopic: (module: number, topic: number) => void;
  setSlide: (module: number, topic: number, lesson: number, slide: number) => void;
  slideIncrement: (module: number, topic: number, lesson: number) => void;
  setAssessmentScore: (module: number, topic: number, score: number) => void;
  setQuizScore: (module: number, topic: number, lesson: number, score: number) => void;
  setLessonHalfReached: (module: number, topic: number, lesson: number) => void;
  setLessonComplete: (module: number, topic: number, lesson: number) => void;
  setTopicComplete: (module: number, topic: number) => void;
}

const useStore = create(
  persist<IGlobalStore>(
    (set, get) => ({
      modules: [
        { current: 0, topics: [{assessment: -1, complete: false, lessons: [{slide: 0, quiz: -1, half: false, complete: false},{slide: -1, quiz: -1, half: false, complete: false},{slide: -1, quiz: -1, half: false, complete: false}]},{assessment: -1, complete: false, lessons: [{slide: 0, quiz: -1, half: false, complete: false},{slide: -1, quiz: -1, half: false, complete: false},{slide: -1, quiz: -1, half: false, complete: false}]},{assessment: -1, complete: false, lessons: [{slide: 0, quiz: -1, half: false, complete: false},{slide: -1, quiz: -1, half: false, complete: false},{slide: -1, quiz: -1, half: false, complete: false}]}] },
        { current: 0, topics: [{assessment: -1, complete: false, lessons: [{slide: 0, quiz: -1, half: false, complete: false},{slide: -1, quiz: -1, half: false, complete: false},{slide: -1, quiz: -1, half: false, complete: false}]},{assessment: -1, complete: false, lessons: [{slide: 0, quiz: -1, half: false, complete: false},{slide: -1, quiz: -1, half: false, complete: false},{slide: -1, quiz: -1, half: false, complete: false}]},{assessment: -1, complete: false, lessons: [{slide: 0, quiz: -1, half: false, complete: false},{slide: -1, quiz: -1, half: false, complete: false},{slide: -1, quiz: -1, half: false, complete: false}]}] },
        { current: 0, topics: [{assessment: -1, complete: false, lessons: [{slide: 0, quiz: -1, half: false, complete: false},{slide: -1, quiz: -1, half: false, complete: false},{slide: -1, quiz: -1, half: false, complete: false}]},{assessment: -1, complete: false, lessons: [{slide: 0, quiz: -1, half: false, complete: false},{slide: -1, quiz: -1, half: false, complete: false},{slide: -1, quiz: -1, half: false, complete: false}]},{assessment: -1, complete: false, lessons: [{slide: 0, quiz: -1, half: false, complete: false},{slide: -1, quiz: -1, half: false, complete: false},{slide: -1, quiz: -1, half: false, complete: false}]}] },
        { current: 0, topics: [{assessment: -1, complete: false, lessons: [{slide: 0, quiz: -1, half: false, complete: false},{slide: -1, quiz: -1, half: false, complete: false},{slide: -1, quiz: -1, half: false, complete: false}]},{assessment: -1, complete: false, lessons: [{slide: 0, quiz: -1, half: false, complete: false},{slide: -1, quiz: -1, half: false, complete: false},{slide: -1, quiz: -1, half: false, complete: false}]},{assessment: -1, complete: false, lessons: [{slide: 0, quiz: -1, half: false, complete: false},{slide: -1, quiz: -1, half: false, complete: false},{slide: -1, quiz: -1, half: false, complete: false}]}] },
        { current: 0, topics: [{assessment: -1, complete: false, lessons: [{slide: 0, quiz: -1, half: false, complete: false},{slide: -1, quiz: -1, half: false, complete: false},{slide: -1, quiz: -1, half: false, complete: false}]},{assessment: -1, complete: false, lessons: [{slide: 0, quiz: -1, half: false, complete: false},{slide: -1, quiz: -1, half: false, complete: false},{slide: -1, quiz: -1, half: false, complete: false}]},{assessment: -1, complete: false, lessons: [{slide: 0, quiz: -1, half: false, complete: false},{slide: -1, quiz: -1, half: false, complete: false},{slide: -1, quiz: -1, half: false, complete: false}]}] },
        { current: 0, topics: [{assessment: -1, complete: false, lessons: [{slide: 0, quiz: -1, half: false, complete: false},{slide: -1, quiz: -1, half: false, complete: false},{slide: -1, quiz: -1, half: false, complete: false}]},{assessment: -1, complete: false, lessons: [{slide: 0, quiz: -1, half: false, complete: false},{slide: -1, quiz: -1, half: false, complete: false},{slide: -1, quiz: -1, half: false, complete: false}]},{assessment: -1, complete: false, lessons: [{slide: 0, quiz: -1, half: false, complete: false},{slide: -1, quiz: -1, half: false, complete: false},{slide: -1, quiz: -1, half: false, complete: false}]}] },
      ],
      pet: {
        activity: "sleep",
        mood: 0,
        help: true,
      },
      settings: {
        help: true,
        coins: 0,
      },

      homeHelpDone: () =>
        set((state) => {
          state.settings.help = false;
          return state;
        }),
      
      petHelpDone: () =>
        set((state) => {
          state.pet.help = false;
          return state;
        }),

      addCoins: (value) =>
        set((state) => {
          state.settings.coins += value;
          return state;
        }),

      buyTreat: (price, activity) =>
        set((state) => {
          state.settings.coins -= price;
          state.pet.activity = activity;
          state.pet.mood += 20;
          if (state.pet.mood > 100) state.pet.mood = 100;
          return state;
        }),

      setCurrentTopic: (module, topic) =>
        set((state) => {
          const modules = [...state.modules];
          if (modules?.[module] && topic < modules[module].topics.length) {
            modules[module].current = topic;
          }
          return { modules };
        }),

      setSlide: (module, topic, lesson, slide) =>
        set((state) => {
          const modules = [...state.modules];
          if (modules?.[module]?.topics?.[topic]?.lessons?.[lesson]) {
            modules[module].topics[topic].lessons[lesson].slide = slide;
          }
          return { modules };
        }),

      slideIncrement: (module, topic, lesson) =>
        set((state) => {
          const modules = [...state.modules];
          if (modules?.[module]?.topics?.[topic]?.lessons?.[lesson]) {
            modules[module].topics[topic].lessons[lesson].slide += 1;
          }
          return { modules };
        }),

      setAssessmentScore: (module, topic, score) =>
        set((state) => {
          const modules = [...state.modules];
          if (score > modules?.[module]?.topics?.[topic]?.assessment) {
            modules[module].topics[topic].assessment = score;
          }
          return { modules };
        }),

      setQuizScore: (module, topic, lesson, score) =>
        set((state) => {
          const modules = [...state.modules];
          if (
            score > modules?.[module]?.topics?.[topic]?.lessons?.[lesson]?.quiz
          ) {
            modules[module].topics[topic].lessons[lesson].quiz = score;
          }
          return { modules };
        }),

      setLessonComplete: (module, topic, lesson) =>
        set((state) => {
          const modules = [...state.modules];
          if (modules?.[module]?.topics?.[topic]?.lessons?.[lesson]) {
            modules[module].topics[topic].lessons[lesson].complete = true;
          }
          return { modules };
        }),

      setLessonHalfReached: (module, topic, lesson) =>
        set((state) => {
          const modules = [...state.modules];
          if (modules?.[module]?.topics?.[topic]?.lessons?.[lesson]) {
            modules[module].topics[topic].lessons[lesson].half = true;
          }
          return { modules };
        }),

      setTopicComplete: (module, topic) =>
        set((state) => {
          const modules = [...state.modules];
          if (modules?.[module]?.topics?.[topic]) {
            modules[module].topics[topic].complete = true;
          }
          return { modules };
        }),
    }),
    {
      name: "als-storage",
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);

export default useStore;
