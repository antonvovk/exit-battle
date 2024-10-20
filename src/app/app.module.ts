import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {initializeApp, provideFirebaseApp} from '@angular/fire/app';
import {environment} from '../environments/environment';
import {getAuth, provideAuth} from '@angular/fire/auth';
import {getFirestore, provideFirestore} from '@angular/fire/firestore';
import {getStorage, provideStorage} from '@angular/fire/storage';
import {HeaderComponent} from './header/header.component';
import {ButtonComponent} from './button/button.component';
import {NewsComponent} from './news/news.component';
import {InputComponent} from './input/input.component';
import {TracksComponent} from './tracks/tracks.component';
import {AudioComponent} from './audio/audio.component';
import {AboutComponent} from './about/about.component';
import {FooterComponent} from './footer/footer.component';
import {AuthComponent} from "./auth/auth.component";
import {FIREBASE_OPTIONS} from "@angular/fire/compat";
import {ToastrModule} from "ngx-toastr";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {TrackInfoComponent} from './track-info/track-info.component';
import {TrackUploadComponent} from './track-upload/track-upload.component';
import {NgxSpinnerModule} from "ngx-spinner";
import {FormsModule} from "@angular/forms";
import {NgxEditorModule} from "ngx-editor";
import {PollComponent} from './poll/poll.component';
import {AudioPollComponent} from './audio-poll/audio-poll.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ButtonComponent,
    NewsComponent,
    InputComponent,
    TracksComponent,
    AudioComponent,
    AboutComponent,
    FooterComponent,
    AuthComponent,
    TrackInfoComponent,
    TrackUploadComponent,
    PollComponent,
    AudioPollComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
    provideStorage(() => getStorage()),
    ToastrModule.forRoot({
      progressBar: true,
      progressAnimation: 'decreasing',
      closeButton: true
    }),
    NgxSpinnerModule.forRoot({type: 'square-jelly-box'}),
    FormsModule,
    NgxEditorModule
  ],
  providers: [
    {provide: FIREBASE_OPTIONS, useValue: environment.firebase}
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule {
}
