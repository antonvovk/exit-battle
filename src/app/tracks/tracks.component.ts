import {Component, OnInit} from '@angular/core';
import {Track} from "../_models/track";
import {Round} from "../_models/round";
import {GlobalService} from "../_services/global.service";
import {TrackUploadComponent} from "../track-upload/track-upload.component";
import {ToastrService} from "ngx-toastr";
import {TRACKS} from "../mock";

@Component({
  selector: 'app-tracks',
  templateUrl: './tracks.component.html',
  styleUrls: ['./tracks.component.scss']
})
export class TracksComponent implements OnInit {

  // todo fetch this real
  tracks: Track[] = TRACKS;
  rounds: Round[] = [];
  selectedRound = <Round>{};
  currentPage = 0;
  totalPages = 0
  numberOfTracks: number = 0;

  constructor(private service: GlobalService,
              private toastr: ToastrService) {
  }

  ngOnInit() {
    this.rounds = this.service.getRounds();
    this.selectRound(this.rounds[0]);
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
