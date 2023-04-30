import { ICta } from "../ICta";

export interface ILayout {
  header?: ICta;
  subTitle?: string;
  kicker?: string;
  title?: string;
  longText?: string;
  image?: string;
  page?: string;
  cta?: ICta[];
}