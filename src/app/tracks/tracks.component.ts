import {Component, OnInit} from '@angular/core';
import {Track} from "../models/track";
import {Round} from "../models/round";

@Component({
  selector: 'app-tracks',
  templateUrl: './tracks.component.html',
  styleUrls: ['./tracks.component.scss']
})
export class TracksComponent implements OnInit {

  tracks = [
    <Track>{
      round: 1,
      nickname: 'Нікнейм',
      duration: 62,
      audioUrl: 'https://firebasestorage.googleapis.com/v0/b/exit-battle.appspot.com/o/qualifications%2FTiesto%20-%20The%20Business.mp3?alt=media&token=e798dd8a-95d6-4d6a-bc5f-d8a389e48500',
      passedToNextRound: false,
      marks: [
        {
          performance: 3.9,
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
      audioUrl: 'https://firebasestorage.googleapis.com/v0/b/exit-battle.appspot.com/o/qualifications%2FTiesto%20-%20The%20Business.mp3?alt=media&token=e798dd8a-95d6-4d6a-bc5f-d8a389e48500',
      passedToNextRound: false,
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
      audioUrl: 'https://firebasestorage.googleapis.com/v0/b/exit-battle.appspot.com/o/qualifications%2FTiesto%20-%20The%20Business.mp3?alt=media&token=e798dd8a-95d6-4d6a-bc5f-d8a389e48500',
      passedToNextRound: false,
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
      audioUrl: 'https://firebasestorage.googleapis.com/v0/b/exit-battle.appspot.com/o/qualifications%2FTiesto%20-%20The%20Business.mp3?alt=media&token=e798dd8a-95d6-4d6a-bc5f-d8a389e48500',
      passedToNextRound: false,
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
      audioUrl: 'https://firebasestorage.googleapis.com/v0/b/exit-battle.appspot.com/o/qualifications%2FTiesto%20-%20The%20Business.mp3?alt=media&token=e798dd8a-95d6-4d6a-bc5f-d8a389e48500',
      passedToNextRound: false,
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
      audioUrl: 'https://firebasestorage.googleapis.com/v0/b/exit-battle.appspot.com/o/qualifications%2FTiesto%20-%20The%20Business.mp3?alt=media&token=e798dd8a-95d6-4d6a-bc5f-d8a389e48500',
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
        }
      ]
    },
    <Track>{
      round: 1,
      nickname: 'Нікнейм',
      duration: 62,
      audioUrl: 'https://firebasestorage.googleapis.com/v0/b/exit-battle.appspot.com/o/qualifications%2FTiesto%20-%20The%20Business.mp3?alt=media&token=e798dd8a-95d6-4d6a-bc5f-d8a389e48500',
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
      audioUrl: 'https://firebasestorage.googleapis.com/v0/b/exit-battle.appspot.com/o/qualifications%2FTiesto%20-%20The%20Business.mp3?alt=media&token=e798dd8a-95d6-4d6a-bc5f-d8a389e48500',
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
      audioUrl: 'https://firebasestorage.googleapis.com/v0/b/exit-battle.appspot.com/o/qualifications%2FTiesto%20-%20The%20Business.mp3?alt=media&token=e798dd8a-95d6-4d6a-bc5f-d8a389e48500',
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
      audioUrl: 'https://firebasestorage.googleapis.com/v0/b/exit-battle.appspot.com/o/qualifications%2FTiesto%20-%20The%20Business.mp3?alt=media&token=e798dd8a-95d6-4d6a-bc5f-d8a389e48500',
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
      audioUrl: 'https://firebasestorage.googleapis.com/v0/b/exit-battle.appspot.com/o/qualifications%2FTiesto%20-%20The%20Business.mp3?alt=media&token=e798dd8a-95d6-4d6a-bc5f-d8a389e48500',
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
      audioUrl: 'https://firebasestorage.googleapis.com/v0/b/exit-battle.appspot.com/o/qualifications%2FTiesto%20-%20The%20Business.mp3?alt=media&token=e798dd8a-95d6-4d6a-bc5f-d8a389e48500',
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
      audioUrl: 'https://firebasestorage.googleapis.com/v0/b/exit-battle.appspot.com/o/qualifications%2FTiesto%20-%20The%20Business.mp3?alt=media&token=e798dd8a-95d6-4d6a-bc5f-d8a389e48500',
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
      audioUrl: 'https://firebasestorage.googleapis.com/v0/b/exit-battle.appspot.com/o/qualifications%2FTiesto%20-%20The%20Business.mp3?alt=media&token=e798dd8a-95d6-4d6a-bc5f-d8a389e48500',
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
      audioUrl: 'https://firebasestorage.googleapis.com/v0/b/exit-battle.appspot.com/o/qualifications%2FTiesto%20-%20The%20Business.mp3?alt=media&token=e798dd8a-95d6-4d6a-bc5f-d8a389e48500',
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

  rounds = [
    <Round>{
      order: 1,
      name: 'Раунд 1',
      numberOfTracks: 240,
      available: true
    },
    <Round>{
      order: 2,
      name: 'Раунд 2',
      numberOfTracks: 0,
      available: true
    },
    <Round>{
      order: 3,
      name: 'Раунд 3',
      numberOfTracks: 0,
      available: false
    },
    <Round>{
      order: 4,
      name: 'Раунд 4',
      numberOfTracks: 0,
      available: false
    },
    <Round>{
      order: 5,
      name: 'Раунд 5',
      numberOfTracks: 0,
      available: false
    },
    <Round>{
      order: 6,
      name: 'Раунд 6',
      numberOfTracks: 0,
      available: false
    }
  ]

  selectedRound = <Round>{};
  currentPage = 0;
  totalPages = 0

  ngOnInit() {
    this.selectRound(this.rounds[0]);
  }

  selectRound(round: Round): void {
    this.selectedRound = round;
    this.currentPage = 0;
    this.totalPages = Math.floor(round.numberOfTracks / 15);
  }

  prevPage() {
    if (this.currentPage <= 0) {
      return;
    }
    --this.currentPage;
  }

  nextPage() {
    if (this.currentPage >= (this.totalPages - 1)) {
      return;
    }
    ++this.currentPage;
  }

  getPageNumberInFormat(): string {
    if (this.currentPage <= 8) {
      return '0' + (this.currentPage + 1);
    }
    return (this.currentPage + 1) + '';
  }

  getTotalPagesInFormat(): string {
    if (this.totalPages <= 9) {
      return '0' + this.totalPages;
    }
    return this.totalPages + '';
  }
}
