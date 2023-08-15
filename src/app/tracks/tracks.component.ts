import {Component, OnInit} from '@angular/core';
import {Track} from "../_models/track";
import {Round} from "../_models/round";
import {GlobalService} from "../_services/global.service";
import {TrackUploadComponent} from "../track-upload/track-upload.component";
import {ToastrService} from "ngx-toastr";

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

  rounds: Round[] = [];
  selectedRound = <Round>{};
  currentPage = 0;
  totalPages = 0

  constructor(private service: GlobalService,
              private toastr: ToastrService) {
  }

  ngOnInit() {
    this.rounds = this.service.getRounds();
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

  public openTrackUploadDialog(): void {
    if (!this.service.isLoggedIn) {
      this.toastr.info("Щоб здати трек потрібно авторизуватися");
      return;
    }
    this.service.openDialog(TrackUploadComponent, {
      width: 650
    });
  }
}
