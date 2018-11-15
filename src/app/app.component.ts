import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
//import { Storage } from '@ionic/storage';

import { HomePage } from '../pages/home/home';
import { MainPage } from '../pages/main/main';
import { NewsPage } from '../pages/news/news';
import { EventsPage } from '../pages/events/events';
import { SettingsPage } from '../pages/settings/settings';
import { Firebase } from '@ionic-native/firebase'
import { TranslateService } from '@ngx-translate/core';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {

  @ViewChild(Nav) nav: Nav;

  language = 'eu';
  lang;

  // rootPage: any = LoginPage;
  rootPage: any = MainPage

  pages: Array<{ title: string, component: any }>;

  constructor(public platform: Platform, public firebase: Firebase, translate: TranslateService, public statusBar: StatusBar, public splashScreen: SplashScreen) {
    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [

      { title: 'Hasiera', component: HomePage },
      { title: 'Albisteak', component: NewsPage },
      { title: 'Agenda', component: EventsPage },
      { title: 'Ezarpenak', component: SettingsPage }
    ];
/*     this.firebase.hasPermission().then(res=>{
      console.log("FIREBASE HAS PERMISSION: ", res);
    })
    this.firebase.onNotificationOpen().subscribe(res => {
      console.log("res: ", res);
    }) */
    this.lang = translate.setDefaultLang(this.language);
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
    this.nav.setRoot(page.component);
  }
}
