export interface PollVote {
  [userId: string]: {
    [optionId: string]: boolean;
  };
}
