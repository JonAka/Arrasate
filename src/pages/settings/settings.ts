import { Component } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { StoragePage } from '../../pages/storage/storage';

import { TranslateService } from '@ngx-translate/core';
import { ArrasateService } from '../../providers/arrasate-service/arrasate-service';
import { AuthProvider } from '../../providers/auth/auth';
import { AngularFireAuth } from 'angularfire2/auth';
/**
 * Generated class for the SettingsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 **/


@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html',
})
export class SettingsPage {
  public isToggled: boolean;
  logoutMsg = "Saioa itxi";
  logeatuta: boolean;
  izena: any;

  constructor(public auth: AuthProvider,
    public alertCtrl: AlertController,
    private storage: Storage,
    public translate: TranslateService,
    public navCtrl: NavController,
    public navParams: NavParams,
    public afAuth: AngularFireAuth,
    public arrasateService: ArrasateService, ) {
    this.isToggled = false;
    this.logeatuta = this.auth.logged;


    this.afAuth.auth.onAuthStateChanged(user => {
      if (user) {
        this.logeatuta = true;
      } else {
        this.logeatuta = false;
      }
    });
    console.log("logeatuta : ", this.afAuth.auth.currentUser);
    this.getStoredName();
  }

  logout() {
    this.auth.logout();
    let alert = this.alertCtrl.create({
      subTitle: "Saioa itxi duzu!",
      buttons: ["ados"]
    });
    this.storage.remove('Izena');
    alert.present();
  }
  openStorage() {
    this.navCtrl.push(StoragePage);
  }

  onSelectChange(selectedValue: any) {
    this.translate.setDefaultLang(selectedValue);
    this.storage.set('language', selectedValue);
  }
  getStoredName() {

    this.storage.get('Izena').then(name => {

      this.izena = name;
      console.log(this.izena);
    });
  }
}
