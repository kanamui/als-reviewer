import { IQuiz } from "./IQuiz";
import { ISlide } from "./ISlide";

export interface ILesson {
  title?: string;
  subTitle?: string;
  items?: ISlide[];
  quiz?: IQuiz;
}