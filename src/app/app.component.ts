import { Component, ViewChild, NgZone } from '@angular/core';
import { Nav, Platform, AlertController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';


import { HomePage } from '../pages/home/home';
import { MainPage } from '../pages/main/main';
import { NewsPage } from '../pages/news/news';
import { EventsPage } from '../pages/events/events';
import { SettingsPage } from '../pages/settings/settings';
import { Firebase } from '@ionic-native/firebase'
import { TranslateService } from '@ngx-translate/core';
import { LoginPage } from '../pages/login/login';
import { AngularFireAuth } from 'angularfire2/auth';
import { Storage } from '@ionic/storage';
import { ArrasateService } from '../providers/arrasate-service/arrasate-service';
import { StoragePage } from '../pages/storage/storage';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {

  @ViewChild(Nav) nav: Nav;

  rootPage: any = "";
  language: any = "eu";
  izena: any;
  pages: Array<{ icon: string, title: string, component: any, }>;
  toastCtrl: any;

  constructor(public platform: Platform,
    public firebase: Firebase,
    public translate: TranslateService,
    public statusBar: StatusBar,
    public splashScreen: SplashScreen,
    public afAuth: AngularFireAuth,
    public alertCtrl: AlertController,
    private _ngZone: NgZone,
    public storage: Storage,
    public arrasateService: ArrasateService) {

    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [

      { icon: 'home', title: 'Hasiera', component: HomePage },
      { icon: 'paper', title: "Albisteak", component: NewsPage },
      { icon: 'book', title: 'Agenda', component: EventsPage },
      { icon: 'options', title: 'Ezarpenak', component: SettingsPage }
    ];

    this.storage.get('language').then((lang) => {
      if (lang) {
        console.log("LANG:", lang);
        this.language = lang;
        console.log("Stored Language:", this.language);
        translate.setDefaultLang(this.language);
      } else {
        this.language = "eu";
        console.log("Stored Language:", this.language);
        translate.setDefaultLang(this.language);
      }

    });

  }


  initializeApp() {

    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.

      this.storage.get('Result').then((result) => {

        if (result) {
          this.loginOpen();
        }
        else {
          this.rootPage = MainPage;
          this.storage.set('Result', true);
        }
      })
      this.statusBar.styleDefault();
      this.splashScreen.hide();


    });
  }
  pushStorage() {
    this.nav.push(StoragePage);
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }

  showPrompt() {
    const prompt = this.alertCtrl.create({
      title: 'Logeatu',
      message: "Sartu zure izena gordetzeko",
      inputs: [
        {
          name: 'Izena',
          placeholder: 'Izena'
        },
      ],
      buttons: [
        {
          text: 'Itxi',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Gorde',
          handler: data => {
            this.storage.set('Izena', data.Izena);
          }
        }
      ]
    });
    prompt.present();
  }

  loginOpen() {
    this.storage.get('Izena').then(res => {
      this.izena = res;
    });
    this.afAuth.auth.onAuthStateChanged(user => {
      if (user) {
        console.log("I AM LOGGED: ", user)
        // this.checkTopicListUpdate();
        this._ngZone.runGuarded(() => {
          this.rootPage = HomePage;
          if (!this.izena) { this.showPrompt(); }

        })
      } else {
        console.log("NOT USER")
        this.nav.push(LoginPage);
      }
    });
  }
}

