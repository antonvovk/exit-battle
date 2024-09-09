import {Mark} from "./mark";
import firebase from "firebase/compat";
import Timestamp = firebase.firestore.Timestamp;

export interface Track {
  id: string;
  round: number;
  nickname: string;
  duration: number;
  audioUrl: string;
  passedToNextRound: boolean;
  marks: Mark[];
  uploadDate: Timestamp;
}
