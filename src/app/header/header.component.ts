import {Component, inject, OnInit} from '@angular/core';
import {DialogService} from "@ngneat/dialog";
import {AuthComponent} from "../auth/auth.component";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  private dialog = inject(DialogService);

  ngOnInit() {
    this.performAuth();
  }

  performAuth() {
    const dialogRef = this.dialog.open(AuthComponent, {
      width: 440,
      data: {
        title: 'Fuck yes',
      },
    });
  }
}
