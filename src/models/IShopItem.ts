import { IPetActivity } from "./IPetActivity";

export interface IShopItem {
  title: string;
  image: string;
  price: number;
  activity: IPetActivity;
  longText?: string;
}
