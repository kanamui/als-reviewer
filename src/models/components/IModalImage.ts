import { ICta } from "../ICta";

export interface IModalImage {
  slides: IModalImageSlide[];
  show?: boolean;
  delay?: number;
  cta?: ICta;
}

export interface IModalImageSlide {
  image: any;
  title?: string;
}