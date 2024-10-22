import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Track} from "../_models/track";
import {GlobalService} from "../_services/global.service";

@Component({
  selector: 'app-audio-poll',
  templateUrl: './audio-poll.component.html',
  styleUrls: ['./audio-poll.component.scss']
})
export class AudioPollComponent {

  @Input()
  canVote: boolean = false;

  @Input()
  track = <Track>{};

  @Input()
  checked: boolean = false;

  @Output()
  checkedChange: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor(private service: GlobalService) {
  }

  public getDurationAsString(): string {
    if (this.track == null) {
      return '0:00';
    }
    const minutes = Math.floor(this.track.duration / 60);
    const seconds = Math.floor(this.track.duration % 60);
    return `${minutes}:${seconds <= 9 ? '0' + seconds : seconds}`
  }

  public getVolumeForAudioComponent(): number {
    return this.service.getVolumeForAudioComponent();
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

  getPollResult(): number {
    return this.service.getPollResult(this.track.id);
  }

  isLeader(): boolean {
    return this.track.id === this.service.getPollLeader();
  }

  vote() {
    if (!this.canVote) {
      return;
    }
    this.checkedChange.emit();
  }
}