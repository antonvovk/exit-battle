export interface Round {
  order: number;
  name: string;
  numberOfTracks: number;
  available: boolean;
  totalNumberOfJudges: number;
  endDate: Date;
}
