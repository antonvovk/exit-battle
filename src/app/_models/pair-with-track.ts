import {Track} from "./track";

export interface PairWithTrack {
  round: number;
  leftNickname: string;
  middleNickname: string;
  rightNickname: string;
  leftTrack: Track;
  middleTrack: Track;
  rightTrack: Track;
}
