import {Component, inject, ViewEncapsulation} from '@angular/core';
import {DialogRef} from "@ngneat/dialog";
import {Data} from "@angular/router";
import {Track} from "../_models/track";
import {GlobalService} from "../_services/global.service";
import {Mark} from "../_models/mark";
import {AngularFirestore} from "@angular/fire/compat/firestore";
import {ToastrService} from "ngx-toastr";

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
  editingMode: boolean = false;

  markToUpdate: Mark = <Mark>{
    performance: 0,
    content: 0,
    generalImpression: 0,
    text: '',
    judgeName: 'CRESCO'
  };
  bonusForBeatToUpdate: boolean = false;
  judges = [
    'CRESCO',
    'Тур',
    'Гоня',
    'Міша Правильний',
    'Мамонт',
    'Влад Павлов',
    'Міша MRK',
    'XXV кадр',
    'SDU',
    'OTOY',
    'Libenson'
  ];
  selectedJudge = 'CRESCO';

  constructor(private service: GlobalService,
              private toastr: ToastrService,
              private db: AngularFirestore) {
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
      case 'Влад Павлов':
        judgeIcon = 'judge_pavlov.jpg';
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

  isAdmin() {
    return this.service.isAdmin();
  }

  onEditClicked() {
    this.selectedJudge = 'CRESCO';
    this.bonusForBeatToUpdate = false;
    this.markToUpdate = <Mark>{
      performance: 0,
      content: 0,
      generalImpression: 0,
      text: '',
      judgeName: 'CRESCO'
    };
    this.editingMode = true;
  }

  onJudgeCommentInput(event: any) {
    this.markToUpdate.text = event.target.value.replace(/\n\r?/g, '<br/>');
  }

  markToUpdateSum(): number {
    const bonus: number = this.bonusForBeatToUpdate === true ? 1 : 0;
    const performance: number = this.markToUpdate.performance ?? 0;
    const content: number = this.markToUpdate.content ?? 0;
    const generalImpression: number = this.markToUpdate.generalImpression ?? 0;
    return performance + content + generalImpression + bonus;
  }

  updatePerformance(value: number) {
    this.markToUpdate.performance = value;
  }

  updateContent(value: number) {
    this.markToUpdate.content = value;
  }

  updateGeneralImpression(value: number) {
    this.markToUpdate.generalImpression = value;
  }

  updateBonus(value: number) {
    this.bonusForBeatToUpdate = value === 1;
  }

  submitMark() {
    this.markToUpdate.judgeName = this.selectedJudge;
    const marks = this.track.marks;
    marks.push(this.markToUpdate)
    this.db.collection('tracks').doc(this.track.id).update(<Track>{
      bonusForBeat: this.bonusForBeatToUpdate,
      marks: marks
    })
      .then(() => {
        this.track.marks = marks;
        this.track.bonusForBeat = this.bonusForBeatToUpdate;
      })
      .catch((error) => {
        this.service.handleFirebaseError(error);
      })
      .finally(() => {
        this.editingMode = false;
      });
  }

  removeMark(mark: Mark) {
    const marks = this.track.marks.filter(it => it.judgeName !== mark.judgeName);

    this.db.collection('tracks').doc(this.track.id).update(<Track>{
      bonusForBeat: false,
      marks: marks
    })
      .then(() => {
        this.track.marks = marks;
        this.track.bonusForBeat = false;
      })
      .catch((error) => {
        this.service.handleFirebaseError(error);
      })
      .finally(() => {
        this.editingMode = false;
      });
  }
}
