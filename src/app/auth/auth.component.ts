import {AfterViewInit, Component, OnDestroy} from '@angular/core';
import {GlobalService} from "../_services/global.service";
import {ToastrService} from "ngx-toastr";
import {RecaptchaVerifier} from "@firebase/auth";
import {Auth} from '@angular/fire/auth';
import {AngularFireAuth} from "@angular/fire/compat/auth";
import firebase from "firebase/compat";
import {NgxSpinnerService} from "ngx-spinner";
import ConfirmationResult = firebase.auth.ConfirmationResult;

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements AfterViewInit, OnDestroy {

  recaptchaSolved: boolean = false;
  recaptchaVerifier: RecaptchaVerifier;
  confirmationResult: ConfirmationResult;

  currentView: 'first' | 'second' | 'third' = 'first';

  phoneNumber = '';
  verificationCode = '';
  nickname = '';
  selectedRole: 'participant' | 'spectator' = 'participant';

  constructor(private service: GlobalService,
              private auth: Auth,
              private fireAuth: AngularFireAuth,
              private toastr: ToastrService,
              private spinner: NgxSpinnerService
  ) {
    auth.languageCode = 'uk';
    service.spinnerText = 'Завантаження...';
  }

  ngAfterViewInit(): void {
    this.recaptchaVerifier = new RecaptchaVerifier(this.auth, 'recaptcha-container', {
      'size': 'normal',
      'callback': (_response: string) => {
        this.recaptchaSolved = true;
      },
      'expired-callback': () => {
        this.recaptchaSolved = false;
      }
    });
    this.recaptchaVerifier.render().then((_widgetId) => {
    });
  }

  ngOnDestroy() {
    this.recaptchaVerifier.clear();
  }

  onPhoneNumber(value: string) {
    this.phoneNumber = value;
  }

  onVerificationCode(value: string) {
    this.verificationCode = value;
  }

  onNickname(value: string) {
    this.nickname = value;
  }

  signInWithPhoneNumber() {
    if (!this.isPhoneNumberValid() || !this.isCaptchaValid()) {
      return;
    }
    this.spinner.show();
    this.fireAuth
      .signInWithPhoneNumber(this.getPhoneNumberFormatted(), this.recaptchaVerifier)
      .then((confirmationResult) => {
        this.confirmationResult = confirmationResult;
        this.currentView = 'second';
        this.toastr.info(`Ми надіслали код підтвердження на номер ${this.getPhoneNumberFormatted()}`);
      })
      .catch((error) => {
        this.service.handleFirebaseError(error);
      })
      .finally(() => {
        this.spinner.hide();
      })
  }

  confirmVerificationCode() {
    if (!this.isVerificationCodeValid()) {
      return;
    }
    this.spinner.show();
    this.confirmationResult.confirm(this.verificationCode)
      .then((result) => {
        if (result.additionalUserInfo.isNewUser === false) {
          this.service.closeAllDialogs();
          this.toastr.success('Ви ввійшли в обліковий запис');
          return;
        }

        this.currentView = 'third';
      })
      .catch((error) => {
        this.service.handleFirebaseError(error);
      })
      .finally(() => {
        this.spinner.hide();
      })
  }

  completeSignUp() {
    this.spinner.show();
    const updateUserProfiledPromise = this.service.updateProfileDisplayName(this.nickname);
    const createUserInDbPromise = this.service.createUserInDatabase(this.nickname, this.selectedRole);
    Promise.all([updateUserProfiledPromise, createUserInDbPromise])
      .then(() => {
        this.service.closeAllDialogs();
        this.toastr.success('Ви ввійшли в обліковий запис');
        this.service.updateFirebaseUserFromCurrentUser();
      })
      .catch((error) => {
        this.service.handleFirebaseError(error);
      })
      .finally(() => {
        this.spinner.hide();
      })
  }

  private isPhoneNumberValid(): boolean {
    if (this.phoneNumber.trim().length === 0) {
      this.toastr.error("Номер телефону не може бути порожнім")
      return false;
    }
    if (!this.getPhoneNumberFormatted().match(/^\+380\d{9}$|^38\d{10}$|^0\d{9}$|^\d{9}$/gm)) {
      this.toastr.error("Некоректний номер телефону")
      return false;
    }
    return true;
  }

  private getPhoneNumberFormatted(): string {
    const value = this.phoneNumber.trim().replace(/[ \-()]/gm, '')
    if (value.startsWith('+380')) {
      return value;
    } else if (value.startsWith('380')) {
      return '+' + value;
    } else if (value.startsWith('0')) {
      return '+38' + value;
    } else {
      return '+380' + value;
    }
  }

  private isCaptchaValid(): boolean {
    if (this.recaptchaSolved !== true) {
      this.toastr.error("reCAPTCHA не вирішена")
      return false;
    }
    return true;
  }

  private isVerificationCodeValid() {
    if (this.verificationCode.trim().length === 0) {
      this.toastr.error("Код підтвердження не може бути порожнім")
      return false;
    }
    if (!this.verificationCode.trim().match(/^\d{6}$/gm)) {
      this.toastr.error("Код підтвердження має складатися з 6 цифр")
      return false;
    }
    return true;
  }
}
