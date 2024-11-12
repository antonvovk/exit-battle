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
        this.service.setSelectedRound(state.currentRound);
        this.allPairs = state.pairs;
        this.fetchTracks();
      }
    });
  }

  get isPairedRound() {
    return this.allPairsWithTracks.length !== 0;
  }

  get selectedRound(): Round {
    return this.service.getSelectedRound();
  }

  public allTracksAreUploaded(pair: PairWithTrack): boolean {
    if (new Date() >= this.selectedRound.endDate.toDate()) {
      return true;
    }

    if (pair.middleNickname == null) {
      return pair.leftTrack != null && pair.rightTrack != null;
    }
    return pair.leftTrack != null && pair.rightTrack != null && pair.middleTrack != null;
  }

  public allMarksAreSet(pair: PairWithTrack): boolean {
    if (pair.winner) {
      return true;
    }
    if (pair.middleNickname == null) {
      if (pair.leftTrack == null || pair.rightTrack == null) {
        return true;
      }
    }

    const numberOfJudges = this.selectedRound.totalNumberOfJudges;
    const sufficientNumberOfJudges = Math.ceil(numberOfJudges / 2);
    if (pair.middleNickname == null) {
      return pair.leftTrack.marks.length >= sufficientNumberOfJudges && pair.rightTrack.marks.length >= sufficientNumberOfJudges;
    }
    return pair.leftTrack.marks.length >= sufficientNumberOfJudges && pair.rightTrack.marks.length >= sufficientNumberOfJudges && pair.middleTrack.marks.length >= sufficientNumberOfJudges;
  }

  public determineWinner(pair: PairWithTrack): string {
    if (pair.winner) {
      return pair.winner;
    }
    if (pair.leftTrack == null && pair.middleTrack == null) {
      return pair.rightNickname;
    }
    if (pair.rightTrack == null && pair.middleTrack == null) {
      return pair.leftNickname;
    }

    const left = pair.leftTrack.marks.sort((a, b) => this.sortMarks(a, b))
      .map(mark => this.getMarkSum(mark));
    const right = pair.rightTrack.marks.sort((a, b) => this.sortMarks(a, b))
      .map(mark => this.getMarkSum(mark));

    let length = Math.min(left.length, right.length);
    let leftCount = 0;
    let rightCount = 0;
    for (let i = 0; i < length; ++i) {
      if (left[i] > right[i]) {
        ++leftCount;
      } else if (right[i] > left[i]) {
        ++rightCount;
      }
    }

    const numberOfJudges = this.selectedRound.totalNumberOfJudges;
    const sufficientNumberOfJudges = Math.ceil(numberOfJudges / 2);
    if (leftCount >= sufficientNumberOfJudges) {
      return pair.leftNickname;
    } else if (rightCount >= sufficientNumberOfJudges) {
      return pair.rightNickname;
    } else {
      return null
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
    this.service.setSelectedRound(round);
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

  private sortMarks(a: Mark, b: Mark): number {
    if (a.judgeName > b.judgeName) {
      return 1;
    }
    if (a.judgeName < b.judgeName) {
      return -1;
    }
    return 0;
  }

  private fetchTracks() {
    this.db.collection('tracks', ref => ref.orderBy('uploadDate')
      .where('round', '==', this.selectedRound.number)).get().subscribe({
      next: docs => {
        this.allTracks = docs.docs.map(doc => doc.data() as Track);
        this.numberOfTracks = this.allTracks.length;
        this.updatePairs();

        if (this.isPairedRound) {
          const numberOfPairs = this.allPairsWithTracks.length;
          this.pairs = this.allPairsWithTracks.slice(0, 3);
          this.totalPages = numberOfPairs <= 3 ? 1 : Math.ceil(numberOfPairs / 3);
        } else {
          this.tracks = this.allTracks.slice(0, 15);
          this.totalPages = this.numberOfTracks <= 15 ? 1 : Math.ceil(this.numberOfTracks / 15);
        }

        this.service.spinnerText = `Завантаження 100%`;
        this.spinner.hide();
        this.service.spinnerText = 'Завантаження...';
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
        this.totalPages = this.allPairsWithTracks.length <= 3 ? 1 : Math.ceil(this.allPairsWithTracks.length / 3);
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
        rightTrack: this.allTracks.find(t => t.nickname === p.rightNickname),
        customName: p.customName,
        winner: p.winner
      });
  }
}
