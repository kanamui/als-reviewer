import { ITopic } from "../ITopic";

export interface ITopicCard {
  data?: ITopic;
  active?: boolean;
  complete?: boolean;
  progress?: number;
  onPress?: () => void;
}