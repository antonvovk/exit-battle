export interface Round {
  number: number;
  name: string;
  available: boolean;
  totalNumberOfJudges: number;
  endDate: Date;
  maximumTrackDurationInSeconds: number;
}
