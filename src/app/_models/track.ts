import {Mark} from "./mark";

export interface Track {
  round: number;
  nickname: string;
  duration: number;
  audioUrl: string;
  passedToNextRound: boolean;
  marks: Mark[];
}
