export interface FirebaseUser {
  uid: string;
  phoneNumber: string;
  nickname: string;
  canUploadTracks: boolean;
  role: 'participant' | 'spectator';
  isAdmin: boolean;
  division: number;
}
