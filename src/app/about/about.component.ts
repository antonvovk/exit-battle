import {Component} from '@angular/core';

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

  selectedMenuIndex = 0;

  selectMenuItem(index: number) {
    this.selectedMenuIndex = index;
  }

  getCurrentMenuName(): string {
    return this.menuItems[this.selectedMenuIndex].name;
  }
}
