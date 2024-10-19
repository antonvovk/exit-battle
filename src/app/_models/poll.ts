export interface Poll {
  id: string;
  name: string;
  type: PollType;
  status: PollStatus;
  options: PollOption[];
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
