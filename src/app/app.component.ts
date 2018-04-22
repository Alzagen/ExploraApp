import { Component, ViewChild } from '@angular/core';
import { Nav, Platform, AlertController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Network } from '@ionic-native/network';

import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { AboutPage } from '../pages/about/about';
import { FavoritosPage } from '../pages/favoritos/favoritos';
import { EventosPage } from '../pages/eventos/eventos';
import { CursosPage } from '../pages/cursos/cursos';
import { ExploraPage } from '../pages/explora/explora';
import { InteresesPage } from '../pages/intereses/intereses';

import { NativePageTransitions, NativeTransitionOptions } from '@ionic-native/native-page-transitions';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = HomePage;

  pages: Array<{title: string, component: any}>;

  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen, 
              public NativePageTransitions: NativePageTransitions,
              private network: Network, private alertCtrl: AlertController) {
    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Mi lista', component: HomePage },   
      { title: 'List', component: ListPage },     
      { title: 'About', component: AboutPage },
      { title: 'Favoritos', component: FavoritosPage },
      { title: 'Explora', component: ExploraPage },
      { title: 'Cursos', component: CursosPage },
      { title: 'Eventos', component: EventosPage },
      { title: 'Intereses', component: InteresesPage },
    ];

    if(!this.network.type){
      let alert = this.alertCtrl.create({
        title: 'Ups!',
        message: 'Parece que tienes problemas con la conexion',
        buttons: [{
          text: "Reintentar",
          handler: () => { this.platform.exitApp(); }
        }]
      })
      alert.present();
    }

  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

 

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    let options: NativeTransitionOptions = { 
      "duration"       :  600, // in milliseconds (ms), default 400
      "iosdelay"       :   50, // ms to wait for the iOS webview to update before animation kicks in, default 60
      "androiddelay"   :  100
    }
    this.NativePageTransitions.fade(options); 
    this.nav.setRoot(page.component);
  }

}
