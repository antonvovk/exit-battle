import {Component} from '@angular/core';
import {GlobalService} from "../_services/global.service";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent {

  currentView: 'login' | 'registration' = 'login';

  email = '';
  password = '';
  nickname = '';

  constructor(private service: GlobalService,
              private toastr: ToastrService) {
  }

  changeViewToLogin() {
    this.currentView = 'login';
    this.email = '';
    this.password = '';
    this.nickname = '';
  }

  changeViewToRegistration() {
    this.currentView = 'registration';
    this.email = '';
    this.password = '';
    this.nickname = '';
  }

  onEmail(value: string) {
    this.email = value;
  }

  onPassword(value: any) {
    this.password = value;
  }

  onNickname(value: any) {
    this.nickname = value;
  }

  login() {
    if (!this.isEmailAndPasswordValid()) {
      return;
    }
    this.service.signIn(this.email.trim(), this.password.trim());
  }

  signUp() {
    if (!this.isEmailAndPasswordValid() || !this.isNicknameValid()) {
      return;
    }
    this.service.signUp(this.email.trim(), this.password.trim(), this.nickname);
  }

  private isEmailAndPasswordValid() {
    if (this.email.trim().length === 0) {
      this.toastr.error("Електронна адреса не може бути порожньою")
      return false;
    }
    if (this.password.trim().length === 0) {
      this.toastr.error("Пароль не може бути порожнім")
      return false;
    }
    if (this.password.trim().length < 6) {
      this.toastr.error("Пароль має бути не менше 6 символів")
      return false;
    }
    return true;
  }

  private isNicknameValid() {
    if (this.nickname.length === 0) {
      this.toastr.error("Нікнейм не може бути порожнім")
      return false;
    }
    return true;
  }
}
