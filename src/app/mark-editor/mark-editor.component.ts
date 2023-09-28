import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'app-mark-editor',
  templateUrl: './mark-editor.component.html',
  styleUrls: ['./mark-editor.component.scss']
})
export class MarkEditorComponent {

  numbers: number[] = [];
  selectedNumber: number = 0;
  @Input()
  name: string;
  @Output()
  value = new EventEmitter<number>();

  @Input()
  set amount(value: number) {
    this.numbers = Array(value + 1).fill(0).map((x, i) => i);
  }

  chooseNumber(value: number) {
    this.selectedNumber = value;
    this.value.emit(value);
  }
}
