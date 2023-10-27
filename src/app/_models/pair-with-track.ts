import {Track} from "./track";

export interface PairWithTrack {
  round: number;
  leftNickname: string;
  rightNickname: string;
  leftTrack: Track;
  rightTrack: Track;
}
