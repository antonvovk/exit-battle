import {ComponentFixture, TestBed} from '@angular/core/testing';

import {MarkEditorComponent} from './mark-editor.component';

describe('MarkEditorComponent', () => {
  let component: MarkEditorComponent;
  let fixture: ComponentFixture<MarkEditorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MarkEditorComponent]
    });
    fixture = TestBed.createComponent(MarkEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
