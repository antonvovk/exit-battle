import {Component} from '@angular/core';
import {GlobalService} from "../_services/global.service";
import {Poll, PollStatus} from "../_models/poll";
import {AngularFirestore} from "@angular/fire/compat/firestore";
import {Track} from "../_models/track";
import {ToastrService} from "ngx-toastr";
import {PollVote} from "../_models/poll-vote";

@Component({
  selector: 'app-poll',
  templateUrl: './poll.component.html',
  styleUrls: ['./poll.component.scss']
})
export class PollComponent {

  poll: Poll;
  tracks: Track[] = []
  voteState: { [userId: string]: boolean } = {};
  protected readonly PollStatus = PollStatus;

  constructor(private service: GlobalService,
              private toastr: ToastrService,
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

  get canVote(): boolean {
    return this.service.isLoggedIn && !this.service.getHasUserVoted() && this.poll.status === PollStatus.ACTIVE;
  }

  get isLoggedIn(): boolean {
    return this.service.isLoggedIn;
  }

  trackByTrack(index: number, track: Track) {
    return track.id;
  }

  vote() {
    if (Object.values(this.voteState).every(value => value === false)) {
      this.toastr.error("Виберіть один з треків");
      return;
    }
    const pollVote = <PollVote>{};
    pollVote[this.service.userId] = this.voteState;
    this.db.collection('poll-votes').doc(this.poll.id).update(pollVote)
      .then(() => {
      })
      .catch((error) => {
        this.service.handleFirebaseError(error);
      });
  }

  onCheckedChange(trackId: string) {
    const oldValue = this.voteState[trackId];
    this.voteState = {};
    this.voteState[trackId] = !oldValue;
  }
}
