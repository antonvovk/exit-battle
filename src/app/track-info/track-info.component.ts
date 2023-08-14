import {Component, inject} from '@angular/core';
import {DialogRef} from "@ngneat/dialog";
import {Data} from "@angular/router";
import {Track} from "../models/track";
import {GlobalService} from "../_services/global.service";

@Component({
  selector: 'app-track-info',
  templateUrl: './track-info.component.html',
  styleUrls: ['./track-info.component.scss']
})
export class TrackInfoComponent {

  ref: DialogRef<Data> = inject(DialogRef);
  totalNumberOfJudges: number;
  track: Track;
  lyrics: string;
  selectedMenuItem: 'marks' | 'lyrics' = 'marks';

  constructor(private service: GlobalService) {
    this.totalNumberOfJudges = this.ref.data['totalNumberOfJudges'];
    this.track = this.ref.data['track'];
    this.lyrics = service.getLyrics(this.track);
  }

  selectMarksMenuItem() {
    this.selectedMenuItem = 'marks';
  }

  selectLyricsMenuItem() {
    this.selectedMenuItem = 'lyrics';
  }
}
