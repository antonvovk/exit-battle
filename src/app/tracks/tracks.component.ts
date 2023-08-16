import {Component} from '@angular/core';
import {Track} from "../_models/track";
import {Round} from "../_models/round";
import {GlobalService} from "../_services/global.service";
import {TrackUploadComponent} from "../track-upload/track-upload.component";
import {ToastrService} from "ngx-toastr";
import {AngularFirestore} from "@angular/fire/compat/firestore";

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

  constructor(private service: GlobalService,
              private toastr: ToastrService,
              private db: AngularFirestore
  ) {
    service.getRounds().subscribe({
      next: value => {
        this.rounds = value;
        this.selectRound(this.rounds[0]);
      }
    });
    db.collection('tracks', ref => ref.limit(15)).get().subscribe({
      next: docs => {
        this.tracks = docs.docs.map(doc => doc.data() as Track);
      }
    })
  }

  selectRound(round: Round): void {
    this.service.getNumberOfTracks(round).subscribe({
      next: value => {
        this.numberOfTracks = (value.get('numberOfTracks') ?? 0) as number;
        this.selectedRound = round;
        this.currentPage = 0;
        this.totalPages = Math.floor(this.numberOfTracks / 15);
      }
    });
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
    this.service.openDialog(TrackUploadComponent, {
      width: 650
    });
  }
}
