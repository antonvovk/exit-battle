import {Track} from "./track";

export interface PairWithTrack {
  round: number;
  number: number;
  winnerNickname: string;
  leftNickname: string;
  middleNickname: string;
  rightNickname: string;
  leftTrack: Track;
  middleTrack: Track;
  rightTrack: Track;
}
