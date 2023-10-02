import firebase from "firebase/compat";
import Timestamp = firebase.firestore.Timestamp;

export interface RemoteConfig {
  currentRoundNumber: number;
  isRegistrationOpen: boolean;
  isTracksUploadOpen: boolean;
  customTimerEnabled: boolean;
  customTimerText: string;
  customTimerDate: Timestamp;
}
