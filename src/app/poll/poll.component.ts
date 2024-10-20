import {Component} from '@angular/core';
import {GlobalService} from "../_services/global.service";
import {Poll} from "../_models/poll";
import {AngularFirestore} from "@angular/fire/compat/firestore";
import {Track} from "../_models/track";

@Component({
  selector: 'app-poll',
  templateUrl: './poll.component.html',
  styleUrls: ['./poll.component.scss']
})
export class PollComponent {

  poll: Poll;
  tracks: Track[] = []

  constructor(private service: GlobalService,
              private db: AngularFirestore
  ) {
    this.poll = service.getActivePoll();
    const trackIds = this.poll.options.map(it => it.trackId);
    this.db.collection('tracks', ref => ref.where('id', 'in', trackIds)).get()
      .subscribe({
        next: docs => {
          this.tracks = docs.docs.map(doc => doc.data() as Track);
        }
      });
  }

  trackByTrack(index: number, track: Track) {
    return track.id;
  }

  vote() {

  }
}
