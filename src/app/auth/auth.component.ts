import {Component} from '@angular/core';
import {GlobalService} from "../_services/global.service";

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

  constructor(private service: GlobalService) {
  }

  changeViewToLogin() {
    this.currentView = 'login';
  }

  changeViewToRegistration() {
    this.currentView = 'registration';
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
    this.service.signIn(this.email, this.password);
  }

  signUp() {
    this.service.signUp(this.email, this.password, this.nickname);
  }
}
