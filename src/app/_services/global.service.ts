import {inject, Injectable} from '@angular/core';
import {AngularFirestore} from "@angular/fire/compat/firestore";
import {DialogService} from "@ngneat/dialog";
import {DialogConfig} from "@ngneat/dialog/lib/types";
import {Track} from "../_models/track";
import {RemoteConfig} from "../_models/remote-config";
import {ReplaySubject, Subject} from "rxjs";
import {Round} from "../_models/round";
import {NgxSpinnerService} from "ngx-spinner";
import {GlobalState} from "../_models/global-state";
import {Pair} from "../_models/pair";

@Injectable({
  providedIn: 'root'
})
export class GlobalService {

  public selectedFooterMenuIndex = 0;
  private spinnerTextValue: string = 'Завантаження...';
  private loadPercentage: number = 0;
  private dialog = inject(DialogService);
  private remoteConfig: RemoteConfig = <RemoteConfig>{};

  private globalState: GlobalState = new GlobalState();
  private globalState$ = new ReplaySubject<GlobalState>(null);

  constructor(private db: AngularFirestore,
              private spinner: NgxSpinnerService
  ) {
    this.spinnerTextValue = `Завантаження 0%`;
    this.spinner.show();

    this.db.collection('remote-config').doc('main').get().subscribe({
      next: doc => {
        this.remoteConfig = doc.data() as RemoteConfig;
        this.globalState.currentRoundNumber = this.remoteConfig.currentRoundNumber;
        this.finalizeGlobalState();
        this.loadPercentage += 30;
        this.spinnerTextValue = `Завантаження ${this.loadPercentage}%`;
      }
    });
    this.db.collection('rounds').get().subscribe({
      next: doc => {
        this.globalState.rounds = doc.docs.map(it => it.data() as Round);
        this.finalizeGlobalState();
        this.loadPercentage += 30;
        this.spinnerTextValue = `Завантаження ${this.loadPercentage}%`;
      }
    });
    this.db.collection('pairs', ref => ref.orderBy('number')).get().subscribe({
      next: doc => {
        this.globalState.pairs = doc.docs.map(it => it.data() as Pair);
        this.finalizeGlobalState();
        this.loadPercentage += 30;
        this.spinnerTextValue = `Завантаження ${this.loadPercentage}%`;
      }
    });
  }

  get spinnerText(): string {
    return this.spinnerTextValue;
  }

  set spinnerText(text: string) {
    this.spinnerTextValue = text;
  }

  public getGlobalState(): Subject<GlobalState> {
    return this.globalState$;
  }

  public openDialog(template: any, config?: Partial<DialogConfig>) {
    this.dialog.open(template, config);
  }

  public getLyrics(track: Track) {
    return this.db.collection('lyrics').doc(track.id).get();
  }

  private finalizeGlobalState() {
    if (this.globalState.isComplete()) {
      this.globalState$.next(this.globalState);
    }
  }
}
