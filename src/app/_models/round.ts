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
  theme: string;
  hasMultipleDivisions: boolean;
  firstDivisionTheme: string;
  firstDivisionEndDate: Timestamp;
  secondDivisionTheme: string;
  secondDivisionEndDate: Timestamp;
}
