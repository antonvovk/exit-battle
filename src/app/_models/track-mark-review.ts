export interface TrackMarkReview {
  [userId: string]: {
    [judgeName: string]: boolean;
  };
}
