import {Component} from '@angular/core';
import {GlobalService} from "../_services/global.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  constructor(private service: GlobalService) {
  }

  public onCupPrizeClicked() {
    this.service.selectedFooterMenuIndex = 3;
  }

  public onAboutCupClicked() {
    this.service.selectedFooterMenuIndex = 0;
  }
}
