import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { AboutPage } from '../pages/about/about';
import { ModalService } from '../services/modals.services';
import { NativeStorage } from '@ionic-native/native-storage';


import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { NativePageTransitions } from '@ionic-native/native-page-transitions';

// Firebase
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule, AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { UserLikeProvider } from '../providers/user-like/user-like';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { FavoritosPage } from '../pages/favoritos/favoritos';
import { EventosPage } from '../pages/eventos/eventos';
import { CursosPage } from '../pages/cursos/cursos';
import { ExploraPage } from '../pages/explora/explora';
import { InteresesPage } from '../pages/intereses/intereses';

export const firebaseConfig = {
  apiKey: "AIzaSyDk1MwPO1K5uvk-djcz21VHIaSLo3Gcg3w",
  authDomain: "exploraapp-621c6.firebaseapp.com",
  databaseURL: "https://exploraapp-621c6.firebaseio.com",
  projectId: "exploraapp-621c6",
  storageBucket: "exploraapp-621c6.appspot.com",
  messagingSenderId: "57356779714"
};


@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ListPage,
    AboutPage,
    FavoritosPage,
    EventosPage,
    CursosPage,
    ExploraPage,
    InteresesPage,
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    AngularFirestoreModule,
    HttpClientModule
    
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ListPage,
    AboutPage,
    FavoritosPage,
    EventosPage,
    CursosPage,
    ExploraPage,
    InteresesPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    NativePageTransitions,
    AngularFireDatabase,
    ModalService,
    UserLikeProvider,
    NativeStorage,
    HttpClientModule,
    HttpClient,
  ]
})
export class AppModule {}
