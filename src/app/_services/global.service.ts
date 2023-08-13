import {inject, Injectable} from '@angular/core';
import {AngularFirestore, AngularFirestoreDocument} from "@angular/fire/compat/firestore";
import {AngularFireAuth} from "@angular/fire/compat/auth";
import {ToastrService} from "ngx-toastr";
import {DialogRef, DialogService} from "@ngneat/dialog";
import {DialogConfig} from "@ngneat/dialog/lib/types";
import firebase from "firebase/compat";
import User = firebase.User;

@Injectable({
  providedIn: 'root'
})
export class GlobalService {

  private dialog = inject(DialogService);

  private userData: User;
  private firebaseUser: any;
  private dialogRef: DialogRef | undefined;

  constructor(private db: AngularFirestore,
              private auth: AngularFireAuth,
              private toastr: ToastrService
  ) {
    this.auth.authState.subscribe((user) => {
      if (user && user.emailVerified) {
        this.userData = user;
        localStorage.setItem('user', JSON.stringify(this.userData));
        this.updateFirebaseUser(user.uid);
      } else {
        localStorage.removeItem('user');
      }
    });
  }

  get isLoggedIn(): boolean {
    const user = JSON.parse(localStorage.getItem('user'));
    return user != null && user.emailVerified;
  }

  get nickname(): string {
    return localStorage.getItem('nickname')
  }

  public openDialog(template: any, config?: Partial<DialogConfig>) {
    this.dialogRef = this.dialog.open(template, config);
  }

  public signIn(email: string, password: string) {
    return this.auth
      .signInWithEmailAndPassword(email, password)
      .then((result) => {
        if (!result.user.emailVerified) {
          this.toastr.error('Для того щоб ввійти потрібно активувати акаунт перейшовши за посиланням надісланим на вашу електронну адресу')
          this.signOut();
          return;
        }
        this.updateUserVerificationStatusInDatabase(result.user);
        this.toastr.info('Ви ввійшли в обліковий запис');
        this.dialogRef.close();
      })
      .catch((error) => {
        this.handleFirebaseError(error);
      });
  }

  public signUp(email: string, password: string, nickname: string) {
    return this.auth
      .createUserWithEmailAndPassword(email, password)
      .then((result) => {
        this.sendVerificationMail();
        this.createUserInDatabase(result.user, nickname);
      })
      .catch((error) => {
        this.handleFirebaseError(error);
      });
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

  private sendVerificationMail() {
    return this.auth.currentUser
      .then((u: any) => u.sendEmailVerification());
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
        this.dialogRef.close();
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

  private handleFirebaseError(error: any) {
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
    } else {
      this.toastr.error(`Неочікувана помилка`, error.message)
    }
  }
}
