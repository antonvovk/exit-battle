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
import User = firebase.User;

@Injectable({
  providedIn: 'root'
})
export class GlobalService {

  public selectedFooterMenuIndex = 0;
  private spinnerTextValue: string = 'Завантаження...';
  private dialog = inject(DialogService);
  private currentUser: User;
  private firebaseUser: any;
  private dialogRef: DialogRef | undefined;
  private remoteConfig: RemoteConfig;
  private currentRound$ = new ReplaySubject<Round>(null);
  private rounds$ = new ReplaySubject<Round[]>(null);

  constructor(private db: AngularFirestore,
              private auth: AngularFireAuth,
              private storage: AngularFireStorage,
              private toastr: ToastrService,
              private spinner: NgxSpinnerService
  ) {
    this.spinner.show();

    this.db.collection('remote-config').doc('main').get().subscribe({
      next: doc => {
        this.remoteConfig = doc.data() as RemoteConfig;

        this.db.collection('rounds').get().subscribe({
          next: doc => {
            const rounds = doc.docs.map(it => it.data() as Round);
            const currentRound = rounds.find(r => r.number === this.getCurrentRoundNumber());

            this.rounds$.next(rounds);
            this.currentRound$.next(currentRound);
            this.spinner.hide();
          }
        });
      }
    });

    this.auth.authState.subscribe((user) => {
      if (user && user.emailVerified) {
        this.currentUser = user;
        localStorage.setItem('user', JSON.stringify(this.currentUser));
        this.updateFirebaseUser(user.uid);
      } else {
        localStorage.removeItem('user');
        localStorage.removeItem('nickname');
        this.firebaseUser = undefined;
      }
    });
  }

  get spinnerText(): string {
    return this.spinnerTextValue;
  }

  set spinnerText(text: string) {
    this.spinnerTextValue = text;
  }

  get isLoggedIn(): boolean {
    const user = JSON.parse(localStorage.getItem('user'));
    return user != null && user.emailVerified;
  }

  get nickname(): string {
    return localStorage.getItem('nickname')
  }

  public getRounds(): Subject<Round[]> {
    return this.rounds$;
  }

  public getCurrentRound(): Subject<Round> {
    return this.currentRound$;
  }

  public isRegistrationOpen(): boolean {
    return this.remoteConfig.isRegistrationOpen;
  }

  public getRegistrationClosedMessage(): string {
    return this.remoteConfig.registrationClosedMessage;
  }

  public isTracksUploadOpen(): boolean {
    return this.remoteConfig.isTracksUploadOpen;
  }

  public openDialog(template: any, config?: Partial<DialogConfig>) {
    this.dialogRef = this.dialog.open(template, config);
  }

  public signIn(email: string, password: string) {
    this.spinner.show();
    return this.auth
      .signInWithEmailAndPassword(email, password)
      .then((result) => {
        if (!result.user.emailVerified) {
          this.toastr.error('Для того щоб ввійти потрібно активувати акаунт перейшовши за посиланням надісланим на вашу електронну адресу');
          this.sendVerificationMail().then(() => {
            this.toastr.info("Ми повторно надіслали на вашу електронну адресу лист для активації профілю");
          });
          this.signOut();
          return;
        }
        localStorage.setItem('user', JSON.stringify(result.user));
        this.updateFirebaseUser(result.user.uid);
        this.updateUserVerificationStatusInDatabase(result.user);
        this.toastr.info('Ви ввійшли в обліковий запис');
        this.dialog.closeAll();
      })
      .catch((error) => {
        this.handleFirebaseError(error);
      })
      .finally(() => {
        this.spinner.hide();
      });
  }

  public signUp(email: string, password: string, nickname: string) {
    this.spinner.show();
    return this.auth
      .createUserWithEmailAndPassword(email, password)
      .then((result) => {
        this.sendVerificationMail();
        this.createUserInDatabase(result.user, nickname);
      })
      .catch((error) => {
        this.handleFirebaseError(error);
      })
      .finally(() => {
        this.spinner.hide();
      })
  }

  public resetPassword(email: string) {
    this.spinner.show();
    return this.auth
      .sendPasswordResetEmail(email)
      .then(() => {
        this.toastr.info("На вашу електронну адресу надіслано лист для скидання паролю")
        this.dialog.closeAll()
      })
      .catch((error) => {
        this.handleFirebaseError(error);
      })
      .finally(() => {
        this.spinner.hide();
      })
  }

  public signOut() {
    return this.auth.signOut()
      .then(() => {
        localStorage.removeItem('user');
        localStorage.removeItem('nickname');
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
    return this.firebaseUser.nickname;
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
            bonusForBeat: false,
            uploadDate: serverTimestamp()
          };
          const lyricsDocument = {
            id: trackId,
            text: lyrics.replace(/\n\r?/g, '<br/>')
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
    } else {
      this.toastr.error(`Неочікувана помилка`, error.message)
    }
  }

  public getNumberOfTracks(round: Round) {
    return this.db.collection('tracks-counter').doc(round.number.toString()).get();
  }

  private getCurrentRoundNumber(): number {
    return this.remoteConfig.currentRoundNumber;
  }

  private sendVerificationMail() {
    return this.auth.currentUser
      .then(u => u.sendEmailVerification());
  }

  private createUserInDatabase(user: any, nickname: string) {
    const userRef: AngularFirestoreDocument<any> = this.db.collection('users').doc(user.uid);
    const userData = {
      uid: user.uid,
      email: user.email,
      emailVerified: user.emailVerified,
      nickname: nickname
    };
    userRef.set(userData)
      .then(() => {
        this.toastr.info("На вашу електронну адресу надіслано лист для активації профілю")
        this.dialog.closeAll();
      })
      .catch((error) => {
        this.handleFirebaseError(error);
      });
  }

  private updateUserVerificationStatusInDatabase(user: any) {
    const userRef: AngularFirestoreDocument<any> = this.db.collection('users').doc(user.uid);
    const userData = {
      emailVerified: user.emailVerified,
    };
    userRef.update(userData)
      .catch((error) => {
        this.handleFirebaseError(error);
      })
  }

  private updateFirebaseUser(userId: string) {
    if (!this.isLoggedIn) {
      return;
    }
    this.db.collection('users').doc(userId).ref.get().then(doc => {
      this.firebaseUser = doc.data();
      localStorage.setItem('nickname', this.firebaseUser.nickname);
    });
  }
}
