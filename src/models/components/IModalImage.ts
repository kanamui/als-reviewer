import { ICta } from "../ICta";

export interface IModalImage {
  slides: IModalImageSlide[];
  show?: boolean;
  delay?: number;
  cta?: ICta;
  closeAlign?: "left" | "right";
  onClose?: () => void;
}

export interface IModalImageSlide {
  image: any;
  title?: string;
  hideClose?: boolean;
}