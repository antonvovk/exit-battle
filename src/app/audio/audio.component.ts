import {Component, Input} from '@angular/core';
import {Track} from "../models/track";
import 'media-chrome';

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

  public getTotalMark(): string {
    if (this.track.marks.length < this.totalNumberOfJudges) {
      return 0.0.toFixed(2);
    }

    let sum = 0;
    this.track.marks.forEach(mark => {
      sum += mark.performance + mark.content + mark.generalImpression;
    });
    return (sum / this.totalNumberOfJudges).toFixed(2);
  }

  public getDurationAsString(duration: number): string {
    const minutes = Math.floor(duration / 60);
    const seconds = duration % 60;
    return `${minutes}:${seconds}`
  }
}
