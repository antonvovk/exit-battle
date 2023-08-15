import {Round} from "./_models/round";
import {Track} from "./_models/track";

export const ROUNDS = [
  <Round>{
    order: 1,
    name: 'Раунд 1',
    numberOfTracks: 240,
    available: true,
    totalNumberOfJudges: 3,
    endDate: new Date('2023-08-30T00:00:00'),
    maximumTrackDurationInSeconds: 164
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

export const TRACKS = [
  <Track>{
    round: 1,
    nickname: 'Нікнейм',
    duration: 62,
    audioUrl: 'https://firebasestorage.googleapis.com/v0/b/exit-battle.appspot.com/o/qualifications%2FTiesto%20-%20The%20Business.mp3?alt=media&token=1f8e9c9d-72c7-4b98-92cc-43a6a076736f',
    passedToNextRound: false,
    marks: [
      {
        performance: 3.9,
        content: 1.8,
        generalImpression: 1.3,
        judgeName: 'Крекер',
        judgeIcon: 'https://cdn-icons-png.flaticon.com/512/3135/3135715.png',
        text: 'Трек не сподобався, не моє. Але панч про Віктора Ющенка - розйоб! Зведення могло бути кращим, тому ЗВ занизив.'
      },
      {
        performance: 3.1,
        content: 1.8,
        generalImpression: 1.3,
        judgeName: 'Крекер',
        judgeIcon: 'https://cdn-icons-png.flaticon.com/512/3135/3135715.png',
        text: 'Трек не сподобався, не моє. Але панч про Віктора Ющенка - розйоб! Зведення могло бути кращим, тому ЗВ занизив.'
      },
      {
        performance: 3.1,
        content: 1.8,
        generalImpression: 1.3,
        judgeName: 'Крекер',
        judgeIcon: 'https://cdn-icons-png.flaticon.com/512/3135/3135715.png',
        text: 'Трек не сподобався, не моє. Але панч про Віктора Ющенка - розйоб! Зведення могло бути кращим, тому ЗВ занизив.'
      }
    ]
  },
  <Track>{
    round: 1,
    nickname: 'Нікнейм',
    duration: 62,
    audioUrl: 'https://firebasestorage.googleapis.com/v0/b/exit-battle.appspot.com/o/qualifications%2FTiesto%20-%20The%20Business.mp3?alt=media&token=1f8e9c9d-72c7-4b98-92cc-43a6a076736f',
    passedToNextRound: false,
    marks: [
      {
        performance: 3.1,
        content: 1.8,
        generalImpression: 1.3,
        judgeName: 'Крекер',
        judgeIcon: 'https://cdn-icons-png.flaticon.com/512/3135/3135715.png'
      },
      {
        performance: 3.1,
        content: 1.8,
        generalImpression: 1.3,
        judgeName: 'Крекер',
        judgeIcon: 'https://cdn-icons-png.flaticon.com/512/3135/3135715.png'
      },
      {
        performance: 3.1,
        content: 1.8,
        generalImpression: 1.3,
        judgeName: 'Крекер',
        judgeIcon: 'https://cdn-icons-png.flaticon.com/512/3135/3135715.png'
      }
    ]
  },
  <Track>{
    round: 1,
    nickname: 'Нікнейм',
    duration: 62,
    audioUrl: 'https://firebasestorage.googleapis.com/v0/b/exit-battle.appspot.com/o/qualifications%2FTiesto%20-%20The%20Business.mp3?alt=media&token=1f8e9c9d-72c7-4b98-92cc-43a6a076736f',
    passedToNextRound: false,
    marks: [
      {
        performance: 3.1,
        content: 1.8,
        generalImpression: 1.3,
        judgeName: 'Крекер',
        judgeIcon: 'https://cdn-icons-png.flaticon.com/512/3135/3135715.png'
      },
      {
        performance: 3.1,
        content: 1.8,
        generalImpression: 1.3,
        judgeName: 'Крекер',
        judgeIcon: 'https://cdn-icons-png.flaticon.com/512/3135/3135715.png'
      },
      {
        performance: 3.1,
        content: 1.8,
        generalImpression: 1.3,
        judgeName: 'Крекер',
        judgeIcon: 'https://cdn-icons-png.flaticon.com/512/3135/3135715.png'
      }
    ]
  },
  <Track>{
    round: 1,
    nickname: 'Нікнейм',
    duration: 62,
    audioUrl: 'https://firebasestorage.googleapis.com/v0/b/exit-battle.appspot.com/o/qualifications%2FTiesto%20-%20The%20Business.mp3?alt=media&token=1f8e9c9d-72c7-4b98-92cc-43a6a076736f',
    passedToNextRound: false,
    marks: [
      {
        performance: 3.1,
        content: 1.8,
        generalImpression: 1.3,
        judgeName: 'Крекер',
        judgeIcon: 'https://cdn-icons-png.flaticon.com/512/3135/3135715.png'
      },
      {
        performance: 3.1,
        content: 1.8,
        generalImpression: 1.3,
        judgeName: 'Крекер',
        judgeIcon: 'https://cdn-icons-png.flaticon.com/512/3135/3135715.png'
      },
      {
        performance: 3.1,
        content: 1.8,
        generalImpression: 1.3,
        judgeName: 'Крекер',
        judgeIcon: 'https://cdn-icons-png.flaticon.com/512/3135/3135715.png'
      }
    ]
  },
  <Track>{
    round: 1,
    nickname: 'Нікнейм',
    duration: 62,
    audioUrl: 'https://firebasestorage.googleapis.com/v0/b/exit-battle.appspot.com/o/qualifications%2FTiesto%20-%20The%20Business.mp3?alt=media&token=1f8e9c9d-72c7-4b98-92cc-43a6a076736f',
    passedToNextRound: false,
    marks: [
      {
        performance: 3.1,
        content: 1.8,
        generalImpression: 1.3,
        judgeName: 'Крекер',
        judgeIcon: 'https://cdn-icons-png.flaticon.com/512/3135/3135715.png'
      },
      {
        performance: 3.1,
        content: 1.8,
        generalImpression: 1.3,
        judgeName: 'Крекер',
        judgeIcon: 'https://cdn-icons-png.flaticon.com/512/3135/3135715.png'
      },
      {
        performance: 3.1,
        content: 1.8,
        generalImpression: 1.3,
        judgeName: 'Крекер',
        judgeIcon: 'https://cdn-icons-png.flaticon.com/512/3135/3135715.png'
      }
    ]
  },
  <Track>{
    round: 1,
    nickname: 'Нікнейм',
    duration: 62,
    audioUrl: 'https://firebasestorage.googleapis.com/v0/b/exit-battle.appspot.com/o/qualifications%2FTiesto%20-%20The%20Business.mp3?alt=media&token=1f8e9c9d-72c7-4b98-92cc-43a6a076736f',
    passedToNextRound: true,
    marks: [
      {
        performance: 3.1,
        content: 1.8,
        generalImpression: 1.3,
        judgeName: 'Крекер',
        judgeIcon: 'https://cdn-icons-png.flaticon.com/512/3135/3135715.png'
      },
      {
        performance: 3.1,
        content: 1.8,
        generalImpression: 1.3,
        judgeName: 'Крекер',
        judgeIcon: 'https://cdn-icons-png.flaticon.com/512/3135/3135715.png'
      }
    ]
  },
  <Track>{
    round: 1,
    nickname: 'Нікнейм',
    duration: 62,
    audioUrl: 'https://firebasestorage.googleapis.com/v0/b/exit-battle.appspot.com/o/qualifications%2FTiesto%20-%20The%20Business.mp3?alt=media&token=1f8e9c9d-72c7-4b98-92cc-43a6a076736f',
    passedToNextRound: true,
    marks: [
      {
        performance: 3.1,
        content: 1.8,
        generalImpression: 1.3,
        judgeName: 'Крекер',
        judgeIcon: 'https://cdn-icons-png.flaticon.com/512/3135/3135715.png'
      },
      {
        performance: 3.1,
        content: 1.8,
        generalImpression: 1.3,
        judgeName: 'Крекер',
        judgeIcon: 'https://cdn-icons-png.flaticon.com/512/3135/3135715.png'
      },
      {
        performance: 3.1,
        content: 1.8,
        generalImpression: 1.3,
        judgeName: 'Крекер',
        judgeIcon: 'https://cdn-icons-png.flaticon.com/512/3135/3135715.png'
      }
    ]
  },
  <Track>{
    round: 1,
    nickname: 'Нікнейм',
    duration: 62,
    audioUrl: 'https://firebasestorage.googleapis.com/v0/b/exit-battle.appspot.com/o/qualifications%2FTiesto%20-%20The%20Business.mp3?alt=media&token=1f8e9c9d-72c7-4b98-92cc-43a6a076736f',
    passedToNextRound: true,
    marks: [
      {
        performance: 3.1,
        content: 1.8,
        generalImpression: 1.3,
        judgeName: 'Крекер',
        judgeIcon: 'https://cdn-icons-png.flaticon.com/512/3135/3135715.png'
      },
      {
        performance: 3.1,
        content: 1.8,
        generalImpression: 1.3,
        judgeName: 'Крекер',
        judgeIcon: 'https://cdn-icons-png.flaticon.com/512/3135/3135715.png'
      },
      {
        performance: 3.1,
        content: 1.8,
        generalImpression: 1.3,
        judgeName: 'Крекер',
        judgeIcon: 'https://cdn-icons-png.flaticon.com/512/3135/3135715.png'
      }
    ]
  },
  <Track>{
    round: 1,
    nickname: 'Нікнейм',
    duration: 62,
    audioUrl: 'https://firebasestorage.googleapis.com/v0/b/exit-battle.appspot.com/o/qualifications%2FTiesto%20-%20The%20Business.mp3?alt=media&token=1f8e9c9d-72c7-4b98-92cc-43a6a076736f',
    passedToNextRound: true,
    marks: [
      {
        performance: 3.1,
        content: 1.8,
        generalImpression: 1.3,
        judgeName: 'Крекер',
        judgeIcon: 'https://cdn-icons-png.flaticon.com/512/3135/3135715.png'
      },
      {
        performance: 3.1,
        content: 1.8,
        generalImpression: 1.3,
        judgeName: 'Крекер',
        judgeIcon: 'https://cdn-icons-png.flaticon.com/512/3135/3135715.png'
      },
      {
        performance: 3.1,
        content: 1.8,
        generalImpression: 1.3,
        judgeName: 'Крекер',
        judgeIcon: 'https://cdn-icons-png.flaticon.com/512/3135/3135715.png'
      }
    ]
  },
  <Track>{
    round: 1,
    nickname: 'Нікнейм',
    duration: 62,
    audioUrl: 'https://firebasestorage.googleapis.com/v0/b/exit-battle.appspot.com/o/qualifications%2FTiesto%20-%20The%20Business.mp3?alt=media&token=1f8e9c9d-72c7-4b98-92cc-43a6a076736f',
    passedToNextRound: true,
    marks: [
      {
        performance: 3.1,
        content: 1.8,
        generalImpression: 1.3,
        judgeName: 'Крекер',
        judgeIcon: 'https://cdn-icons-png.flaticon.com/512/3135/3135715.png'
      },
      {
        performance: 3.1,
        content: 1.8,
        generalImpression: 1.3,
        judgeName: 'Крекер',
        judgeIcon: 'https://cdn-icons-png.flaticon.com/512/3135/3135715.png'
      },
      {
        performance: 3.1,
        content: 1.8,
        generalImpression: 1.3,
        judgeName: 'Крекер',
        judgeIcon: 'https://cdn-icons-png.flaticon.com/512/3135/3135715.png'
      }
    ]
  },
  <Track>{
    round: 1,
    nickname: 'Нікнейм',
    duration: 62,
    audioUrl: 'https://firebasestorage.googleapis.com/v0/b/exit-battle.appspot.com/o/qualifications%2FTiesto%20-%20The%20Business.mp3?alt=media&token=1f8e9c9d-72c7-4b98-92cc-43a6a076736f',
    passedToNextRound: true,
    marks: [
      {
        performance: 3.1,
        content: 1.8,
        generalImpression: 1.3,
        judgeName: 'Крекер',
        judgeIcon: 'https://cdn-icons-png.flaticon.com/512/3135/3135715.png'
      },
      {
        performance: 3.1,
        content: 1.8,
        generalImpression: 1.3,
        judgeName: 'Крекер',
        judgeIcon: 'https://cdn-icons-png.flaticon.com/512/3135/3135715.png'
      },
      {
        performance: 3.1,
        content: 1.8,
        generalImpression: 1.3,
        judgeName: 'Крекер',
        judgeIcon: 'https://cdn-icons-png.flaticon.com/512/3135/3135715.png'
      }
    ]
  },
  <Track>{
    round: 1,
    nickname: 'Нікнейм',
    duration: 62,
    audioUrl: 'https://firebasestorage.googleapis.com/v0/b/exit-battle.appspot.com/o/qualifications%2FTiesto%20-%20The%20Business.mp3?alt=media&token=1f8e9c9d-72c7-4b98-92cc-43a6a076736f',
    passedToNextRound: true,
    marks: [
      {
        performance: 3.1,
        content: 1.8,
        generalImpression: 1.3,
        judgeName: 'Крекер',
        judgeIcon: 'https://cdn-icons-png.flaticon.com/512/3135/3135715.png'
      },
      {
        performance: 3.1,
        content: 1.8,
        generalImpression: 1.3,
        judgeName: 'Крекер',
        judgeIcon: 'https://cdn-icons-png.flaticon.com/512/3135/3135715.png'
      },
      {
        performance: 3.1,
        content: 1.8,
        generalImpression: 1.3,
        judgeName: 'Крекер',
        judgeIcon: 'https://cdn-icons-png.flaticon.com/512/3135/3135715.png'
      }
    ]
  },
  <Track>{
    round: 1,
    nickname: 'Нікнейм',
    duration: 62,
    audioUrl: 'https://firebasestorage.googleapis.com/v0/b/exit-battle.appspot.com/o/qualifications%2FTiesto%20-%20The%20Business.mp3?alt=media&token=1f8e9c9d-72c7-4b98-92cc-43a6a076736f',
    passedToNextRound: true,
    marks: [
      {
        performance: 3.1,
        content: 1.8,
        generalImpression: 1.3
      },
      {
        performance: 3.1,
        content: 1.8,
        generalImpression: 1.3
      },
      {
        performance: 3.1,
        content: 1.8,
        generalImpression: 1.3
      }
    ]
  },
  <Track>{
    round: 1,
    nickname: 'Нікнейм',
    duration: 62,
    audioUrl: 'https://firebasestorage.googleapis.com/v0/b/exit-battle.appspot.com/o/qualifications%2FTiesto%20-%20The%20Business.mp3?alt=media&token=1f8e9c9d-72c7-4b98-92cc-43a6a076736f',
    passedToNextRound: true,
    marks: [
      {
        performance: 3.1,
        content: 1.8,
        generalImpression: 1.3
      },
      {
        performance: 3.1,
        content: 1.8,
        generalImpression: 1.3
      },
      {
        performance: 3.1,
        content: 1.8,
        generalImpression: 1.3
      }
    ]
  },
  <Track>{
    round: 1,
    nickname: 'Нікнейм',
    duration: 62,
    audioUrl: 'https://firebasestorage.googleapis.com/v0/b/exit-battle.appspot.com/o/qualifications%2FTiesto%20-%20The%20Business.mp3?alt=media&token=1f8e9c9d-72c7-4b98-92cc-43a6a076736f',
    passedToNextRound: true,
    marks: [
      {
        performance: 3.1,
        content: 1.8,
        generalImpression: 1.3
      },
      {
        performance: 3.1,
        content: 1.8,
        generalImpression: 1.3
      },
      {
        performance: 3.1,
        content: 1.8,
        generalImpression: 1.3
      }
    ]
  }
];