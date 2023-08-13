import {Component, inject} from '@angular/core';
import {DialogService} from "@ngneat/dialog";
import {AuthComponent} from "../auth/auth.component";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  private dialog = inject(DialogService);

  performAuth() {
    console.log('sdas');
    const dialogRef = this.dialog.open(AuthComponent, {
      // data is typed based on the passed generic
      data: {
        title: 'Fuck yes',
      },
    });
  }
}
