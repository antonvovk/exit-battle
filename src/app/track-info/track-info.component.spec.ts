import {ComponentFixture, TestBed} from '@angular/core/testing';

import {TrackInfoComponent} from './track-info.component';

describe('TrackInfoComponent', () => {
  let component: TrackInfoComponent;
  let fixture: ComponentFixture<TrackInfoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TrackInfoComponent]
    });
    fixture = TestBed.createComponent(TrackInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
