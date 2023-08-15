import {Mark} from "./mark";

export interface Track {
  id: string;
  round: number;
  nickname: string;
  duration: number;
  audioUrl: string;
  passedToNextRound: boolean;
  marks: Mark[];
  uploadDate: Date;
}
