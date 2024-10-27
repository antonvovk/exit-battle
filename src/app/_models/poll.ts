export interface Poll {
  id: string;
  name: string;
  type: PollType;
  status: PollStatus;
  options: PollOption[];
  round: number;
  winner: string;
  nominationName: string;
}

export enum PollType {
  TRACK = 'TRACK'
}

export enum PollStatus {
  ACTIVE = 'ACTIVE',
  CLOSED = 'CLOSED'
}

export interface PollOption {
  id: string;
  trackId: string;
}
