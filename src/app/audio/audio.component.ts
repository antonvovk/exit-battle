import {Component, Input} from '@angular/core';
import {Track} from "../_models/track";
import 'media-chrome';
import {GlobalService} from "../_services/global.service";
import {TrackInfoComponent} from "../track-info/track-info.component";

@Component({
  selector: 'app-audio',
  templateUrl: './audio.component.html',
  styleUrls: ['./audio.component.scss']
})
export class AudioComponent {

  @Input()
  totalNumberOfJudges = 0;

  @Input()
  track = <Track>{};

  @Input()
  clickable = false;

  @Input()
  pairNickname: string;

  constructor(private service: GlobalService) {
  }

  public getTotalMark(): string {
    if (this.track == null || this.track.marks.length < this.totalNumberOfJudges) {
      return 0.0.toFixed(1);
    }

    let sum = 0;
    this.track.marks.forEach(mark => {
      sum += mark.performance + mark.content + mark.generalImpression;
    });

    let result = sum / this.totalNumberOfJudges;
    if (this.track.bonusForBeat === true) {
      result += 1;
    }
    return result.toFixed(1);
  }

  public getDurationAsString(): string {
    if (this.track == null) {
      return '0:00';
    }
    const minutes = Math.floor(this.track.duration / 60);
    const seconds = Math.floor(this.track.duration % 60);
    return `${minutes}:${seconds <= 9 ? '0' + seconds : seconds}`
  }

  public openTrackInfo() {
    if (!this.clickable) {
      return;
    }
    this.service.openDialog(TrackInfoComponent, {
      width: 800,
      data: {
        totalNumberOfJudges: this.totalNumberOfJudges,
        track: this.track
      }
    });
  }

  onPlay(e: Event) {
    const audios = document.getElementsByTagName('audio');
    const length = audios.length;
    for (let i = 0; i < length; ++i) {
      if (audios[i] != e.target) {
        audios[i].pause();
      }
    }
  }
}
