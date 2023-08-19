import {Component} from '@angular/core';
import {GlobalService} from "../_services/global.service";

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent {

  menuItems = [
    {
      index: 0,
      name: 'Загальна концепція'
    },
    {
      index: 1,
      name: 'Склад суддів'
    },
    {
      index: 2,
      name: 'Система оцінювання'
    },
    {
      index: 3,
      name: 'Призовий фонд'
    },
    {
      index: 4,
      name: 'Правила заходу'
    },
    {
      index: 5,
      name: 'Підтримка спонсорів'
    }
  ];

  constructor(private service: GlobalService) {
  }

  get selectedFooterMenuIndex(): number {
    return this.service.selectedFooterMenuIndex;
  }

  selectFooterMenuItem(index: number) {
    this.service.selectedFooterMenuIndex = index;
  }

  getCurrentFooterMenuName(): string {
    return this.menuItems[this.service.selectedFooterMenuIndex].name;
  }
}
