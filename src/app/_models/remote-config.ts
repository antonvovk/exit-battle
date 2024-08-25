import firebase from "firebase/compat";
import Timestamp = firebase.firestore.Timestamp;

export interface RemoteConfig {
  currentRoundNumber: number;
  canNewUsersUploadTracks: boolean;
  isTracksUploadOpen: boolean;
  customTimerEnabled: boolean;
  customTimerText: string;
  customTimerDate: Timestamp;
}
