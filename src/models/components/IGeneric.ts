import { ICta } from "./ICta";

export interface IGeneric {
  header?: ICta;
  subTitle?: string;
  kicker?: string;
  title?: string;
  longText?: string;
  cta?: ICta;
}