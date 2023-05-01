import { ICta } from "../ICta";

export interface ILessonCard {
  score?: string;
  title?: string;
  longText?: string;
  icon?: string;
  sections?: ISection[];
  cta?: ICta;
  ctaComplete?: boolean;
  disabled?: boolean;
}

export interface ISection {
  title?: string;
  active?: boolean;
  complete?: boolean;
  onPress?: () => void;
}
