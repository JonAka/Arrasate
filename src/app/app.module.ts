import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { Firebase } from '@ionic-native/firebase';

import { MyApp } from './app.component';
import { HomePageModule } from '../pages/home/home.module';
import { NewsPage } from '../pages/news/news';
import { EventsPage } from '../pages/events/events';
import { LoginPage } from '../pages/login/login';
import { NewsdetailmodalPage } from '../pages/newsdetailmodal/newsdetailmodal';
import { EventdetailmodalPage } from '../pages/eventdetailmodal/eventdetailmodal';
import { SettingsPage } from '../pages/settings/settings';
import { TabsPage } from '../pages/tabs/tabs';
import { MainPage } from '../pages/main/main';
import { StoragePage } from '../pages/storage/storage';
import { Dialogs } from '@ionic-native/dialogs';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { ArrasateService } from '../providers/arrasate-service/arrasate-service';
import { AuthProvider } from '../providers/auth/auth';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { IonicStorageModule } from '@ionic/storage';





export const firebaseConfig = {

  apiKey: "AIzaSyCjzEJDf7-KCvxMgHEJLRBumC3xWNJSTUQ",
  authDomain: "arrasate-app-4c31a.firebaseapp.com",
  databaseURL: "https://arrasate-app-4c31a.firebaseio.com",
  projectId: "arrasate-app-4c31a",
  storageBucket: "arrasate-app-4c31a.appspot.com",
  messagingSenderId: "71595307485"

};

export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
  declarations: [
    MyApp,
    NewsPage,
    EventsPage,
    LoginPage,
    NewsdetailmodalPage,
    EventdetailmodalPage,
    SettingsPage,
    TabsPage,
    MainPage,
    StoragePage

  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot(),
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (createTranslateLoader),
        deps: [HttpClient]
      }
    }),
    IonicStorageModule.forRoot({
      name: '__mydb',
      driverOrder: ['sqlite', 'indexeddb', 'websql']
    }),
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    HomePageModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    NewsPage,
    EventsPage,
    LoginPage,
    NewsdetailmodalPage,
    EventdetailmodalPage,
    SettingsPage,
    TabsPage,
    MainPage,
    StoragePage,


  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    ArrasateService,
    AuthProvider,
    Firebase,
    Dialogs,

    


  ]
})
export class AppModule { }
