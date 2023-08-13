import {Component, inject} from '@angular/core';
import {DialogRef} from "@ngneat/dialog";
import {Data} from "@angular/router";

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent {
  ref: DialogRef<Data, boolean> = inject(DialogRef);

  currentView: 'login' | 'registration' = 'login';

  get title() {
    if (!this.ref.data) return 'Hello world';
    return this.ref.data['title'];
  }

  changeViewToLogin() {
    this.currentView = 'login';
  }

  changeViewToRegistration() {
    this.currentView = 'registration';
  }
}
