import {Component, inject, OnDestroy, ViewEncapsulation} from '@angular/core';
import {DialogRef} from "@ngneat/dialog";
import {Data} from "@angular/router";
import {Track} from "../_models/track";
import {GlobalService} from "../_services/global.service";
import {Mark} from "../_models/mark";
import {AngularFirestore} from "@angular/fire/compat/firestore";
import {ToastrService} from "ngx-toastr";
import {arrayRemove, arrayUnion} from "@angular/fire/firestore";
import {Subject, takeUntil} from "rxjs";
import {TrackMarkReview} from "../_models/track-mark-review";

@Component({
  selector: 'app-track-info',
  templateUrl: './track-info.component.html',
  styleUrls: ['./track-info.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class TrackInfoComponent implements OnDestroy {

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
    text: ''
  };
  judges = [
    'CRESCO',
    'Тур',
    'Міша Правильний',
    'Мамонт',
    'Влад Павлов',
    'Міша MRK',
    'XXV кадр',
    'SDU',
    'OTOY',
    'Libenson',
    'O3BROEN',
    'Полтавський Палій',
    'El_Micko'
  ];
  selectedJudge: string;
  playbackCount: number = undefined;
  componentDestroyed$: Subject<boolean> = new Subject();
  private likesResults: { [judgeName: string]: number } = {};
  private dislikesResults: { [judgeName: string]: number } = {};
  private userReview: { [judgeName: string]: boolean } = {};

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
    this.selectedJudge = this.service.getCurrentNickname();
    db.collection('tracks').doc(this.track.id).valueChanges()
      .pipe(takeUntil(this.componentDestroyed$))
      .subscribe({
        next: doc => {
          this.playbackCount = (doc as Track).playbackCount ?? 0;
          this.track.playbackCount = this.playbackCount;
        }
      });
    this.db.collection('track-mark-reviews').doc(this.track.id).valueChanges()
      .pipe(takeUntil(this.componentDestroyed$))
      .subscribe({
        next: docs => {
          if (docs == null) {
            return;
          }
          const markReview = docs as TrackMarkReview;
          delete markReview['id'];
          this.likesResults = {};
          this.dislikesResults = {};
          for (const userId in markReview) {
            const userReview = markReview[userId];
            if (userId === this.service.userId) {
              this.userReview = userReview;
            }
            for (const judgeName in userReview) {
              if (userReview[judgeName] === true) {
                this.likesResults[judgeName] = (this.likesResults[judgeName] || 0) + 1;
              } else if (userReview[judgeName] === false) {
                this.dislikesResults[judgeName] = (this.dislikesResults[judgeName] || 0) + 1;
              }
            }
          }
        }
      });
  }

  ngOnDestroy() {
    this.componentDestroyed$.next(true)
    this.componentDestroyed$.complete()
  }

  getLikesCount(judgeName: string): number {
    return this.likesResults[judgeName] || 0;
  }

  getDislikesCount(judgeName: string): number {
    return this.dislikesResults[judgeName] || 0;
  }

  getUserReview(judgeName: string): boolean | undefined {
    return this.userReview[judgeName];
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
      case 'O3BROEN':
        judgeIcon = 'judge_ozbroen.jpg';
        break;
      case 'Полтавський Палій':
        judgeIcon = 'judge_palii.jpg';
        break;
      case 'El_Micko':
        judgeIcon = 'judge_mykhalych.jpg';
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

  canJudgeDeleteMark(mark: Mark): boolean {
    if (this.service.getCurrentNickname() === 'CRESCO') {
      return true;
    }
    return mark.judgeName === this.service.getCurrentNickname();
  }

  trackIsAlreadyJudged(): boolean {
    if (this.service.getCurrentNickname() === 'CRESCO') {
      return false;
    }
    return this.track.marks.some(mark => mark.judgeName === this.getCurrentNickname())
  }

  getCurrentNickname(): string {
    return this.service.getCurrentNickname();
  }

  onEditClicked() {
    this.selectedJudge = this.service.getCurrentNickname();
    this.markToUpdate = <Mark>{
      performance: 0,
      content: 0,
      generalImpression: 0,
      text: ''
    };
    this.editingMode = true;
  }

  onJudgeCommentInput(event: any) {
    this.markToUpdate.text = event.target.value.replace(/\n\r?/g, '<br/>');
  }

  markToUpdateSum(): string {
    const performance: number = this.markToUpdate.performance ?? 0;
    const content: number = this.markToUpdate.content ?? 0;
    const generalImpression: number = this.markToUpdate.generalImpression ?? 0;
    return (performance + content + generalImpression).toFixed(1);
  }

  updatePerformance(event: any) {
    this.markToUpdate.performance = +event.target.value;
  }

  updateContent(event: any) {
    this.markToUpdate.content = +event.target.value;
  }

  updateGeneralImpression(event: any) {
    this.markToUpdate.generalImpression = +event.target.value;
  }

  submitMark() {
    this.markToUpdate.judgeName = this.selectedJudge;
    this.db.collection('tracks').doc(this.track.id).update({
      marks: arrayUnion(this.markToUpdate)
    })
      .then(() => {
        this.track.marks.push(this.markToUpdate)
      })
      .catch((error) => {
        this.service.handleFirebaseError(error);
      })
      .finally(() => {
        this.editingMode = false;
      });
  }

  removeMark(mark: Mark) {
    const markToRemove = this.track.marks.find(it => it.judgeName === mark.judgeName);
    if (markToRemove == null) {
      return;
    }

    this.db.collection('tracks').doc(this.track.id).update({
      marks: arrayRemove(markToRemove)
    })
      .then(() => {
        const index = this.track.marks.indexOf(markToRemove)
        this.track.marks.splice(index, 1);
      })
      .catch((error) => {
        this.service.handleFirebaseError(error);
      })
      .finally(() => {
        this.editingMode = false;
      });
  }

  like(judgeName: string) {
    if (this.getUserReview(judgeName) === true) {
      return;
    }
    if (!this.service.isLoggedIn) {
      this.toastr.info("Потрібно бути зареєстрованим на сайті");
      return;
    }

    const markReview = <TrackMarkReview>{};
    markReview[this.service.userId] = {};
    markReview[this.service.userId][judgeName] = true;
    this.db.collection('track-mark-reviews').doc(this.track.id).set(markReview, {merge: true})
      .then(() => {
      })
      .catch((error) => {
        this.service.handleFirebaseError(error);
      });
  }

  dislike(judgeName: string) {
    if (this.getUserReview(judgeName) === false) {
      return;
    }
    if (!this.service.isLoggedIn) {
      this.toastr.info("Потрібно бути зареєстрованим на сайті");
      return;
    }

    const markReview = <TrackMarkReview>{};
    markReview[this.service.userId] = {};
    markReview[this.service.userId][judgeName] = false;
    this.db.collection('track-mark-reviews').doc(this.track.id).set(markReview, {merge: true})
      .then(() => {
      })
      .catch((error) => {
        this.service.handleFirebaseError(error);
      });
  }
}
