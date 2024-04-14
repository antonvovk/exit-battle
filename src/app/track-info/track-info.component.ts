import {Component, inject, ViewEncapsulation} from '@angular/core';
import {DialogRef} from "@ngneat/dialog";
import {Data} from "@angular/router";
import {Track} from "../_models/track";
import {GlobalService} from "../_services/global.service";
import {Mark} from "../_models/mark";

@Component({
  selector: 'app-track-info',
  templateUrl: './track-info.component.html',
  styleUrls: ['./track-info.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class TrackInfoComponent {

  ref: DialogRef<Data> = inject(DialogRef);
  totalNumberOfJudges: number;
  track: Track;
  lyrics: string;
  selectedMenuItem: 'marks' | 'lyrics' = 'marks';

  constructor(service: GlobalService) {
    this.totalNumberOfJudges = this.ref.data['totalNumberOfJudges'];
    this.track = this.ref.data['track'];
    service.getLyrics(this.track).subscribe({
      next: value => {
        this.lyrics = value.get('text');
      }
    });
  }

  selectMarksMenuItem() {
    this.selectedMenuItem = 'marks';
  }

  selectLyricsMenuItem() {
    this.selectedMenuItem = 'lyrics';
  }

  getMarkText(mark: Mark): string {
    if (mark.text == null || mark.text.trim().length == 0) {
      return '<br>&nbsp;<br>'
    } else {
      return mark.text;
    }
  }

  getJudgeIconUrl(mark: Mark): string {
    let judgeIcon: string;
    switch (mark.judgeName) {
      case 'CRESCO':
        judgeIcon = 'judge_cresco.jpg';
        break;
      case 'Тур':
        judgeIcon = 'judge_tur.jpg';
        break;
      case 'Гоня':
        judgeIcon = 'judge_gonya.jpg';
        break;
      case 'Міша Правильний':
        judgeIcon = 'judge_misha.jpg';
        break;
      case 'Мамонт':
        judgeIcon = 'judge_mamont.jpg';
        break;
      case 'Денні Дельта':
        judgeIcon = 'judge_delta.jpg';
        break;
      case 'Міша MRK':
        judgeIcon = 'judge_misha_mrk.jpg';
        break;
      case 'XXV кадр':
        judgeIcon = 'judge_25_frame.jpg';
        break;
      case 'SDU':
        judgeIcon = 'judge_sdu.jpg';
        break;
      case 'OTOY':
        judgeIcon = 'otoy.png';
        break;
      case 'Libenson':
        judgeIcon = 'libenson.png';
        break;
      default:
        judgeIcon = 'default-judge.png';
        break;
    }

    return `assets/images/${judgeIcon}`;
  }
}
