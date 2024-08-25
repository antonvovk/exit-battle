import {Component} from '@angular/core';
import {AuthComponent} from "../auth/auth.component";
import {GlobalService} from "../_services/global.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  constructor(private service: GlobalService) {
  }

  get isLoggedIn(): boolean {
    return this.service.isLoggedIn;
  }

  get nickname(): string {
    return this.service.getCurrentNickname();
  }

  public openAuthDialog() {
    this.service.openDialog(AuthComponent, {
      width: 440,
      closeButton: true,
      enableClose: false
    });
  }

  public signOut() {
    this.service.signOut();
  }

  public onCupPrizeClicked() {
    this.service.selectedFooterMenuIndex = 3;
  }

  public onAboutCupClicked() {
    this.service.selectedFooterMenuIndex = 0;
  }
}
