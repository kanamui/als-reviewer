import { ITopic } from "../ITopic";

export interface ITopicCard {
  data?: ITopic;
  active?: boolean;
  complete?: boolean;
  onPress: () => void;
}