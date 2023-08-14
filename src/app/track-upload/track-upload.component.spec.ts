import {ComponentFixture, TestBed} from '@angular/core/testing';

import {TrackUploadComponent} from './track-upload.component';

describe('TrackUploadComponent', () => {
  let component: TrackUploadComponent;
  let fixture: ComponentFixture<TrackUploadComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TrackUploadComponent]
    });
    fixture = TestBed.createComponent(TrackUploadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
