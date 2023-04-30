import { ILesson } from "./ILesson";
import { IQuiz } from "./IQuiz";

export interface ITopic {
  title?: string;
  icon?: string;
  subTitle?: string;
  longText?: string;
  assessment?: IQuiz;
  lessons?: ILesson[];
}
