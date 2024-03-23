import {Track} from "./track";

export interface PairWithTrack {
  round: number;
  number: number;
  leftNickname: string;
  middleNickname: string;
  rightNickname: string;
  leftTrack: Track;
  middleTrack: Track;
  rightTrack: Track;
  customName: string;
  winner: string;
}
