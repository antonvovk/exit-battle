import {Component} from '@angular/core';
import {Track} from "../_models/track";
import {Round} from "../_models/round";
import {GlobalService} from "../_services/global.service";
import {ToastrService} from "ngx-toastr";
import {AngularFirestore} from "@angular/fire/compat/firestore";
import {NgxSpinnerService} from "ngx-spinner";
import {Pair} from "../_models/pair";
import {PairWithTrack} from "../_models/pair-with-track";
import {Mark} from "../_models/mark";

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
  searchString: string;

  allTracks: Track[] = [];

  allPairs: Pair[] = [];
  allPairsWithTracks: PairWithTrack[] = [];
  pairs: PairWithTrack[] = [];

  constructor(private service: GlobalService,
              private toastr: ToastrService,
              private db: AngularFirestore,
              private spinner: NgxSpinnerService
  ) {
    service.getGlobalState().subscribe({
      next: state => {
        this.rounds = state.rounds;
        this.selectedRound = state.currentRound;
        this.allPairs = state.pairs;
        this.fetchTracks();
      }
    });
  }

  get isPairedRound() {
    return this.allPairsWithTracks.length !== 0;
  }

  public allTracksAreUploaded(pair: PairWithTrack): boolean {
    if (pair.middleNickname == null) {
      return pair.leftTrack != null && pair.rightTrack != null;
    }
    return pair.leftTrack != null && pair.rightTrack != null && pair.middleTrack != null;
  }

  public allMarksAreSet(pair: PairWithTrack): boolean {
    const numberOfJudges = this.selectedRound.totalNumberOfJudges;
    if (pair.middleNickname == null) {
      return pair.leftTrack.marks.length === numberOfJudges && pair.rightTrack.marks.length === numberOfJudges;
    }
    return pair.leftTrack.marks.length === numberOfJudges && pair.rightTrack.marks.length === numberOfJudges && pair.middleTrack.marks.length === numberOfJudges;
  }

  public determineWinner(pair: PairWithTrack): string {
    const left = this.sumOfSquares(pair.leftTrack.marks.map(it => this.getMarkSum(it)));
    const middle = this.sumOfSquares((pair.middleTrack?.marks ?? []).map(it => this.getMarkSum(it)));
    const right = this.sumOfSquares(pair.rightTrack.marks.map(it => this.getMarkSum(it)));

    if (left > middle && left > right) {
      return pair.leftNickname;
    } else if (right > middle && right > left) {
      return pair.rightNickname;
    } else {
      return pair.middleNickname;
    }
  }

  trackByTrack(index: number, track: Track) {
    return track.id;
  }

  trackByPair(index: number, pair: PairWithTrack) {
    return pair.leftNickname + pair.middleNickname + pair.rightNickname;
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
    this.fetchTracks();
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

  onSearch(value: string) {
    this.currentPage = 0;
    this.searchString = value;
    this.updateTracksArray();
  }

  private getMarkSum(mark: Mark): number {
    return mark.performance + mark.content + mark.generalImpression;
  }

  private sumOfSquares(seq: number[]): number {
    return seq.reduce((sum, num) => sum + num ** 2, 0);
  }

  private fetchTracks() {
    this.db.collection('tracks', ref => ref.orderBy('uploadDate')
      .where('round', '==', this.selectedRound.number)).get().subscribe({
      next: docs => {
        this.allTracks = docs.docs.map(doc => doc.data() as Track);
        this.numberOfTracks = this.allTracks.length;
        this.updatePairs();

        if (this.isPairedRound) {
          this.pairs = this.allPairsWithTracks.slice(0, 3);
          this.totalPages = this.numberOfTracks <= 3 ? 1 : Math.ceil(this.numberOfTracks / 3);
        } else {
          this.tracks = this.allTracks.slice(0, 15);
          this.totalPages = this.numberOfTracks <= 15 ? 1 : Math.ceil(this.numberOfTracks / 15);
        }

        this.spinner.hide();
      }
    });
  }

  private updateTracksArray() {
    if (this.isPairedRound) {
      if (this.searchString != null && this.searchString.trim().length > 0) {
        const foundPairs = this.allPairsWithTracks
          .filter(it =>
            it.leftNickname.toLowerCase().includes(this.searchString.trim().toLowerCase()) ||
            (it.middleNickname ?? '').toLowerCase().includes(this.searchString.trim().toLowerCase()) ||
            it.rightNickname.toLowerCase().includes(this.searchString.trim().toLowerCase())
          );
        this.pairs = foundPairs.slice(this.currentPage * 3, (this.currentPage * 3) + 3);
        this.totalPages = foundPairs.length <= 3 ? 1 : Math.ceil(foundPairs.length / 3);
      } else {
        this.pairs = this.allPairsWithTracks.slice(this.currentPage * 3, (this.currentPage * 3) + 3);
        this.totalPages = this.allTracks.length <= 3 ? 1 : Math.ceil(this.allTracks.length / 3);
      }
    } else {
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

  private updatePairs() {
    this.allPairsWithTracks = this.allPairs
      .filter(p => p.round === this.selectedRound.number)
      .map(p => <PairWithTrack>{
        round: p.round,
        number: p.number,
        leftNickname: p.leftNickname,
        middleNickname: p.middleNickname,
        rightNickname: p.rightNickname,
        leftTrack: this.allTracks.find(t => t.nickname === p.leftNickname),
        middleTrack: this.allTracks.find(t => t.nickname === p.middleNickname),
        rightTrack: this.allTracks.find(t => t.nickname === p.rightNickname)
      });
  }
}
