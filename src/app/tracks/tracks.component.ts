import {Component} from '@angular/core';
import {Track} from "../_models/track";
import {Round} from "../_models/round";
import {GlobalService} from "../_services/global.service";
import {TrackUploadComponent} from "../track-upload/track-upload.component";
import {ToastrService} from "ngx-toastr";
import {AngularFirestore} from "@angular/fire/compat/firestore";
import {NgxSpinnerService} from "ngx-spinner";

@Component({
  selector: 'app-tracks',
  templateUrl: './tracks.component.html',
  styleUrls: ['./tracks.component.scss']
})
export class TracksComponent {

  tracks: Track[] = [];
  rounds: Round[] = [];
  selectedRound = <Round>{};
  currentPage = 0;
  totalPages = 0
  numberOfTracks: number = 0;
  allNumberOfTracks: number = 0;
  searchString: string;

  allTracks: Track[] = [];
  currentRound = <Round>{};

  constructor(private service: GlobalService,
              private toastr: ToastrService,
              private db: AngularFirestore,
              private spinner: NgxSpinnerService
  ) {
    service.getRounds().subscribe({
      next: value => {
        this.rounds = value;
        this.selectedRound = this.rounds[0];
      }
    });
    this.service.getCurrentRound().subscribe({
      next: round => {
        this.currentRound = round;
      }
    });
    db.collection('tracks', ref => ref.orderBy('nickname')
      .where('round', '==', 1)).get().subscribe({
      next: docs => {
        this.allTracks = docs.docs.map(doc => doc.data() as Track);
        this.tracks = this.allTracks.slice(0, 15);
        this.numberOfTracks = this.allTracks.length;
        this.allNumberOfTracks = this.allTracks.length;
        this.totalPages = this.numberOfTracks <= 15 ? 1 : Math.ceil(this.numberOfTracks / 15)
      }
    });
  }

  selectRound(round: Round): void {
    if (round.available === false) {
      return;
    }
    if (this.selectedRound.number == round.number) {
      return;
    }

    this.spinner.show();
    this.selectedRound = round;
    this.currentPage = 0;
    this.searchString = undefined;

    this.db.collection('tracks', ref => ref.orderBy('nickname')
      .where('round', '==', this.selectedRound.number)).get().subscribe({
      next: docs => {
        this.allTracks = docs.docs.map(doc => doc.data() as Track);
        this.tracks = this.allTracks.slice(0, 15);
        this.numberOfTracks = this.allTracks.length;
        this.allNumberOfTracks = this.allTracks.length;
        this.totalPages = this.numberOfTracks <= 15 ? 1 : Math.ceil(this.numberOfTracks / 15);
        this.spinner.hide();
      }
    });
  }

  prevPage() {
    if (this.currentPage <= 0) {
      return;
    }
    --this.currentPage;
    this.updateTracksArray();
  }

  nextPage() {
    if (this.currentPage >= (this.totalPages - 1)) {
      return;
    }
    ++this.currentPage;
    this.updateTracksArray();
  }

  getPageNumberInFormat(): string {
    if (this.currentPage <= 8) {
      return '0' + (this.currentPage + 1);
    }
    return (this.currentPage + 1) + '';
  }

  getTotalPagesInFormat(): string {
    if (this.totalPages === 0) {
      return '01';
    }
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
    if (!this.service.isTracksUploadOpen()) {
      this.toastr.info("На даний момент здача треків призупинена");
      return;
    }

    this.db.collection('tracks', ref => ref
      .where('round', '==', this.currentRound.number)
      .where('nickname', '==', this.service.getCurrentNickname())
      .limit(1)
    ).get().subscribe({
      next: docs => {
        if (docs.docs.length === 0) {
          this.service.openDialog(TrackUploadComponent, {
            width: 800
          });
        } else {
          this.toastr.info("Ви вже здали трек для цього раунду. Здати трек можна лише один раз.");
          return;
        }
      }
    });
  }

  onSearch(value: string) {
    this.currentPage = 0;
    this.searchString = value;
    this.updateTracksArray();
  }

  private updateTracksArray() {
    if (this.searchString != null && this.searchString.trim().length > 0) {
      const foundTracks = this.allTracks.filter(it => it.nickname.toLowerCase().includes(this.searchString.trim().toLowerCase()));
      this.tracks = foundTracks.slice(this.currentPage * 15, (this.currentPage * 15) + 15);
      this.totalPages = foundTracks.length <= 15 ? 1 : Math.ceil(foundTracks.length / 15);
    } else {
      this.tracks = this.allTracks.slice(this.currentPage * 15, (this.currentPage * 15) + 15);
      this.totalPages = this.allTracks.length <= 15 ? 1 : Math.ceil(this.allTracks.length / 15);
    }
  }
}
