import firebase from "firebase/compat";
import Timestamp = firebase.firestore.Timestamp;

export interface Round {
  number: number;
  name: string;
  available: boolean;
  totalNumberOfJudges: number;
  endDate: Timestamp;
  maximumTrackDurationInSeconds: number;
  maxFileUploadSizeInMb: number;
}
