import {inject, Injectable} from '@angular/core';
import {AngularFirestore, AngularFirestoreDocument} from "@angular/fire/compat/firestore";
import {AngularFireAuth} from "@angular/fire/compat/auth";
import {ToastrService} from "ngx-toastr";
import {DialogRef, DialogService} from "@ngneat/dialog";
import {DialogConfig} from "@ngneat/dialog/lib/types";
import firebase from "firebase/compat";
import {Track} from "../_models/track";
import {RemoteConfig} from "../_models/remote-config";
import {finalize, Observable, ReplaySubject, Subject} from "rxjs";
import {AngularFireStorage} from "@angular/fire/compat/storage";
import {Round} from "../_models/round";
import {NgxSpinnerService} from "ngx-spinner";
import {increment, serverTimestamp} from '@angular/fire/firestore';
import {TrackUploadComponent} from "../track-upload/track-upload.component";
import {GlobalState} from "../_models/global-state";
import {Pair} from "../_models/pair";
import {FirebaseUser} from "../_models/firebase-user";
import {Poll} from "../_models/poll";
import {PollVote} from "../_models/poll-vote";
import {Location} from '@angular/common';
import User = firebase.User;

@Injectable({
  providedIn: 'root'
})
export class GlobalService {

  public selectedFooterMenuIndex = 0;
  private spinnerTextValue: string = 'Завантаження...';
  private loadPercentage: number = 0;
  private dialog = inject(DialogService);
  private currentUser: User;
  private firebaseUser: FirebaseUser;
  private dialogRef: DialogRef | undefined;
  private remoteConfig: RemoteConfig = <RemoteConfig>{};
  private signOutOnEmptyUsername: boolean = false;
  private activePoll: Poll | undefined;
  private pollResults: { [optionId: string]: number } = {};
  private hasUserVoted: boolean = false;
  private pollLeader: string | undefined;
  private volume: number = 100;

  private globalState: GlobalState = new GlobalState();
  private globalState$ = new ReplaySubject<GlobalState>(null);

  constructor(private db: AngularFirestore,
              private auth: AngularFireAuth,
              private storage: AngularFireStorage,
              private toastr: ToastrService,
              private spinner: NgxSpinnerService,
              private location: Location
  ) {
    this.spinnerTextValue = `Завантаження 0%`;
    this.spinner.show();

    this.db.collection('remote-config').doc('main').get().subscribe({
      next: doc => {
        this.remoteConfig = doc.data() as RemoteConfig;
        this.fetchPoll(this.remoteConfig.activePollId);
        this.globalState.currentRoundNumber = this.remoteConfig.currentRoundNumber;
        this.finalizeGlobalState();
        this.loadPercentage += 20;
        this.spinnerTextValue = `Завантаження ${this.loadPercentage}%`;
      }
    });
    this.db.collection('rounds').get().subscribe({
      next: doc => {
        this.globalState.rounds = doc.docs.map(it => it.data() as Round);
        this.finalizeGlobalState();
        this.loadPercentage += 20;
        this.spinnerTextValue = `Завантаження ${this.loadPercentage}%`;
      }
    });
    this.db.collection('pairs', ref => ref.orderBy('number')).get().subscribe({
      next: doc => {
        this.globalState.pairs = doc.docs.map(it => it.data() as Pair);
        this.finalizeGlobalState();
        this.loadPercentage += 20;
        this.spinnerTextValue = `Завантаження ${this.loadPercentage}%`;
      }
    });

    this.auth.authState.subscribe((user) => {
      if (user) {
        if (this.signOutOnEmptyUsername === false && !user.displayName) {
          this.toastr.warning("Вам потрібно завершити реєстрацію");
          this.signOutOnEmptyUsername = true;
          this.signOut();
          return;
        }

        this.currentUser = user;
        this.updateFirebaseUser(user.uid);
      } else {
        this.currentUser = null;
        this.firebaseUser = undefined;
      }

      this.loadPercentage += 20;
      this.spinnerTextValue = `Завантаження ${this.loadPercentage}%`;
      this.signOutOnEmptyUsername = true;
    });

    const searchParams = new URLSearchParams(window.location.search);
    if (searchParams.has('email') ?? this.auth.isSignInWithEmailLink(window.location.href)) {
      const email = searchParams.get('email');
      this.auth.signInWithEmailLink(email, window.location.href)
        .then(() => {
          this.toastr.success('Ви ввійшли в обліковий запис');
          this.location.replaceState("/");
        })
        .catch((error) => {
          this.handleFirebaseError(error);
          this.location.replaceState("/");
        });
    }
  }

  get spinnerText(): string {
    return this.spinnerTextValue;
  }

  set spinnerText(text: string) {
    this.spinnerTextValue = text;
  }

  get isLoggedIn(): boolean {
    return this.currentUser != null;
  }

  get userId(): string {
    return this.currentUser?.uid;
  }

  get showPollNotification(): boolean {
    return this.activePoll != null;
  }

  getPollResult(optionId: string): number {
    return this.pollResults[optionId] || 0;
  }

  getPollLeader(): string {
    return this.pollLeader;
  }

  getHasUserVoted(): boolean {
    return this.hasUserVoted;
  }

  getVolume(): number {
    return this.volume;
  }

  getVolumeForAudioComponent(): number {
    return this.volume / 100;
  }

  setVolume(volume: number): void {
    this.volume = volume;
  }

  public getActivePoll(): Poll {
    return this.activePoll;
  }

  public getGlobalState(): Subject<GlobalState> {
    return this.globalState$;
  }

  public isSpectator(): boolean {
    return this.firebaseUser?.role === 'spectator';
  }

  public canUploadTracks(): boolean {
    return this.firebaseUser?.canUploadTracks
  }

  public isTracksUploadOpen(): boolean {
    return this.remoteConfig.isTracksUploadOpen;
  }

  public getRemoteConfig(): RemoteConfig {
    return this.remoteConfig;
  }

  public openDialog(template: any, config?: Partial<DialogConfig>) {
    this.dialogRef = this.dialog.open(template, config);
  }

  public closeAllDialogs() {
    this.dialog.closeAll();
  }

  public updateProfileDisplayName(displayName: string): Promise<void> {
    return this.currentUser.updateProfile({displayName})
  }

  public createUserInDatabase(isNewUser: boolean, nickname: string): Promise<void> {
    const user = this.currentUser;
    const userRef: AngularFirestoreDocument<any> = this.db.collection('users').doc(user.uid);

    if (isNewUser) {
      const userData = {
        uid: user.uid,
        phoneNumber: user.phoneNumber,
        nickname: nickname,
        canUploadTracks: false,
        role: 'spectator'
      };
      return userRef.set(userData);
    } else {
      const userData = {
        nickname: nickname
      };
      return userRef.update(userData);
    }
  }

  public signOut() {
    return this.auth.signOut()
      .then(() => {
        this.currentUser = null;
        this.firebaseUser = undefined;
      })
      .catch((error) => {
        this.handleFirebaseError(error);
      });
  }

  public getLyrics(track: Track) {
    return this.db.collection('lyrics').doc(track.id).get();
  }

  public getCurrentNickname(): string {
    return this.currentUser?.displayName;
  }

  public isAdmin(): boolean {
    return this.firebaseUser?.isAdmin === true;
  }

  public openTrackUploadDialog(): void {
    if (!this.isLoggedIn) {
      this.toastr.info("Щоб здати трек потрібно авторизуватися");
      return;
    }
    if (this.isSpectator()) {
      this.toastr.info("Ви не можете здати трек, оскільки зареєструвалися як 'Глядач'");
      return;
    }
    if (!this.canUploadTracks()) {
      this.toastr.info("Ви не можете здати трек");
      return;
    }
    if (!this.isTracksUploadOpen()) {
      this.toastr.info("Здача треків на даний раунд завершена");
      return;
    }
    this.db.collection('tracks', ref => ref
      .where('round', '==', this.getCurrentRoundNumber())
      .where('nickname', '==', this.getCurrentNickname())
      .limit(1)
    ).get().subscribe({
      next: docs => {
        if (docs.docs.length === 0) {
          this.openDialog(TrackUploadComponent, {
            width: 800,
            closeButton: true,
            enableClose: false
          });
        } else {
          this.toastr.info("Ви вже здали трек для цього раунду. Здати трек можна лише один раз.");
          return;
        }
      }
    });
  }

  public uploadFile(file: File, lyrics: string, duration: number): Observable<number> {
    const filePath = `tracks/${this.getCurrentRoundNumber()}/${this.getCurrentNickname()} - ${file.name}`;
    const storageRef = this.storage.ref(filePath);
    const uploadTask = this.storage.upload(filePath, file, {
      customMetadata: {
        round: this.getCurrentRoundNumber().toString(),
        nickname: this.getCurrentNickname()
      }
    });

    uploadTask.snapshotChanges().pipe(
      finalize(() => {
        storageRef.getDownloadURL().subscribe(downloadURL => {
          this.spinnerText = `Майже готово...`;

          const trackId = this.db.createId();
          const track = <Track>{
            id: trackId,
            round: this.getCurrentRoundNumber(),
            nickname: this.getCurrentNickname(),
            duration: duration,
            audioUrl: downloadURL,
            passedToNextRound: false,
            marks: [],
            uploadDate: serverTimestamp()
          };
          const lyricsDocument = {
            id: trackId,
            text: lyrics
          };

          const incrementValue = increment(1);

          const batch = this.db.firestore.batch();
          batch.set(this.db.collection('tracks').doc(trackId).ref, track);
          batch.set(this.db.collection('lyrics').doc(trackId).ref, lyricsDocument);
          batch.set(this.db.collection('tracks-counter').doc(this.getCurrentRoundNumber().toString()).ref, {numberOfTracks: incrementValue}, {merge: true});

          batch.commit()
            .then(() => {
              this.toastr.success("Ваш трек прийнято");
              this.spinner.hide();
              this.dialog.closeAll();
            })
            .catch((error) => {
              this.handleFirebaseError(error);
              this.spinner.hide();
            });
        });
      })
    ).subscribe();

    return uploadTask.percentageChanges();
  }

  public updateTrackPlaybacksCounts(track: Track): void {
    this.db.collection('tracks').doc(track.id)
      .update({playbackCount: increment(1)})
      .then(() => {
      })
      .catch(() => {
      });
  }

  public handleFirebaseError(error: any) {
    if (error.code === 'auth/user-not-found') {
      this.toastr.error(`Користувача з такою електронною поштою не знайдено`)
    } else if (error.code === 'auth/wrong-password') {
      this.toastr.error(`Невірний пароль`)
    } else if (error.code === 'auth/invalid-email') {
      this.toastr.error(`Адреса електронної пошти має неправильний формат`)
    } else if (error.code === 'auth/missing-password') {
      this.toastr.error(`Необхідно вказати непорожній пароль`)
    } else if (error.code === 'auth/weak-password') {
      this.toastr.error('Пароль має бути не менше 6 символів');
    } else if (error.code === 'auth/email-already-in-use') {
      this.toastr.error('Адреса електронної пошти вже використовується іншим обліковим записом');
    } else if (error.code === 'auth/user-disabled') {
      this.toastr.info('Ваш аккаунт деактивовано');
    } else if (error.code === 'auth/invalid-phone-number') {
      this.toastr.error(`Недійсний номер телефону`)
    } else if (error.code === 'auth/invalid-verification-code') {
      this.toastr.error(`Неправильний код підтвердження`)
    } else if (error.code === 'auth/invalid-action-code') {
      this.toastr.error(`Це посилання для входу вже використане`)
    } else {
      this.toastr.error(`Неочікувана помилка`, error.message)
    }
  }

  public getNumberOfTracks(round: Round) {
    return this.db.collection('tracks-counter').doc(round.number.toString()).get();
  }

  public getCurrentRoundNumber(): number {
    return this.remoteConfig.currentRoundNumber;
  }

  public updateFirebaseUserFromCurrentUser() {
    this.updateFirebaseUser(this.currentUser?.uid);
  }

  private updateFirebaseUser(userId: string) {
    if (!this.isLoggedIn || userId == null) {
      return;
    }
    this.db.collection('users').doc(userId).ref.get().then(doc => {
      this.firebaseUser = doc.data() as FirebaseUser;
    });
  }

  private finalizeGlobalState() {
    if (this.globalState.isComplete()) {
      this.globalState$.next(this.globalState);
    }
  }

  private fetchPoll(pollId: string): void {
    if (pollId == null || pollId === '') {
      return;
    }
    this.db.collection('polls').doc(pollId).get().subscribe({
      next: doc => {
        this.activePoll = doc.data() as Poll;
      }
    });
    this.db.collection('poll-votes').doc(pollId).valueChanges().subscribe({
      next: docs => {
        const pollVote = docs as PollVote;
        delete pollVote['id'];
        this.hasUserVoted = Object.keys(pollVote).includes(this.userId);
        this.pollResults = {};
        for (const userId in pollVote) {
          const userVotes = pollVote[userId];
          for (const optionId in userVotes) {
            if (userVotes[optionId]) {
              this.pollResults[optionId] = (this.pollResults[optionId] || 0) + 1;
            }
          }
        }

        const entries = Object.entries(this.pollResults);
        const maxValue = Math.max(...entries.map(([key, value]) => value));
        const keysWithMaxValue = entries.filter(([key, value]) => value === maxValue).map(([key]) => key);
        this.pollLeader = keysWithMaxValue.length === 1 ? keysWithMaxValue[0] : undefined;
      }
    });
  }
}
