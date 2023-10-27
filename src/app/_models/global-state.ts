import {Round} from "./round";
import {Pair} from "./pair";

export class GlobalState {

  private _rounds: Round[];

  get rounds(): Round[] {
    return this._rounds;
  }

  set rounds(value: Round[]) {
    this._rounds = value;
    this.updateCurrentRoundObject();
  }

  private _currentRound: Round;

  get currentRound(): Round {
    return this._currentRound;
  }

  private _currentRoundNumber: number;

  get currentRoundNumber(): number {
    return this._currentRoundNumber;
  }

  set currentRoundNumber(value: number) {
    this._currentRoundNumber = value;
    this.updateCurrentRoundObject();
  }

  private _pairs: Pair[];

  get pairs(): Pair[] {
    return this._pairs;
  }

  set pairs(value: Pair[]) {
    this._pairs = value;
  }

  public isComplete() {
    return this.currentRound != null && this.rounds != null && this.currentRoundNumber != null && this.pairs != null;
  }

  private updateCurrentRoundObject() {
    if (this.rounds != null && this.currentRoundNumber != null) {
      this._currentRound = this.rounds.find(r => r.number === this.currentRoundNumber);
    }
  }
}
