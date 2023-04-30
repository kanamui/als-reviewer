export interface IQuiz {
  name?: string;
  section?: string;
  header?: string;
  kicker?: string;
  title?: string;
  longText?: string;
  image?: string;
  items?: IQuestion[];
}

export interface IQuestion {
  title?: string;
  image?: string;
  answer?: string;
  choices?: string[];
}