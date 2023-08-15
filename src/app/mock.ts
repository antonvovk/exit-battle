import {Round} from "./_models/round";

export const ROUNDS = [
  <Round>{
    order: 1,
    name: 'Раунд 1',
    numberOfTracks: 240,
    available: true,
    totalNumberOfJudges: 3,
    endDate: new Date('2023-08-30T00:00:00')
  },
  <Round>{
    order: 2,
    name: 'Раунд 2',
    numberOfTracks: 0,
    available: true,
    totalNumberOfJudges: 3,
    endDate: new Date('2023-08-30T00:00:00')
  },
  <Round>{
    order: 3,
    name: 'Раунд 3',
    numberOfTracks: 0,
    available: false,
    totalNumberOfJudges: 3,
    endDate: new Date('2023-08-30T00:00:00')
  },
  <Round>{
    order: 4,
    name: 'Раунд 4',
    numberOfTracks: 0,
    available: false,
    totalNumberOfJudges: 3,
    endDate: new Date('2023-08-30T00:00:00')
  },
  <Round>{
    order: 5,
    name: 'Раунд 5',
    numberOfTracks: 0,
    available: false,
    totalNumberOfJudges: 3,
    endDate: new Date('2023-08-30T00:00:00')
  },
  <Round>{
    order: 6,
    name: 'Раунд 6',
    numberOfTracks: 0,
    available: false,
    totalNumberOfJudges: 3,
    endDate: new Date('2023-08-30T00:00:00')
  }
];
