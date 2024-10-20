import {ComponentFixture, TestBed} from '@angular/core/testing';

import {AudioPollComponent} from './audio-poll.component';

describe('AudioPollComponent', () => {
  let component: AudioPollComponent;
  let fixture: ComponentFixture<AudioPollComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AudioPollComponent]
    });
    fixture = TestBed.createComponent(AudioPollComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
